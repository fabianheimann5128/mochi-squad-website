#!/usr/bin/python3
"""Stamps the pages with a version of each stylesheet and script, so a browser or CDN never pairs a new page with old files.

Run before every push:  python3 stamp.py
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).parent
ASSETS = ["styles.css", "app.js", "mochi.js"]


def version(name):
    return hashlib.sha256((ROOT / name).read_bytes()).hexdigest()[:10]


for page in ROOT.glob("*.html"):
    text = page.read_text()
    for name in ASSETS:
        text = re.sub(r'(["\'])' + re.escape(name) + r'(\?v=[0-9a-f]+)?\1', lambda m: f'{m.group(1)}{name}?v={version(name)}{m.group(1)}', text)
    page.write_text(text)
    print("stamped", page.name)
