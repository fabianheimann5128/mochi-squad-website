#!/usr/bin/python3
"""Stamps the pages with a version of each stylesheet and script, so a browser or CDN never pairs a new page with old files.

Run before every push (after python3 build_docs.py):  python3 stamp.py
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).parent
ASSETS = ["styles.css", "app.js", "mochi.js", "docs.css", "docs.js"]


def version(name):
    return hashlib.sha256((ROOT / name).read_bytes()).hexdigest()[:10]


pages = list(ROOT.glob("*.html")) + list((ROOT / "docs").rglob("*.html"))
for page in pages:
    text = page.read_text()
    for name in ASSETS:
        # "styles.css" or "/styles.css", with or without an old stamp
        text = re.sub(r'(["\'])(/?)' + re.escape(name) + r'(\?v=[0-9a-f]+)?\1',
                      lambda m: f'{m.group(1)}{m.group(2)}{name}?v={version(name)}{m.group(1)}', text)
    page.write_text(text)
    print("stamped", page.relative_to(ROOT))
