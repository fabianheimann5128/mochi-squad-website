// Mochi Squad website. One fixed WebGL stage: nine Mochis that act out every chapter while the page scrolls.
// Each chapter is a "state" (where everyone stands, where the camera is, what the light does); scrolling blends states.
import * as THREE from "three";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const bounce = (t) => { const n = 7.5625, d = 2.75; return t < 1 / d ? n * t * t : t < 2 / d ? n * (t -= 1.5 / d) * t + 0.75 : t < 2.5 / d ? n * (t -= 2.25 / d) * t + 0.9375 : n * (t -= 2.625 / d) * t + 0.984375; };
const TAU = Math.PI * 2;
const narrow = () => innerWidth < 900;

// ───────── page chrome ─────────
$$("[data-m]").forEach((el) => { const [hex, top, eyes, extra] = el.dataset.m.split(","); el.innerHTML = Mochi.render({ hex, top, eyes, extra }, { plate: true }); });
$$("[data-lines] > span").forEach((line, i) => { line.innerHTML = `<i style="--i:${i % 5}">${line.innerHTML}</i>`; });

const cursor = $("#cursor");
const pointer = { x: innerWidth / 2, y: innerHeight / 2, cx: innerWidth / 2, cy: innerHeight / 2, nx: 0, ny: 0, sx: 0, sy: 0 };
const hovers = matchMedia("(hover: hover)").matches; // on touch screens the last tap must not tilt the scene for good
addEventListener("pointermove", (e) => { if (!hovers || e.pointerType === "touch") return; pointer.x = e.clientX; pointer.y = e.clientY; pointer.nx = e.clientX / innerWidth - 0.5; pointer.ny = e.clientY / innerHeight - 0.5; cursor.classList.add("on"); }, { passive: true });
document.addEventListener("pointerover", (e) => cursor.classList.toggle("big", !!e.target.closest("a, button")));
$$("[data-magnetic]").forEach((el) => {
  el.addEventListener("pointermove", (e) => { const b = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.22}px, ${(e.clientY - b.top - b.height / 2) * 0.3}px)`; });
  el.addEventListener("pointerleave", () => { el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1), background .25s, box-shadow .35s"; el.style.transform = ""; setTimeout(() => (el.style.transition = ""), 600); });
});

const chapters = $$(".chapter");
const middle = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { rootMargin: "-45% 0px -45% 0px" });
chapters.slice(1).forEach((c) => middle.observe(c));

// ───────── the cast ─────────
const CAST = [
  { hex: 0xf2f2f2, top: "none", name: "Mochi", job: "Coordinator" },
  { hex: 0x2a92fe, top: "antenna", name: "Mira", job: "Researcher" },
  { hex: 0xff781c, top: "cat", name: "Otto", job: "Developer" },
  { hex: 0x00c972, top: "sprout", name: "Theo", job: "Reviewer" },
  { hex: 0xa97efe, top: "bear", name: "Juna", job: "Writer" },
  { hex: 0xff5eb1, top: "none", name: "Kiko", job: "Designer" },
  { hex: 0xffaf38, top: "crown", name: "Yuzu", job: "Release" },
  { hex: 0x1cc3b0, top: "cat", name: "Nori", job: "Data" },
  { hex: 0xff3e51, top: "antenna", name: "Bao", job: "Tester" },
];
const N = CAST.length, BUILD = 1; // BUILD: the Mochi the visitor dresses in the builder chapter

const canvas = $("#stage");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);

const hemi = new THREE.HemisphereLight(0xffffff, 0x1a1a2a, 1.25); scene.add(hemi);
const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 10, 7); key.castShadow = true;
key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 40 }); key.shadow.radius = 6; key.shadow.bias = -0.0004; scene.add(key);
const rimA = new THREE.PointLight(0x2f6bff, 160, 40); rimA.position.set(-8, 4, -5); scene.add(rimA);
const rimB = new THREE.PointLight(0xff5eb1, 140, 40); rimB.position.set(8, 3, -4); scene.add(rimB);
const lamp = new THREE.SpotLight(0xfff0c8, 0, 30, 0.5, 0.7, 1.4); lamp.position.set(0, 9, 2); lamp.target.position.set(0, 0, 0); scene.add(lamp, lamp.target);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.ShadowMaterial({ opacity: 0.42 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

// Body: a dome that flares into a soft base, turned on a lathe.
const profile = [new THREE.Vector2(0, 0), new THREE.Vector2(0.9, 0), new THREE.Vector2(0.99, 0.05)];
for (let k = 2; k <= 40; k++) {
  const t = k / 40, y = t * 1.85;
  const r = t < 0.62 ? 0.6 + 0.4 * Math.pow(1 - t / 0.62, 1.7) : 0.6 * Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.62) / 0.38, 2)));
  profile.push(new THREE.Vector2(r, y));
}
const bodyGeometry = new THREE.LatheGeometry(profile, 64);
const ball = new THREE.SphereGeometry(1, 32, 24);
const ink = new THREE.MeshBasicMaterial({ color: 0x101014 }), glint = new THREE.MeshBasicMaterial({ color: 0xffffff });
const flat = (hex, extra = {}) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.5, ...extra });

function tops(material) {
  const make = (...meshes) => { const g = new THREE.Group(); meshes.forEach((m) => { m.castShadow = true; g.add(m); }); g.visible = false; return g; };
  const at = (mesh, x, y, z, s = 1) => { mesh.position.set(x, y, z); if (Array.isArray(s)) mesh.scale.set(...s); else mesh.scale.setScalar(s); return mesh; };
  const cone = (r, h, m) => new THREE.Mesh(new THREE.ConeGeometry(r, h, 24), m);
  const leaf = flat(0x35c873), gold = flat(0xffc53d, { metalness: 0.5, roughness: 0.3 }), accent = flat(0xff5a4d, { emissive: 0xff5a4d, emissiveIntensity: 0.6 });
  const earL = at(cone(0.2, 0.42, material), -0.33, 1.74, 0); earL.rotation.z = 0.32; const earR = at(cone(0.2, 0.42, material), 0.33, 1.74, 0); earR.rotation.z = -0.32;
  const crown = make(at(new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.36, 0.14, 32, 1, true), gold), 0, 1.84, 0));
  for (let k = 0; k < 6; k++) crown.add(at(cone(0.085, 0.24, gold), Math.sin(k / 6 * TAU) * 0.31, 2.0, Math.cos(k / 6 * TAU) * 0.31));
  return {
    none: make(),
    bear: make(at(new THREE.Mesh(ball, material), -0.4, 1.7, 0, 0.21), at(new THREE.Mesh(ball, material), 0.4, 1.7, 0, 0.21)),
    cat: make(earL, earR),
    antenna: make(at(new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.42), flat(0x888888)), 0, 2.02, 0), at(new THREE.Mesh(ball, accent), 0, 2.28, 0, 0.1)),
    sprout: make(at(new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.3), leaf), 0, 1.96, 0), at(new THREE.Mesh(ball, leaf), -0.15, 2.14, 0, [0.17, 0.05, 0.1]), at(new THREE.Mesh(ball, leaf), 0.15, 2.16, 0, [0.17, 0.05, 0.1])),
    crown,
  };
}

function createMochi(look, index) {
  const material = new THREE.MeshPhysicalMaterial({ color: look.hex, roughness: 0.48, sheen: 1, sheenRoughness: 0.45, sheenColor: new THREE.Color(look.hex).lerp(new THREE.Color(0xffffff), 0.5), clearcoat: 0.22, clearcoatRoughness: 0.5 });
  const root = new THREE.Group(), squash = new THREE.Group(); root.add(squash);
  const body = new THREE.Mesh(bodyGeometry, material); body.castShadow = true; body.receiveShadow = true; squash.add(body);
  for (const side of [-1, 1]) { const hand = new THREE.Mesh(ball, material); hand.position.set(side * 0.5, 0.3, 0.74); hand.scale.set(0.25, 0.3, 0.2); hand.castShadow = true; squash.add(hand); }
  const eyes = new THREE.Group(); eyes.position.set(0, 1.3, 0.555); squash.add(eyes);
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(ball, ink); eye.position.x = side * 0.19; eye.scale.set(0.085, 0.13, 0.04); eye.rotation.y = side * 0.3; eyes.add(eye);
    const shine = new THREE.Mesh(ball, glint); shine.position.set(side * 0.19 - 0.025, 0.045, 0.04); shine.scale.setScalar(0.022); eyes.add(shine);
  }
  const hats = tops(material); Object.values(hats).forEach((h) => squash.add(h)); hats[look.top].visible = true;
  scene.add(root);
  return { root, squash, eyes, hats, material, look, index, y: 0, vy: 0, sq: 0, hop: Math.random() * 4, blink: Math.random() * 5, now: null };
}
const cast = CAST.map(createMochi);

// Props: night sky, sandbox, confetti.
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(Array.from({ length: 900 }, (_, i) => (i % 3 === 1 ? Math.random() * 22 + 1 : (Math.random() - 0.5) * 70) - (i % 3 === 2 ? 18 : 0)), 3));
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xcfe0ff, size: 0.09, transparent: true, opacity: 0, depthWrite: false })); scene.add(stars);
const moon = new THREE.Mesh(ball, new THREE.MeshBasicMaterial({ color: 0xf4f1e4, transparent: true, opacity: 0 })); moon.position.set(-7, 9, -16); moon.scale.setScalar(1.3); scene.add(moon);
const box = new THREE.Group();
const boxSize = [5.2, 2.9, 5.2], boxShape = new THREE.BoxGeometry(...boxSize);
box.add(new THREE.Mesh(boxShape, new THREE.MeshPhysicalMaterial({ color: 0xffd28a, transparent: true, opacity: 0.1, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false })));
box.add(new THREE.LineSegments(new THREE.EdgesGeometry(boxShape), new THREE.LineBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.85 })));
scene.add(box);
const CONFETTI = 260, bits = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.09), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), CONFETTI);
const bitState = Array.from({ length: CONFETTI }, () => ({ x: (Math.random() - 0.5) * 18, y: Math.random() * 12, z: (Math.random() - 0.5) * 8, v: 1.2 + Math.random() * 2, r: Math.random() * TAU, w: 1 + Math.random() * 4 }));
bitState.forEach((_, i) => bits.setColorAt(i, new THREE.Color(CAST[1 + (i % (N - 1))].hex)));
bits.visible = false; scene.add(bits);

// The road: five stepping stones, one per phase. They rise out of the floor in the roadmap chapter.
const stones = new THREE.Group();
const stoneShape = new THREE.CylinderGeometry(1.25, 1.25, 0.1, 64), ringShape = new THREE.TorusGeometry(1.25, 0.03, 8, 96);
const stoneLooks = [0x00c972, 0x4d9bff, 0x8a8a94, 0x6a6a74, 0x4c4c56];
[0, 1, 2, 3, 4].forEach((j) => {
  const lit = j < 2;
  const disc = new THREE.Mesh(stoneShape, new THREE.MeshStandardMaterial({ color: lit ? 0x1b1f2a : 0x141416, roughness: 0.6, emissive: stoneLooks[j], emissiveIntensity: lit ? 0.22 : 0.03 }));
  const ring = new THREE.Mesh(ringShape, new THREE.MeshBasicMaterial({ color: stoneLooks[j], transparent: true, opacity: lit ? 1 : 0.55 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.06; disc.receiveShadow = true;
  const stone = new THREE.Group(); stone.add(disc, ring); stone.userData.j = j; stones.add(stone);
});
scene.add(stones);
const ring = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.035, 12, 120), new THREE.MeshBasicMaterial({ color: 0xff9ecf })); ring.visible = false; scene.add(ring);

// ───────── chapter states ─────────
let stage = 0; // which promise is on, as a smoothed number 0…4
const FIVE = [1, 2, 3, 5, 6], STONES = [0, 1, 2, 3, 4].map((j) => [-4.4 + j * 2.0, 3.2 - j * 2.7]);
const arcX = (i) => (i - 4.5) * 1.5, arcZ = (i) => -2.6 + Math.abs(i - 4.5) * 0.55;
function layout(k, i) {
  if (narrow() && (k === 1 || k === 8 || k === 10)) { const j = (i + 1) % N; return { x: (j % 3 - 1) * 1.75, z: (1 - Math.floor(j / 3)) * 1.9, s: 0.9, jump: k === 10 ? 1 : 0 }; }
  switch (k) {
    case 0: { // the coordinator in front, the team in a V behind: four on each side
      if (i === 0) return { x: 0, z: 0.7, s: 0.95 };
      const j = i - 1, side = j % 2 ? 1 : -1, r = Math.floor(j / 2);
      return narrow() ? { x: side * (0.95 + r * 0.62), z: -0.5 - r * 0.75, s: 0.58, ry: -side * 0.3 } : { x: side * (1.35 + r * 1.12), z: -0.3 - r * 0.6, s: 0.7, ry: -side * 0.28 };
    }
    case 1: return i === 0 ? { x: 0, z: 1.1, s: 1.05 } : { x: arcX(i), z: arcZ(i), s: 0.9 };
    case 2: { const a = i / N * TAU; return { x: Math.sin(a) * 2.9, z: Math.cos(a) * 2.9, ry: a + Math.PI, s: 0.82 }; }
    case 3: { if (i === 3) return { x: 0, z: 0.4, s: 1 }; const j = i > 3 ? i - 1 : i, a = j / 8 * TAU + 0.4; return { x: Math.sin(a) * 3.7, z: Math.cos(a) * 3.3 - 0.6, ry: a + Math.PI, s: 0.85, sleep: 1 }; }
    case 4: return i === 0 ? { x: 0.3, z: 2.2, s: 0.9, ry: 0.5 } : { x: -2.0 + ((i - 1) % 4) * 0.9 + Math.floor((i - 1) / 4) * 0.45, z: -3.0 - Math.floor((i - 1) / 4) * 1.4, s: 0.62, ry: 0.25 };
    case 5: { if (i === 0) return { x: 0, y: 2.9, z: 0, s: 0.9 }; const j = i - 1; return { x: (j % 3 - 1) * 1.5, z: (Math.floor(j / 3) - 1) * 1.5, s: 0.7 }; }
    case 6: { // one promise at a time: its Mochi takes the front, the others wait behind; for the last one everybody gathers
      const j = FIVE.indexOf(i), w = j >= 0 ? clamp(1 - Math.abs(stage - j)) : 0, gather = clamp(stage - 3);
      const rest = j >= 0 ? { x: (j - 2) * 1.5, z: -2.2, s: 0.74 } : { x: ([0, 4, 7, 8].indexOf(i) - 1.5) * 1.9, z: -4.6, s: 0.62 };
      const a = (i - 4) / 4 * 1.75, near = { x: Math.sin(a) * 2.9, z: 2.2 - Math.cos(a) * 2.6, s: 0.8 };
      const back = { x: lerp(rest.x, near.x, gather), z: lerp(rest.z, near.z, gather), s: lerp(rest.s, near.s, gather) };
      return { x: lerp(back.x, 0, w), z: lerp(back.z, 2.3, w), s: lerp(back.s, 1.3, w) };
    }
    case 9: { // the road: the squad on what is done, the coordinator on "now", a scout one step ahead
      if (i === 0) return { x: STONES[1][0], z: STONES[1][1], s: 0.85 };
      if (i === 8) return { x: STONES[2][0], z: STONES[2][1], s: 0.55 };
      const a = (i - 1) / 7 * TAU; return { x: STONES[0][0] + Math.sin(a) * 0.95, z: STONES[0][1] + Math.cos(a) * 0.95, s: 0.42 };
    }
    case 7: return i === BUILD ? { x: 0, z: 0, s: 1.35, spin: 1 } : { x: (i % 2 ? 1 : -1) * (15 + i * 1.5), z: -3, s: 0.8 };
    case 8: return { x: (i - 4) * 1.55, z: 0, s: 0.9 };
    default: return { x: (i - 4) * 1.4, z: -Math.abs(i - 4) * 0.3, s: 0.95, jump: 1 };
  }
}
const GRID = { p: [0, 10.5, 21.5], l: [0, 0.7, 0], far: 1 }; // phones: the rows become a 3 × 3 block seen from above
const SHOTS = [
  { p: [0, 1.6, 11], l: [0, 1.0, 0], sx: 0, sy: 0.28, m: { sy: 0.33, far: 1.45 } },
  { p: [0, 2.4, 17], l: [0, 1.0, 0], sx: 0, sy: 0.24, m: { ...GRID, sy: 0.27 } },
  { p: [0, 12, 13.5], l: [0, 0.3, 0], sx: -0.29, sy: 0, m: { sy: 0.2, far: 2 } },
  { p: [0, 3.6, 15], l: [0, 0.8, 0], sx: 0.25, sy: 0.06, m: { p: [0, 7, 15], sy: 0.2, far: 1.95 } },
  { p: [0, 2.2, 14], l: [0, 1.0, 0], sx: 0.07, sy: 0.24, m: { p: [0, 2.2, 14], l: [-3.2, 1.0, 0], sy: 0.3, far: 1.7 } },
  { p: [7.5, 6.6, 15.5], l: [0, 1.0, 0], sx: -0.24, sy: 0.02, m: { sy: 0.25, far: 1.7 } },
  { p: [0, 2.7, 15.5], l: [0, 1.15, 0.6], sx: 0.27, sy: 0.04, m: { p: [0, 3.6, 19], l: [0, 1.0, 0.6], sy: 0.33, far: 1 } },
  { p: [0, 2.2, 11.5], l: [0, 1.25, 0], sx: 0.25, sy: 0.02, m: { sy: 0.36, far: 2.1 } },
  { p: [0, 1.4, 16.5], l: [0, 2.2, 0], sx: 0, sy: 0.27, m: { ...GRID, sy: 0.36 } },
  { p: [-5, 7.2, 17.5], l: [-0.4, 0.3, -2.2], sx: -0.23, sy: 0.02, m: { p: [-5, 15, 31], l: [-0.6, 0, -2.2], sy: 0.34, far: 1 } },
  { p: [0, 1.6, 15], l: [0, 2.2, 0], sx: 0, sy: 0.17, m: { ...GRID, sy: 0.2 } },
];
const MOOD = [
  { glow: [16, 26, 58], spot: 1 }, { glow: [44, 18, 60] }, { glow: [12, 44, 36] }, { glow: [8, 14, 52], night: 1 }, { glow: [58, 16, 40] },
  { glow: [54, 38, 10], box: 1 }, { glow: [26, 28, 52] }, { glow: [14, 34, 66] }, { glow: [12, 28, 60] }, { glow: [10, 40, 58], road: 1 }, { glow: [48, 18, 62], party: 1 },
];
const LAST = SHOTS.length - 1;
// Pacing per chapter: [text starts leaving, text gone, scene starts moving]. The text always leaves before the scene changes.
const PACE = (i) => i === 0 ? [0.42, 0.57, 0.55] : i === 4 ? [0.72, 0.8, 0.78] : i === 6 ? [0.84, 0.9, 0.88] : [0.56, 0.72, 0.64];
const get = (o, key, fallback = 0) => o[key] ?? fallback;

// ───────── tags: names, speech, sleep ─────────
const tagLayer = $("#tags");
const tag = (cls, html) => { const el = document.createElement("div"); el.className = "tag " + cls; el.innerHTML = html; tagLayer.append(el); return el; };
const names = cast.map((m) => tag("", `${m.look.name}<small>${m.look.job}</small>`));
const TALK = [[0, 0.12, "@Mira @Otto checkout breaks on phones"], [1, 0.3, "found it: trailing space"], [2, 0.46, "fixed. @Theo review?"], [3, 0.62, "one nit, then ship it"], [0, 0.78, "nice. I'll tell the boss"]];
const says = TALK.map(([who, , text]) => tag("say", text));
const zzz = [1, 5, 7].map(() => tag("zzz", "z z z"));
const price = tag("price", "$0");
const promiseRows = $$("#promises .promise"), ticks = $$("#ticks i"), promiseCount = $("#promise-now");
const stages = ["Done", "Now", "Next", "Later", "Beyond"].map((name, j) => tag("stage" + (j === 1 ? " now" : ""), name));
const roadRows = $$("#road-list li");
let promiseNow = -1;
const v3 = new THREE.Vector3();
function place(el, mochi, lift, on) {
  el.classList.toggle("on", on);
  if (!on) return;
  v3.set(mochi.root.position.x, mochi.root.position.y + lift * mochi.root.scale.x, mochi.root.position.z).project(camera);
  const half = el.offsetWidth / 2 + 8; // keep the whole tag inside the screen
  el.style.transform = `translate(${clamp((v3.x * 0.5 + 0.5) * innerWidth, half, innerWidth - half)}px, ${(-v3.y * 0.5 + 0.5) * innerHeight}px)`;
}

// ───────── hero: the team gets hired one by one, the headline names each job ─────────
const HIRES = ["researcher.", "developer.", "reviewer.", "writer.", "designer.", "night shift.", "data nerd.", "tester."];
const backOut = (t) => { const c = 1.9; return t <= 0 ? 0 : 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
let hireAt = Infinity; const HIRE_STEP = 0.34;
const hirePop = (i, time) => clamp((time - hireAt - (i - 1) * HIRE_STEP) / 0.5);
const hire = $("#hire");
function say(text, hex) { hire.textContent = text; hire.style.setProperty("--hc", hex ?? "var(--text)"); hire.classList.remove("flip"); void hire.offsetWidth; hire.classList.add("flip"); }
// "hired a" stays where it sits in "hired a team." and only the job word grows to the right.
const hireLine = hire.closest("[data-lines] > span");
function anchorHire() {
  hireLine.style.textAlign = ""; hireLine.style.paddingLeft = "";
  if (getComputedStyle(hire).display === "block") return; // phones: the word has its own line
  const keep = hire.textContent; hire.textContent = "team.";
  const text = document.createRange(); text.selectNodeContents(hireLine.firstElementChild);
  const free = hireLine.clientWidth - text.getBoundingClientRect().width;
  hire.textContent = keep;
  hireLine.style.textAlign = "left"; hireLine.style.paddingLeft = Math.max(0, free / 2) + "px";
}
document.fonts.ready.then(anchorHire); addEventListener("resize", anchorHire);

function startHiring(now) {
  anchorHire();
  hireAt = now;
  if (scrollY > innerHeight * 0.3 || matchMedia("(prefers-reduced-motion: reduce)").matches) { hireAt = -99; return; }
  HIRES.forEach((word, j) => setTimeout(() => { if (scrollY < innerHeight * 0.3) say(word, hexOf(CAST[j + 1].hex)); }, j * HIRE_STEP * 1000));
  setTimeout(() => say("team."), HIRES.length * HIRE_STEP * 1000 + 250);
}

// ───────── builder ─────────
const NAMES = ["Kiko", "Miro", "Juna", "Pixel", "Nori", "Bao", "Yuzu", "Taro", "Momo", "Suki", "Pip"], JOBS = ["code reviewer", "researcher", "release manager", "bug hunter", "copywriter", "data wrangler", "test writer", "inbox tamer", "night shift"];
const COLOURS = [0xf2f2f2, 0xa97efe, 0x00c972, 0xff781c, 0x1cc3b0, 0x2a92fe, 0xffaf38, 0xff3e51, 0xff5eb1], TOPS = ["none", "bear", "cat", "antenna", "sprout", "crown"];
const hexOf = (n) => "#" + n.toString(16).padStart(6, "0"), pick = (list) => list[Math.floor(Math.random() * list.length)];
$("#c-hex").innerHTML = COLOURS.map((c) => `<button class="chip dot" style="--c:${hexOf(c)}" data-hex="${c}" aria-label="Colour"></button>`).join("");
$("#c-top").innerHTML = TOPS.map((t) => `<button class="chip" data-top="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("");
function dress(change, rename) {
  const m = cast[BUILD]; Object.assign(m.look, change);
  m.material.color.setHex(m.look.hex); m.material.sheenColor.setHex(m.look.hex).lerp(new THREE.Color(0xffffff), 0.5);
  Object.entries(m.hats).forEach(([name, group]) => (group.visible = name === m.look.top));
  m.sq = 0.3; m.vy = 3;
  if (rename) { $("#b-name").textContent = pick(NAMES); $("#b-job").textContent = pick(JOBS); }
  $$("#c-hex .chip").forEach((c) => c.classList.toggle("on", +c.dataset.hex === m.look.hex)); $$("#c-top .chip").forEach((c) => c.classList.toggle("on", c.dataset.top === m.look.top));
  MOOD[7].glow = new THREE.Color(m.look.hex).multiplyScalar(0.3).toArray().map((v) => Math.round(v * 255));
}
$(".controls").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) dress(c.dataset.hex ? { hex: +c.dataset.hex } : { top: c.dataset.top }, false); });
$("#shuffle").addEventListener("click", () => dress({ hex: pick(COLOURS.slice(1)), top: pick(TOPS) }, true));
dress({}, false);

const copy = $("#copy");
copy.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("git clone https://github.com/fabianheimann5128/mochi-squad.git && cd mochi-squad && ./setup.sh"); } catch { /* clipboard blocked: the commands stay selectable */ }
  copy.textContent = "Copied ✓"; copy.classList.add("done"); setTimeout(() => { copy.textContent = "Copy"; copy.classList.remove("done"); }, 1800);
});

// "Open.": the Mochi turns to glass so you can see right through it
function glass(m, v) {
  const t = v > 0.02 ? v : 0; if (m.glass === t) return; m.glass = t;
  Object.assign(m.material, { transmission: t, thickness: 0.35, ior: 1.12, roughness: lerp(0.48, 0.1, t), clearcoat: lerp(0.22, 1, t), clearcoatRoughness: lerp(0.5, 0.05, t), sheen: 1 - t });
  m.material.color.setHex(m.look.hex).lerp(new THREE.Color(0xffffff), t * 0.55);
}

// Click a Mochi and it hops.
const ray = new THREE.Raycaster(), tap = new THREE.Vector2();
addEventListener("click", (e) => {
  if (e.target.closest("a, button, input, .term")) return;
  tap.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(tap, camera);
  const hit = ray.intersectObjects(cast.map((m) => m.root), true)[0];
  if (!hit) return;
  const m = cast.find((c) => { let o = hit.object; while (o && o !== c.root) o = o.parent; return o === c.root; });
  if (m) { m.vy = 5.2; m.sq = 0.32; }
});

// ───────── frame loop ─────────
let bounds = [], width = 0, height = 0;
function measure() {
  width = innerWidth; height = innerHeight;
  renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
  bounds = chapters.map((c) => ({ top: c.offsetTop, height: c.offsetHeight }));
}
addEventListener("resize", measure); measure(); new ResizeObserver(measure).observe(document.body);

/** Continuous chapter position: 2.0 means chapter 2 fills the screen; the blend to the next happens late in each chapter. */
function chapterAt(y) {
  const line = y + height * 0.5;
  for (let i = bounds.length - 1; i >= 0; i--) if (line >= bounds[i].top) return { index: i, part: clamp((line - bounds[i].top) / bounds[i].height) };
  return { index: 0, part: 0 };
}
const nav = $("#nav"), railNow = $("#rail-now"), railBar = $("#rail-bar"), body = document.body;
const phone = $("#phone"), phoneLines = $$(".phone-chat .msg[data-at]"), typingRow = $("#typing"), phoneSub = $("#phone-sub"), banner = $("#banner");
const copies = $$(".chapter .copy");
const clock = new THREE.Clock();
let position = 0, lastScroll = scrollY, glow = [16, 26, 58];
const eye = new THREE.Vector3(), aim = new THREE.Vector3();

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05), time = clock.elapsedTime;
  const at = chapterAt(scrollY);
  const target = Math.min(LAST, at.index + smooth(PACE(at.index)[2], 0.98, at.part));
  chapters.forEach((c, i) => { // --out: 0 while the chapter's text is up, 1 once it has left
    const out = i === LAST ? 0 : i < at.index ? 1 : i > at.index ? 0 : smooth(PACE(i)[0], PACE(i)[1], at.part);
    const v = out.toFixed(3); if (c.dataset.out !== v) { c.dataset.out = v; c.style.setProperty("--out", v); }
  });
  nav.classList.toggle("at-top", scrollY < height * 0.55);
  position = lerp(position, target, 1 - Math.pow(0.0012, dt)); // smooth follow, frame-rate independent
  const k = Math.min(LAST - 1, Math.floor(position)), t = position - k;
  pointer.sx = lerp(pointer.sx, pointer.nx, 0.06); pointer.sy = lerp(pointer.sy, pointer.ny, 0.06);
  pointer.cx = lerp(pointer.cx, pointer.x, 0.22); pointer.cy = lerp(pointer.cy, pointer.y, 0.22);
  cursor.style.transform = `translate(${pointer.cx}px, ${pointer.cy}px)`;
  if (Math.abs(scrollY - lastScroll) > 6) { nav.classList.toggle("hide", scrollY > lastScroll && scrollY > 300); lastScroll = scrollY; }
  railNow.textContent = String(Math.round(position) + 1).padStart(2, "0"); railBar.style.height = (position / LAST) * 100 + "%";

  // Mood
  const mood = (key) => lerp(get(MOOD[k], key), get(MOOD[k + 1], key), t);
  const night = mood("night"), boxed = mood("box"), party = mood("party");
  glow = glow.map((v, i) => lerp(v, lerp(MOOD[k].glow[i], MOOD[k + 1].glow[i], t), 0.1));
  body.style.setProperty("--bg2", `rgb(${glow.map(Math.round).join(",")})`);
  hemi.intensity = lerp(1.25, 0.16, night); key.intensity = lerp(2.6, 0.35, night); key.color.setRGB(lerp(1, 0.55, night), lerp(1, 0.68, night), 1);
  lamp.intensity = night * 420 + mood("spot") * 160; stars.material.opacity = night * 0.9; moon.material.opacity = night; moon.visible = stars.visible = night > 0.05; moon.scale.setScalar(1.3 * night);
  box.visible = boxed > 0.01; box.position.set(0, boxSize[1] / 2 + (1 - bounce(clamp(boxed * 1.25))) * 14, 0);
  const road = mood("road"); stones.visible = road > 0.01;
  if (stones.visible) stones.children.forEach((stone, j) => { const up = smooth(j * 0.12, j * 0.12 + 0.5, road); stone.position.set(STONES[j][0], -0.6 + up * 0.65, STONES[j][1]); stone.scale.setScalar(0.6 + up * 0.4); });
  bits.visible = party > 0.02;
  if (bits.visible) {
    const dummy = frame.dummy ??= new THREE.Object3D();
    bitState.forEach((b, i) => { b.y -= b.v * dt; if (b.y < 0) b.y = 11; dummy.position.set(b.x + Math.sin(time * b.w * 0.3 + i) * 0.4, b.y, b.z); dummy.rotation.set(time * b.w, b.r + time * b.w * 0.7, 0); dummy.scale.setScalar(party); dummy.updateMatrix(); bits.setMatrixAt(i, dummy.matrix); });
    bits.instanceMatrix.needsUpdate = true;
  }

  // Camera. On phones every shot has its own framing: the scene sits below the text and stays inside a narrow frame.
  const wide = !narrow(), shot = (n) => { const o = SHOTS[n], m = o.m ?? {}; return wide ? { p: o.p, l: o.l, sx: o.sx, sy: o.sy, far: 1 } : { p: m.p ?? o.p, l: m.l ?? o.l, sx: 0, sy: m.sy ?? 0.3, far: m.far ?? 1.9 }; };
  const a = shot(k), b = shot(k + 1);
  aim.set(lerp(a.l[0], b.l[0], t), lerp(a.l[1], b.l[1], t), lerp(a.l[2], b.l[2], t));
  eye.set(lerp(a.p[0], b.p[0], t), lerp(a.p[1], b.p[1], t), lerp(a.p[2], b.p[2], t)).sub(aim).multiplyScalar(lerp(a.far, b.far, t)).add(aim);
  camera.position.set(eye.x + pointer.sx * 0.7, eye.y - pointer.sy * 0.4, eye.z); camera.lookAt(aim);
  camera.setViewOffset(width, height, -lerp(a.sx, b.sx, t) * width, -lerp(a.sy, b.sy, t) * height, width, height);

  // Cast
  cast.forEach((m, i) => {
    const from = layout(k, i), to = layout(k + 1, i);
    const own = clamp(t * 1.5 - (i / N) * 0.5); // everyone leaves a little after the one before
    const e = own * own * (3 - 2 * own);
    const val = (key, fallback = 0) => lerp(get(from, key, fallback), get(to, key, fallback), e);
    const sleep = val("sleep"), jump = val("jump"), spin = val("spin"), s = val("s", 1);
    const arc = Math.sin(own * Math.PI) * 0.9 * Math.min(1, Math.hypot(get(to, "x") - get(from, "x"), get(to, "z") - get(from, "z")) / 3); // a hop on the way over
    m.hop -= dt; if (m.hop < 0) { m.hop = 2.5 + Math.random() * 5; if (!sleep) m.vy = 2.2 + Math.random(); }
    if (jump > 0.5 && m.y <= 0.001) m.vy = 3.2 + Math.random() * 2.4;
    m.vy -= 14 * dt; m.y = Math.max(0, m.y + m.vy * dt); if (m.y === 0 && m.vy < 0) { m.sq = Math.min(0.28, -m.vy * 0.045); m.vy = 0; }
    m.sq = lerp(m.sq, 0, 1 - Math.pow(0.002, dt));
    const y = val("y") + arc + m.y, breathe = Math.sin(time * 1.6 + i) * 0.014, squeeze = m.sq + breathe + sleep * 0.16 - clamp(m.vy * 0.02, -0.08, 0.1);
    m.root.position.set(val("x"), y, val("z"));
    m.root.rotation.y = val("ry") + spin * time * 0.6 + (1 - sleep) * (1 - spin) * pointer.sx * 0.5;
    const popped = i === 0 ? 1 : lerp(backOut(hirePop(i, time)), 1, clamp(position * 3));
    if (i > 0 && popped > 0.05 && !m.hired) { m.hired = true; m.vy = 4.2; m.sq = 0.3; }
    m.root.scale.setScalar(s * Math.max(0.001, popped));
    m.squash.scale.set(1 + squeeze * 0.55, 1 - squeeze, 1 + squeeze * 0.55);
    m.blink -= dt; const closed = m.blink < 0.12; if (m.blink < 0) m.blink = 2 + Math.random() * 4;
    m.eyes.scale.y = sleep > 0.5 || closed ? 0.12 : 1;
    m.eyes.position.x = pointer.sx * 0.07 * (1 - spin); m.eyes.position.y = 1.3 - pointer.sy * 0.05;
    m.now = { sleep };
  });

  // On phones the text of a chapter appears once it has reached the top, instead of sliding through the scene.
  if (!wide) copies.forEach((c) => { const top = c.getBoundingClientRect().top; c.classList.toggle("on", top < height * 0.05 && top > -height * 0.6); });

  // Tags
  const near = (c, span = 0.42) => Math.abs(position - c) < span;
  cast.forEach((m, i) => place(names[i], m, 2.45, near(1, 0.3) && (wide || i === 0)));
  const talking = near(2) && at.index === 2;
  TALK.forEach(([who, when], i) => { const next = TALK[i + 1]?.[1] ?? 2; place(says[i], cast[who], 2.3, talking && at.part >= when * 0.62 && at.part < next * 0.62 + 0.04); });
  [1, 5, 7].forEach((who, i) => place(zzz[i], cast[who], 2.2 + Math.sin(time * 1.5 + i) * 0.12, near(3, 0.3)));
  // Promises: one after the other lights up, and its Mochi hops. Roadmap: the phases light up along the road.
  const step = (part) => clamp(Math.floor((part - 0.08) / 0.11), 0, 4);
  const promise = at.index === 6 ? clamp(Math.floor((at.part - 0.1) / 0.155), 0, 4) : at.index > 6 ? 4 : 0;
  stage = lerp(stage, promise, 1 - Math.pow(0.004, dt));
  if (promise !== promiseNow) { promiseNow = promise; if (at.index === 6) cast[FIVE[promise]].vy = 4.4; promiseCount.textContent = promise + 1; }
  const showing = at.index === 6;
  promiseRows.forEach((row, j) => { row.classList.toggle("on", showing && j === promise); row.classList.toggle("gone", j < promise); });
  ticks.forEach((tick, j) => tick.classList.toggle("on", j === promise));
  if (near(6, 0.6)) {
    MOOD[6].glow = new THREE.Color(cast[FIVE[Math.round(stage)]].look.hex).multiplyScalar(0.26).toArray().map((v) => Math.round(v * 255));
    // Open: you can see right through it. Yours: a ring that keeps it together.
    const open = cast[FIVE[1]], see = clamp(1 - Math.abs(stage - 1)) * (near(6, 0.45) ? 1 : 0);
    glass(open, see);
    const mine = cast[FIVE[3]], hold = clamp(1 - Math.abs(stage - 3)) * (near(6, 0.45) ? 1 : 0);
    ring.visible = hold > 0.02; ring.position.set(mine.root.position.x, 1.0 * mine.root.scale.x, mine.root.position.z); ring.scale.setScalar(hold * mine.root.scale.x); ring.rotation.set(Math.PI / 2 + Math.sin(time * 0.9) * 0.18, 0, time * 0.8);
  } else { ring.visible = false; glass(cast[FIVE[1]], 0); }
  place(price, cast[FIVE[0]], 2.5, showing && promise === 0 && near(6, 0.3));
  const phase = at.index === 9 ? step(at.part) : at.index > 9 ? 4 : -1;
  roadRows.forEach((row, j) => row.classList.toggle("on", at.index === 9 ? j === phase : false));
  stages.forEach((el, j) => { const on = near(9, 0.3) && stones.visible; el.classList.toggle("on", on); if (on) { v3.set(STONES[j][0], 0.1, STONES[j][1] + 1.7).project(camera); el.style.transform = `translate(${(v3.x * 0.5 + 0.5) * innerWidth}px, ${(-v3.y * 0.5 + 0.5) * innerHeight}px)`; } });
  if (Math.abs(position - 4) < 1.3) {
    const inPhone = at.index === 4 ? at.part : at.index > 4 ? 1 : 0;
    const enter = wide ? smooth(0.06, 0.24, inPhone) : 1, leave = wide ? +chapters[4].dataset.out || 0 : 0;
    if (wide) {
      phone.style.opacity = (enter * (1 - leave)).toFixed(3);
      const rx = (1 - enter) * 30 + 5 - pointer.sy * 9, ry = -15 + pointer.sx * 18 - (1 - enter) * 12, rz = (1 - enter) * 7 + 1.5, dy = (1 - enter) * 16 - leave * 5;
      phone.style.transform = "perspective(1600px) translate3d(0," + dy.toFixed(2) + "vh,0) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) rotateZ(" + rz.toFixed(2) + "deg)";
      phone.style.setProperty("--gx", (30 + pointer.sx * 70 + inPhone * 40).toFixed(1) + "%");
    }
    let typing = false;
    phoneLines.forEach((row) => {
      const when = +row.dataset.at, on = inPhone >= when, mine = row.classList.contains("me");
      if (on && !row.classList.contains("on") && !mine) { cast[0].vy = 3.6; cast[0].sq = 0.25; }
      row.classList.toggle("on", on);
      if (!mine && !on && inPhone >= when - 0.06) typing = true;
    });
    typingRow.classList.toggle("on", typing);
    if (phoneSub.classList.contains("typing-now") !== typing) { phoneSub.textContent = typing ? "typing…" : "coordinator · online"; phoneSub.classList.toggle("typing-now", typing); }
    banner.classList.toggle("on", inPhone >= 0.66);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

// ───────── start ─────────
const count = $("#count");
let shown = 0;
const tick = setInterval(() => {
  shown = Math.min(100, shown + 3 + Math.random() * 7); count.textContent = Math.floor(shown);
  if (shown >= 100) { clearInterval(tick); document.documentElement.classList.add("ready"); chapters[0].classList.add("in"); setTimeout(() => startHiring(clock.elapsedTime), 1300); }
}, 40);
renderer.compile(scene, camera);
requestAnimationFrame(frame);
