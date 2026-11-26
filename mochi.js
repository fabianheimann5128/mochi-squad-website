// Mochi renderer for the website: builds a shaded SVG mochi from a "look".
// Body outline and lighting follow the app's avatar (adapted from Rakazo, Apache-2.0 – see NOTICE in the app repo).
(() => {
  const BODY = "M-1.759 76.330C0.959 69.782 7.117 63.647 10.602 56.566C14.086 49.486 14.898 41.460 17.063 33.747C19.227 26.034 22.744 18.634 28.465 13.175C34.186 7.716 42.110 4.197 50.032 4.183C57.954 4.169 65.874 7.660 71.581 13.121C77.288 18.582 80.783 26.014 82.945 33.732C85.107 41.449 85.935 49.451 89.402 56.543C92.869 63.634 98.975 69.814 101.767 76.305L108 108H-8Z";
  const LEFT_HAND = "M-2 74C7 68 22 75 26 83C31 93 26 102 19 107H-2Z";
  const RIGHT_HAND = "M102 73C92 68 78 75 74 83C69 93 74 102 81 107H102Z";

  const PALETTE = ["FFFFFF", "A97EFE", "00C972", "FF781C", "1CC3B0", "2A92FE", "FFAF38", "A27952", "FF3E51", "FF5EB1", "94A3B8"];
  const TOPS = ["none", "bear", "cat", "antenna", "headphones", "cap", "beanie", "crown", "sprout"];
  const EYES = ["oval", "shiny", "happy", "wink", "focused"];
  const EXTRAS = ["none", "glasses", "scarf", "blush", "moustache"];

  let uid = 0;
  const shade = (hex, f) => {
    const v = parseInt(hex, 16);
    const c = (s) => Math.max(0, Math.min(255, Math.round(((v >> s) & 255) * f)));
    return `rgb(${c(16)},${c(8)},${c(0)})`;
  };
  const accentFor = (hex) => (["FF3E51", "FF5EB1", "FF781C"].includes(hex) ? "2A92FE" : ["FFAF38", "A27952"].includes(hex) ? "1CC3B0" : "FF5A4D");
  const solid = (id, hex) => `
    <radialGradient id="${id}" cx="62%" cy="20%" r="100%">
      <stop stop-color="${shade(hex, 1.14)}"/><stop offset=".4" stop-color="${shade(hex, 1)}"/><stop offset="1" stop-color="${shade(hex, 0.66)}"/>
    </radialGradient>`;

  function top(look, id, accent) {
    const cover = (cut, grow, fill) => `
      <clipPath id="${id}-cov"><rect x="-30" y="-30" width="160" height="${30 + cut}"/></clipPath>
      <g clip-path="url(#${id}-cov)"><path d="${BODY}" transform="translate(50 ${cut}) scale(${grow}) translate(-50 ${-cut})" fill="${fill}"/></g>`;
    const shadow = (y) => `<rect x="0" y="${y}" width="100" height="7" fill="url(#${id}-cast)" clip-path="url(#${id}-body)"/>`;
    switch (look.top) {
      case "bear":
        return { behind: `<circle cx="31.5" cy="15.5" r="9.5" fill="url(#${id}-fill)"/><circle cx="68.5" cy="15.5" r="9.5" fill="url(#${id}-fill)"/>` };
      case "cat":
        return { behind: `<path d="M19 32L21 1Q22 -3 25 -2L41 14Z M81 32L79 1Q78 -3 75 -2L59 14Z" fill="url(#${id}-fill)"/>` };
      case "antenna":
        return { behind: `<rect x="48.8" y="-6" width="2.4" height="14" rx="1.2" fill="${shade(look.hex, 0.8)}"/><circle cx="50" cy="-8" r="5" fill="url(#${id}-acc)"/>` };
      case "sprout":
        return { front: `<path d="M50 7Q48 0 51 -6" stroke="#2fbf6c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <path d="M51 -5Q40 -2 38 -12Q46 -14 51 -5Z M51 -5Q62 -2 63 -13Q54 -14 51 -5Z" fill="#35c873"/>` };
      case "headphones":
        return { front: `<clipPath id="${id}-hp"><rect x="-30" y="-30" width="160" height="64"/></clipPath>
          <path d="${BODY}" transform="translate(50 40) scale(1.075) translate(-50 -40)" fill="none" stroke="#2c2f36" stroke-width="4.4" clip-path="url(#${id}-hp)"/>
          <rect x="6" y="29" width="13" height="22" rx="6.5" fill="url(#${id}-dark)"/><rect x="81" y="29" width="13" height="22" rx="6.5" fill="url(#${id}-dark)"/>
          <rect x="9.9" y="33.5" width="5.2" height="13" rx="2.6" fill="url(#${id}-acc)"/><rect x="84.9" y="33.5" width="5.2" height="13" rx="2.6" fill="url(#${id}-acc)"/>` };
      case "cap":
        return { front: `${shadow(17)}<path d="M52 14C68 12.5 85 14.5 90 19.5C81 23 66 21 52 20Z" fill="${shade(accent, 0.72)}"/>${cover(17, 1.06, `url(#${id}-acc)`)}
          <ellipse cx="50" cy="3.2" rx="2.4" ry="1.7" fill="${shade(accent, 1.1)}"/>` };
      case "beanie":
        return { front: `${shadow(21)}${cover(18, 1.08, `url(#${id}-acc)`)}
          <rect x="24" y="13.5" width="52" height="8.5" rx="4.2" fill="url(#${id}-cream)"/><circle cx="50" cy="-3" r="6.8" fill="url(#${id}-cream)"/>` };
      case "crown":
        return { front: `${shadow(13)}<path d="M33 9L30.5 -4L41.5 4L50 -8L58.5 4L69.5 -4L67 9Z" fill="url(#${id}-gold)"/>
          <clipPath id="${id}-band"><rect x="0" y="6.5" width="100" height="7"/></clipPath>
          <g clip-path="url(#${id}-band)"><path d="${BODY}" transform="translate(50 13) scale(1.05) translate(-50 -13)" fill="#f0a91e"/></g>
          <circle cx="50" cy="10" r="1.9" fill="#ff3e51"/><circle cx="40" cy="10.4" r="1.6" fill="#2a92fe"/><circle cx="60" cy="10.4" r="1.6" fill="#2a92fe"/>` };
      default:
        return {};
    }
  }

  function eyes(look, ink, glint) {
    const one = (x, style) => {
      if (style === "happy") return `<path d="M${x - 5} 42Q${x} 33 ${x + 5} 42" stroke="${ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
      if (style === "shiny") return `<rect x="${x - 5.5}" y="32.7" width="11" height="14.5" rx="5.5" fill="${ink}"/><circle cx="${x - 1.1}" cy="37.1" r="2.3" fill="${glint}" opacity=".95"/><circle cx="${x + 1.9}" cy="42.9" r="1.1" fill="${glint}" opacity=".6"/>`;
      if (style === "focused") {
        const s = x < 50 ? 1 : -1;
        return `<rect x="${x - 5}" y="35.8" width="10" height="10.5" rx="5" fill="${ink}"/><circle cx="${x - 1.3}" cy="38.9" r="1.5" fill="${glint}" opacity=".85"/>
          <path d="M${x - s * 6.5} 29.5L${x + s * 5.5} 33.5" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
      }
      return `<ellipse cx="${x}" cy="40" rx="5.2" ry="8" fill="${ink}"/><ellipse cx="${x - 1.2}" cy="36.4" rx="1.4" ry="2.2" fill="${glint}" opacity=".2"/>`;
    };
    return one(40.5, look.eyes === "wink" ? "oval" : look.eyes) + one(59.5, look.eyes === "wink" ? "happy" : look.eyes);
  }

  function extra(look, id, ink, accent) {
    switch (look.extra) {
      case "glasses":
        return `<g fill="rgba(255,255,255,.08)" stroke="${ink}" stroke-width="2"><circle cx="40.5" cy="40" r="9"/><circle cx="59.5" cy="40" r="9"/></g><path d="M47.5 38Q50 35.5 52.5 38" stroke="${ink}" stroke-width="2" fill="none"/>`;
      case "scarf":
        return `<g clip-path="url(#${id}-body)"><path d="M-4 60Q50 74 104 60" stroke="url(#${id}-acc)" stroke-width="10" fill="none" stroke-linecap="round"/>
          <rect x="60" y="66" width="9.5" height="19" rx="3.5" fill="${shade(accent, 0.8)}"/><ellipse cx="64.5" cy="66.7" rx="6" ry="4.2" fill="url(#${id}-acc)"/></g>`;
      case "blush":
        return `<ellipse cx="29" cy="51" rx="5.5" ry="3" fill="rgba(255,107,158,.5)"/><ellipse cx="71" cy="51" rx="5.5" ry="3" fill="rgba(255,107,158,.5)"/>`;
      case "moustache":
        return `<path d="M50 53.5C55 49 61 56 64 52C60 60 54 57 50 53.5C46 57 40 60 36 52C39 56 45 49 50 53.5Z" fill="${ink}"/>`;
      default:
        return "";
    }
  }

  /** Returns an SVG string. options.plate: draw the rounded tile behind the mochi. */
  function render(look, options = {}) {
    const id = "m" + ++uid;
    const hex = look.hex || "FFFFFF";
    const accent = accentFor(hex);
    const v = parseInt(hex, 16);
    const lum = (0.2126 * ((v >> 16) & 255) + 0.7152 * ((v >> 8) & 255) + 0.0722 * (v & 255)) / 255;
    const ink = lum > 0.16 ? "#101014" : "#f5f5f5";
    const glint = lum > 0.16 ? "#f5f5f5" : "#101014";
    const t = top(look, id, accent);
    const fit = { none: 1, bear: 0.9, cat: 0.9, antenna: 0.84, sprout: 0.84, headphones: 0.86, cap: 0.9, beanie: 0.82, crown: 0.84 }[look.top] ?? 1;
    const plate = options.plate !== false;
    return `<svg class="mochi" viewBox="0 0 100 100" role="img" aria-label="Mochi">
      <defs>
        <clipPath id="${id}-plate"><rect width="100" height="100" rx="23"/></clipPath>
        <clipPath id="${id}-body"><path d="${BODY}"/></clipPath>
        <radialGradient id="${id}-fill" cx="57%" cy="30%" r="76%"><stop stop-color="${shade(hex, 1)}"/><stop offset=".48" stop-color="${shade(hex, 1)}"/><stop offset="1" stop-color="${shade(hex, 0.96)}"/></radialGradient>
        <radialGradient id="${id}-shade" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(45 0 0 44 0 32)">
          <stop stop-color="${shade(hex, 0.58)}" stop-opacity=".94"/><stop offset=".4" stop-color="${shade(hex, 0.58)}" stop-opacity=".94"/><stop offset=".65" stop-color="${shade(hex, 0.58)}" stop-opacity=".76"/><stop offset=".85" stop-color="${shade(hex, 0.58)}" stop-opacity=".22"/><stop offset="1" stop-color="${shade(hex, 0.58)}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-light" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(34 0 0 33 57 23.5)"><stop stop-color="#fff" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-hl" cx="60%" cy="35%" r="76%"><stop stop-color="${shade(hex, 1)}"/><stop offset=".28" stop-color="${shade(hex, 1)}"/><stop offset="1" stop-color="${shade(hex, 0.8)}"/></radialGradient>
        <radialGradient id="${id}-hr" cx="40%" cy="35%" r="76%"><stop stop-color="${shade(hex, 1)}"/><stop offset=".28" stop-color="${shade(hex, 1)}"/><stop offset="1" stop-color="${shade(hex, 0.8)}"/></radialGradient>
        <radialGradient id="${id}-cl" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(7.5 0 0 17 24.5 91)"><stop stop-color="${shade(hex, 0.42)}" stop-opacity=".72"/><stop offset=".65" stop-color="${shade(hex, 0.42)}" stop-opacity=".3"/><stop offset="1" stop-color="${shade(hex, 0.42)}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-cr" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(7.5 0 0 17 75.5 91)"><stop stop-color="${shade(hex, 0.42)}" stop-opacity=".72"/><stop offset=".65" stop-color="${shade(hex, 0.42)}" stop-opacity=".3"/><stop offset="1" stop-color="${shade(hex, 0.42)}" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-cast" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
        ${solid(id + "-acc", accent)}${solid(id + "-dark", "34373f")}${solid(id + "-cream", "F3F0EA")}${solid(id + "-gold", "FFC53D")}
      </defs>
      <g ${plate ? `clip-path="url(#${id}-plate)"` : ""}>
        ${plate ? `<rect width="100" height="100" rx="23" fill="#141414"/>` : ""}
        <g class="mochi-breathe"><g class="mochi-body" transform="translate(50 109) scale(${fit}) translate(-50 -100)">
          ${t.behind || ""}
          <path d="${BODY}" fill="url(#${id}-fill)"/><path d="${BODY}" fill="url(#${id}-shade)"/><path d="${BODY}" fill="url(#${id}-light)"/>
          <g clip-path="url(#${id}-body)">
            <path d="${BODY}" fill="url(#${id}-cl)"/><path d="${BODY}" fill="url(#${id}-cr)"/>
            <path d="${LEFT_HAND}" fill="url(#${id}-hl)"/><path d="${RIGHT_HAND}" fill="url(#${id}-hr)"/>
          </g>
          ${t.front || ""}
          ${look.extra === "blush" || look.extra === "scarf" ? extra(look, id, ink, accent) : ""}
          <g class="mochi-eyes"><g class="mochi-blink" style="animation-delay:-${(Math.random() * 5).toFixed(2)}s">${eyes(look, ink, glint)}</g></g>
          ${look.extra === "glasses" || look.extra === "moustache" ? extra(look, id, ink, accent) : ""}
        </g></g>
      </g>
      ${plate ? `<rect x=".5" y=".5" width="99" height="99" rx="22.5" fill="none" stroke="rgba(255,255,255,.1)"/>` : ""}
    </svg>`;
  }

  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const random = () => ({ hex: pick(PALETTE.slice(1)), top: pick(TOPS), eyes: pick(EYES), extra: pick(EXTRAS) });

  /** Eyes follow the pointer, gently. */
  function follow() {
    let frame = 0;
    window.addEventListener("pointermove", (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        document.querySelectorAll(".mochi-eyes").forEach((group) => {
          const box = group.ownerSVGElement.getBoundingClientRect();
          if (box.bottom < 0 || box.top > innerHeight) return;
          const dx = event.clientX - (box.left + box.width / 2), dy = event.clientY - (box.top + box.height * 0.45);
          const distance = Math.hypot(dx, dy) || 1, reach = Math.min(1, distance / 260);
          group.style.transform = `translate(${(dx / distance) * 2.6 * reach}px, ${(dy / distance) * 2 * reach}px)`;
        });
      });
    }, { passive: true });
  }

  window.Mochi = { render, random, follow, PALETTE, TOPS, EYES, EXTRAS };
})();
