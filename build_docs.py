#!/usr/bin/python3
"""Builds the docs at /docs/ from the Markdown sources in docs-src/.

    python3 build_docs.py      # then python3 stamp.py, as before every push

Standard library only. The sources use a small, plain subset of Markdown:
headings (## and ###), paragraphs, lists (two levels), tables, fenced code,
**bold**, *italic*, `code`, <kbd>…</kbd>, links and GitHub-style notes
(> [!NOTE], > [!TIP], > [!WARNING]). A link to another page is written as
its source file name, for example [Routines](routines.md#start-links).

docs-src/nav.txt sets the order: "# Part" lines open a part, every other line
names a source file without ".md". Each source starts with front matter:

    ---
    title: Routines
    summary: One or two sentences on what you can do on this page.
    app: 0.2.1
    ---
"""
import html
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "docs-src"
OUT = ROOT / "docs"
SITE = "https://mochi-squad.com"
DMG = "https://github.com/fabianheimann5128/mochi-squad/releases/latest/download/MochiSquad.dmg"
REPO = "https://github.com/fabianheimann5128/mochi-squad"


# ---------- sources ----------

def read_nav():
    parts = []
    for line in (SRC / "nav.txt").read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("# "):
            parts.append({"title": line[2:], "pages": []})
        else:
            parts[-1]["pages"].append(line)
    return parts


def read_page(slug):
    text = (SRC / f"{slug}.md").read_text()
    meta = {}
    if text.startswith("---\n"):
        head, text = text[4:].split("\n---\n", 1)
        for line in head.splitlines():
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip()
    for key in ("title", "summary", "app"):
        assert meta.get(key), f"{slug}.md: front matter needs {key}"
    return meta, text


def url_of(slug):
    return "/docs/" if slug == "index" else f"/docs/{slug}/"


# ---------- Markdown ----------

def slugify(text):
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[^\w\s-]", "", text.lower().replace("’", "").replace("'", ""))
    return re.sub(r"[\s_]+", "-", text).strip("-")


def inline(text):
    """Escapes the text and renders the inline marks. Only <kbd> survives as HTML."""
    codes = []

    def keep_code(m):
        codes.append(m.group(1))
        return f"\x00{len(codes) - 1}\x00"

    text = re.sub(r"`([^`]+)`", keep_code, text)
    text = html.escape(text, quote=False)
    text = re.sub(r"&lt;kbd&gt;(.+?)&lt;/kbd&gt;", r"<kbd>\1</kbd>", text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)

    def link(m):
        label, target = m.group(1), m.group(2)
        page = re.match(r"^([a-z0-9-]+)\.md(#.*)?$", target)
        if page:
            assert (SRC / f"{page.group(1)}.md").exists(), f"broken link to {target}"
            target = url_of(page.group(1)) + (page.group(2) or "")
        external = target.startswith("http")
        rel = ' rel="noopener"' if external else ""
        return f'<a href="{html.escape(target)}"{rel}>{label}</a>'

    text = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, text)
    return re.sub(r"\x00(\d+)\x00", lambda m: f"<code>{html.escape(codes[int(m.group(1))], quote=False)}</code>", text)


NOTES = {"NOTE": "Note", "TIP": "Tip", "WARNING": "Careful"}


def render(text):
    """Returns (html, headings) for a page body."""
    lines = text.strip("\n").split("\n")
    out, heads, i = [], [], 0

    def para_end(j):
        return j >= len(lines) or not lines[j].strip() or re.match(r"^(#{2,3} |```|> |\||\s*[-*] |\s*\d+\. )", lines[j])

    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        m = re.match(r"^(#{2,3}) (.+?)(?: \{#([a-z0-9-]+)\})?$", line)
        if m:
            level, title = len(m.group(1)), m.group(2)
            anchor = m.group(3) or slugify(title)
            assert anchor not in [h[2] for h in heads], f"duplicate heading anchor {anchor}"
            heads.append((level, re.sub(r"<[^>]+>", "", inline(title)), anchor))
            out.append(f'<h{level} id="{anchor}"><a class="hash" href="#{anchor}" aria-hidden="true" tabindex="-1">#</a>{inline(title)}</h{level}>')
            i += 1
            continue
        if line.startswith("```"):
            lang = line[3:].strip()
            body = []
            i += 1
            while not lines[i].startswith("```"):
                body.append(lines[i])
                i += 1
            i += 1
            label = f'<span class="code-lang">{html.escape(lang)}</span>' if lang and lang != "text" else ""
            out.append(f'<div class="code">{label}<pre><code>{html.escape(chr(10).join(body), quote=False)}</code></pre></div>')
            continue
        if line.startswith(">"):
            body = []
            while i < len(lines) and lines[i].startswith(">"):
                body.append(lines[i][1:].lstrip())
                i += 1
            kind = "NOTE"
            note = re.match(r"^\[!(NOTE|TIP|WARNING)\]\s*$", body[0])
            if note:
                kind, body = note.group(1), body[1:]
            inner, _ = render("\n".join(body))
            out.append(f'<aside class="note note-{kind.lower()}"><b>{NOTES[kind]}</b>{inner}</aside>')
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            head, body = rows[0], [r for r in rows[1:] if not re.match(r"^:?-+:?$", r[0])]
            t = "<thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"
            t += "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body) + "</tbody>"
            out.append(f'<div class="table"><table>{t}</table></div>')
            continue
        if re.match(r"^([-*]|\d+\.) ", line):
            html_list, i = render_list(lines, i)
            out.append(html_list)
            continue
        body = [line]
        i += 1
        while not para_end(i):
            body.append(lines[i])
            i += 1
        out.append(f"<p>{inline(' '.join(s.strip() for s in body))}</p>")
    return "\n".join(out), heads


def render_list(lines, i, indent=0):
    ordered = bool(re.match(r"^\s*\d+\. ", lines[i]))
    items = []
    while i < len(lines):
        line = lines[i]
        m = re.match(r"^(\s*)([-*]|\d+\.) (.*)$", line)
        if not m:
            if line.strip() and len(line) - len(line.lstrip()) > indent and items:
                items[-1][0].append(line.strip())  # continuation line
                i += 1
                continue
            if not line.strip() and i + 1 < len(lines) and re.match(r"^\s+([-*]|\d+\.) |^\s{2,}\S", lines[i + 1]) and items:
                i += 1
                continue
            break
        depth = len(m.group(1))
        if depth < indent:
            break
        if depth > indent:
            sub, i = render_list(lines, i, depth)
            items[-1][1].append(sub)
            continue
        if bool(re.match(r"\d+\.", m.group(2))) != ordered:
            break
        items.append(([m.group(3)], []))
        i += 1
    tag = "ol" if ordered else "ul"
    body = "".join(f"<li>{inline(' '.join(text))}{''.join(subs)}</li>" for text, subs in items)
    return f'<{tag}{" class=\"steps\"" if ordered and indent == 0 else ""}>{body}</{tag}>', i


# ---------- page ----------

ICON_DL = '<svg class="dl-ico" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5v10m0 0-4-4m4 4 4-4M3.5 15.5h13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ICON_SEARCH = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m13 13 4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'


def sidebar(parts, pages, current):
    blocks = []
    for part in parts:
        links = "".join(
            f'<li><a href="{url_of(s)}"{" aria-current=\"page\"" if s == current else ""}>{html.escape(pages[s]["meta"]["title"])}</a></li>'
            for s in part["pages"]
        )
        blocks.append(f'<div class="side-part"><p>{html.escape(part["title"])}</p><ul>{links}</ul></div>')
    home = f'<a class="side-home" href="/docs/"{" aria-current=\"page\"" if current == "index" else ""}>Overview</a>'
    return home + "".join(blocks)


def page_html(slug, page, parts, pages, order):
    meta, body, heads = page["meta"], page["html"], page["heads"]
    title = meta["title"]
    part = next((p["title"] for p in parts if slug in p["pages"]), None)
    idx = order.index(slug)
    prev_slug = order[idx - 1] if idx > 0 else None
    next_slug = order[idx + 1] if idx + 1 < len(order) else None

    def pager(s, label, cls):
        if not s:
            return "<span></span>"
        return f'<a class="pager-{cls}" href="{url_of(s)}"><small>{label}</small><b>{html.escape(pages[s]["meta"]["title"])}</b></a>'

    toc = [h for h in heads if h[0] == 2]
    toc_html = ""
    if len(toc) > 1:
        toc_html = '<nav class="toc" aria-label="On this page"><p>On this page</p><ul>' + "".join(
            f'<li><a href="#{a}">{t}</a></li>' for _, t, a in toc) + "</ul></nav>"
    kicker = f'<p class="kicker">{html.escape(part)}</p>' if part else '<p class="kicker">Docs</p>'
    full_title = "Mochi Squad docs" if slug == "index" else f"{title} – Mochi Squad docs"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(full_title)}</title>
<meta name="description" content="{html.escape(meta['summary'])}">
<meta name="theme-color" content="#0a0a0a">
<meta property="og:title" content="{html.escape(full_title)}">
<meta property="og:description" content="{html.escape(meta['summary'])}">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE}{url_of(slug)}">
<link rel="canonical" href="{SITE}{url_of(slug)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/docs.css">
<script src="/docs.js" defer></script>
</head>
<body class="docs-page">
<a class="skip" href="#content">Skip to content</a>
<header class="dnav">
  <a class="brand" href="/"><img src="/logo.svg" alt=""><b>mochi squad</b></a>
  <a class="dnav-docs" href="/docs/">Docs</a>
  <button class="dsearch-open" type="button" aria-label="Search the docs">{ICON_SEARCH}<span>Search</span><kbd>/</kbd></button>
  <a class="btn btn-light btn-sm dnav-dl" href="{DMG}">{ICON_DL}<span>Download for Mac</span></a>
  <button class="dmenu" type="button" aria-label="Menu" aria-expanded="false" aria-controls="side"><i></i><i></i></button>
</header>
<div class="dsearch" role="dialog" aria-modal="true" aria-label="Search the docs" hidden>
  <div class="dsearch-box">
    <label class="dsearch-field">{ICON_SEARCH}<input type="search" placeholder="Search titles and headings" autocomplete="off" spellcheck="false" aria-label="Search titles and headings"><kbd>esc</kbd></label>
    <ul class="dsearch-results" role="listbox"></ul>
    <p class="dsearch-empty" hidden>Nothing found. Try another word.</p>
  </div>
</div>
<div class="dwrap">
  <nav class="side" id="side" aria-label="Docs">{sidebar(parts, pages, slug)}</nav>
  <main class="dmain" id="content">
    <article class="doc">
      {kicker}
      <h1>{html.escape(title)}</h1>
      <p class="lead">{inline(meta['summary'])}</p>
      {body}
    </article>
    <nav class="pager" aria-label="Previous and next page">{pager(prev_slug, "Previous", "prev")}{pager(next_slug, "Next", "next")}</nav>
    <footer class="foot dfoot">
      <span><img src="/logo.svg" alt=""> mochi squad · Docs for version {html.escape(meta['app'])}</span>
      <span><a href="/">Home</a><a href="/docs/">Docs</a><a href="{REPO}">GitHub</a><a href="/impressum.html">Legal notice</a><a href="/datenschutz.html">Privacy</a></span>
    </footer>
  </main>
  {toc_html}
</div>
</body>
</html>
"""


def overview_cards(parts, pages):
    """The docs home lists the four parts with their pages."""
    cards = []
    for n, part in enumerate(parts, 1):
        links = "".join(f'<li><a href="{url_of(s)}">{html.escape(pages[s]["meta"]["title"])}</a></li>' for s in part["pages"])
        cards.append(f'<section class="part-card"><p class="kicker">0{n}</p><h2 id="{slugify(part["title"])}">{html.escape(part["title"])}</h2><ul>{links}</ul></section>')
    return '<div class="part-cards">' + "".join(cards) + "</div>"


def main():
    parts = read_nav()
    order = ["index"] + [s for p in parts for s in p["pages"]]
    assert len(order) == len(set(order)), "a page is listed twice in nav.txt"
    listed = set(order)
    for src in SRC.glob("*.md"):
        assert src.stem in listed, f"{src.name} is not listed in nav.txt"
    pages = {}
    for slug in order:
        meta, text = read_page(slug)
        body, heads = render(text)
        pages[slug] = {"meta": meta, "html": body, "heads": heads}
    pages["index"]["html"] += overview_cards(parts, pages)

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    index = []
    for slug in order:
        target = OUT / ("index.html" if slug == "index" else f"{slug}/index.html")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(page_html(slug, pages[slug], parts, pages, order))
        part = next((p["title"] for p in parts if slug in p["pages"]), "Docs")
        index.append({"t": pages[slug]["meta"]["title"], "u": url_of(slug), "p": part, "s": pages[slug]["meta"]["summary"],
                      "h": [[t, a] for _, t, a in pages[slug]["heads"]]})
    (OUT / "search.json").write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")))
    print(f"built {len(order)} pages into docs/")


if __name__ == "__main__":
    main()
