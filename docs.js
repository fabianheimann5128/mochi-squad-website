// Mochi Squad docs: search over titles and headings (no external service), the menu on phones, the table of contents.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const dialog = $(".dsearch"), input = $(".dsearch input"), list = $(".dsearch-results"), empty = $(".dsearch-empty");
  let index = null, hits = [], at = 0, opener = null;

  const load = () => index || (index = fetch("/docs/search.json").then((r) => r.json()).catch(() => []));
  const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const mark = (text, words) => {
    let out = esc(text);
    for (const w of words) out = out.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
    return out;
  };

  // Every page and every heading is a candidate; all words must appear, a match in the title ranks first.
  async function search(q) {
    const pages = await load();
    const words = fold(q).split(/\s+/).filter(Boolean);
    if (!words.length) { hits = []; draw(words); return; }
    const found = [];
    for (const p of pages) {
      const page = fold(p.t + " " + p.s);
      if (words.every((w) => page.includes(w))) found.push({ score: words.every((w) => fold(p.t).includes(w)) ? 0 : 2, part: p.p, title: p.t, sub: p.s, url: p.u });
      for (const [h, a] of p.h) {
        const head = fold(h), text = head + " " + fold(p.t);
        if (words.some((w) => head.includes(w)) && words.every((w) => text.includes(w))) found.push({ score: words.every((w) => fold(h).includes(w)) ? 1 : 3, part: p.p + " · " + p.t, title: h, sub: "", url: p.u + "#" + a });
      }
    }
    hits = found.sort((a, b) => a.score - b.score).slice(0, 12);
    at = 0;
    draw(words);
  }

  function draw(words) {
    list.innerHTML = hits.map((h, i) => `<li role="option" aria-selected="${i === at}"><a href="${h.url}"><small>${esc(h.part)}</small><b>${mark(h.title, words)}</b>${h.sub ? `<span>${esc(h.sub)}</span>` : ""}</a></li>`).join("");
    empty.hidden = !(input.value.trim() && !hits.length);
  }

  function open() {
    opener = document.activeElement;
    dialog.hidden = false;
    document.body.style.overflow = "hidden";
    load();
    input.value = ""; hits = []; draw([]);
    input.focus();
  }
  function close() {
    dialog.hidden = true;
    document.body.style.overflow = "";
    opener && opener.focus && opener.focus();
  }

  $(".dsearch-open").addEventListener("click", open);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); });
  list.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
  input.addEventListener("input", () => search(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!hits.length) return;
      at = (at + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length;
      [...list.children].forEach((li, i) => li.setAttribute("aria-selected", i === at));
      list.children[at].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && hits[at]) {
      e.preventDefault();
      close();
      location.href = hits[at].url;
    }
  });
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && document.activeElement !== input;
    if (e.key === "Escape" && !dialog.hidden) close();
    else if (!typing && dialog.hidden && (e.key === "/" || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)))) { e.preventDefault(); open(); }
  });

  // Phones: the side bar is a menu behind a button.
  const menu = $(".dmenu"), side = $(".side");
  menu.addEventListener("click", () => {
    const on = !side.classList.contains("open");
    side.classList.toggle("open", on);
    menu.setAttribute("aria-expanded", on);
    document.body.style.overflow = on ? "hidden" : "";
  });
  side.addEventListener("click", (e) => { if (e.target.closest("a")) { side.classList.remove("open"); menu.setAttribute("aria-expanded", false); document.body.style.overflow = ""; } });

  // Table of contents: the section in view is marked.
  const links = [...document.querySelectorAll(".toc a")];
  if (links.length && "IntersectionObserver" in window) {
    const heads = links.map((a) => document.getElementById(a.hash.slice(1)));
    const mark = () => {
      let current = heads[0];
      for (const h of heads) if (h.getBoundingClientRect().top < 140) current = h;
      links.forEach((a) => a.classList.toggle("on", a.hash.slice(1) === current.id));
    };
    addEventListener("scroll", mark, { passive: true });
    mark();
  }
})();
