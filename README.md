# mochi-squad.com

The website of [Mochi Squad](https://github.com/fabianheimann5128/mochi-squad). Plain HTML, CSS and JavaScript, no build step.
One fixed WebGL stage (three.js) on which the Mochis act out every chapter while the page scrolls.

```bash
python3 -m http.server 4412
```

Every push to `main` goes live on https://mochi-squad.com.

`mochi.js` draws the 2D Mochis; outline and lighting follow the app's avatar, adapted from Rakazo (Apache-2.0).

Bundled so that the page loads nothing from other servers: three.js r160 (MIT, `vendor/THREE-LICENSE`) and the
Geist typefaces by Vercel (SIL Open Font License 1.1).
