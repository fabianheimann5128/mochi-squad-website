# mochi-squad.com

The website of [Mochi Squad](https://github.com/fabianheimann5128/mochi-squad). Plain HTML, CSS and JavaScript, no build step.
One fixed WebGL stage (three.js) on which the Mochis act out every chapter while the page scrolls.

```bash
python3 -m http.server 4412
```

Every push to `main` goes live on https://mochi-squad.com.

## Docs

The docs at `/docs/` are built from the Markdown sources in `docs-src/` (one file per page, order in `docs-src/nav.txt`).
Each source names the app version it describes in its front matter. After editing:

```bash
python3 build_docs.py   # writes docs/ and docs/search.json
python3 stamp.py        # always last, before every push
```

`mochi.js` draws the 2D Mochis; outline and lighting follow the app's avatar, adapted from Rakazo (Apache-2.0).

Bundled so that the page loads nothing from other servers: three.js r160 (MIT, `vendor/THREE-LICENSE`) and the
Geist typefaces by Vercel (SIL Open Font License 1.1).
