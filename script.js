/* ===== EDIT YOUR CONTENT HERE ===== */
const GH = "https://github.com/NaveenKumar1822/";
// "image": "assets/name.png" on a project adds a screenshot to its case study.
const projects = [
  {
    name: "Nassau Candy Logistics Intelligence", cat: "Logistics analytics", chart: "donut",
    caption: "Shipments on time vs SLA breach",
    summary: "Finds SLA breaches and operational bottlenecks across lanes and factories, with an interactive Streamlit dashboard.",
    tags: ["Python", "Pandas", "Plotly", "Streamlit", "Parquet"],
    repo: GH + "nassau-candy-logistics-intelligence",
    problem: "Understand delivery performance, SLA compliance and operational bottlenecks at the lane and factory level.",
    data: "Nassau Candy shipment records: 10,194 shipments across 196 lanes and 5 factories.",
    approach: ["Data preparation and exploratory analysis", "KPI development for logistics performance and SLA compliance", "Interactive Streamlit app with Plotly charts to monitor performance and delivery trends", "Reproducible pipeline for ongoing monitoring"],
    results: ["53.50% of shipments were on time; 46.5% breached the SLA", "Surfaced performance patterns across factories, routes and shipment characteristics"],
    insights: ["Lane and factory patterns show where operational fixes matter most", "KPIs give a repeatable way to monitor SLA compliance"]
  },
  {
    name: "Realized Volatility Forecasting", cat: "Time series", chart: "rmse",
    caption: "Test RMSE by model (lower is better)",
    summary: "Benchmarks naive persistence, ARIMA, HAR-RV and LightGBM on the XLE energy ETF. The honest finding: naive persistence won.",
    tags: ["Python", "Pandas", "NumPy", "Statsmodels", "LightGBM", "Matplotlib"],
    repo: GH + "realized-volatility-forecasting",
    problem: "Forecast 1-day-ahead, 21-day annualized realized volatility of XLE for options pricing and hedging, and test whether LightGBM meaningfully beats a naive persistence baseline and ARIMA.",
    data: "Daily OHLCV data for XLE via yfinance, 2010 to 2023 (3,522 trading days), spanning the 2014 oil collapse, the 2020 COVID crash and the 2022 energy crisis. Chronological split: train to 2018, validation 2019–2020, test 2021–2023 (752 days).",
    approach: ["Leakage-safe target alignment and chronological split", "Features: volatility lags and rolling stats, range-based estimators (Parkinson, Garman-Klass), downside-return terms", "Models: naive persistence, ARIMA(5,1,0), HAR-RV, LightGBM v1 and v2", "Regime-segmented error analysis"],
    results: ["Test RMSE: Naive 0.0164, ARIMA 0.0209, LightGBM v2 0.0212, LightGBM v1 0.0217, HAR-RV 0.0219", "Naive also had the lowest MAE (0.0097)", "On high-volatility days the naive RMSE advantage over LightGBM was about 72%, versus about 9% in normal conditions", "Garman-Klass was the most-used feature in LightGBM v2"],
    insights: ["Carrying forward yesterday's realized volatility is a strong production baseline for XLE options pricing", "Next steps: range-based intraday features and better responsiveness to volatility regime shifts"]
  },
  {
    name: "Horizon PD Modeling", cat: "Credit risk", chart: "tiers",
    caption: "Observed default rate by risk tier, 1 to 10",
    summary: "An interpretable probability-of-default engine: WoE logistic regression, calibrated probabilities, 10-tier risk grading and a Streamlit scoring app.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
    repo: GH + "horizon-pd-modeling",
    problem: "Build an auditable, data-driven estimate of probability of default at loan origination, framed as a consumer finance scenario.",
    data: "Consumer application and credit bureau data, using only resolved outcomes (fully paid vs charged off) to avoid target leakage. Risk grading evaluated on 4,218 loans.",
    approach: ["Right-censoring treatment and applicant-level bureau aggregation", "Monotonic Weight of Evidence features feeding a logistic regression", "Logit-shift prior adjustment to correct class-weight distortion", "Tuned XGBoost as a benchmark", "10-tier grading and expected loss (PD × LGD × EAD, assuming 45% LGD and $15,000 EAD)", "Streamlit app applying the saved model to new applications"],
    results: ["ROC-AUC 0.7415, Gini 0.4831, KS 0.3778, versus ROC-AUC 0.7384 for the tuned XGBoost", "Brier score cut 55.6% by calibration (0.2082 to 0.0924)", "Observed default rate rose from 1.42% in Tier 1 to 34.12% in Tier 10"],
    insights: ["A simple, explainable model matched a tuned gradient-boosted benchmark", "The tier ladder gives a clear view of default risk and expected loss. The app is a portfolio demonstration, not a lending policy"]
  }
];
const skills = {
  "Programming": ["Python", "SQL", "MySQL", "Pandas", "NumPy", "Parquet"],
  "Analytics": ["Excel", "Data Cleaning", "Exploratory Analysis", "Statistical Analysis", "Business Analytics"],
  "ML / AI": ["Scikit-learn", "Regression", "Classification", "Feature Engineering", "Model Evaluation", "Time Series Forecasting", "LightGBM", "Generative AI", "RAG", "LLM Applications", "NLP Fundamentals"],
  "BI and visualization": ["Power BI", "Matplotlib", "Seaborn", "Plotly", "Dashboard Development"],
  "Cloud": ["Microsoft Azure"],
  "Tools": ["Git", "GitHub", "Jupyter Notebook", "Streamlit"]
};
/* ===== END OF EDITABLE CONTENT ===== */

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ul = a => "<ul>" + a.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

// Mini charts, drawn from each project's real results
function chart(type) {
  if (type === "donut") return `<svg viewBox="0 0 200 110" role="img" aria-label="53.5% on time, 46.5% SLA breach"><g transform="rotate(-90 100 55)"><circle class="ring r1" cx="100" cy="55" r="40"/><circle class="ring r2" cx="100" cy="55" r="40" style="--len:${(251.3 * .535).toFixed(1)}"/></g><text class="t" x="100" y="53" text-anchor="middle" style="font-size:11px">53.5%</text><text class="t" x="100" y="63" text-anchor="middle">on time</text></svg>`;
  const d = type === "rmse"
    ? { v: [.0164, .0209, .0212, .0217, .0219], l: ["Naive", "ARIMA", "LGBM v2", "LGBM v1", "HAR-RV"], top: .0219 }
    : { v: [1.42, 4.27, 4.74, 6.41, 6.40, 8.77, 11.88, 13.51, 22.51, 34.12], l: [], top: 34.12 };
  const n = d.v.length, w = 180 / n;
  return `<svg viewBox="0 0 200 110" role="img" aria-label="${type === "rmse" ? "RMSE by model" : "Default rate by tier"}">` + d.v.map((v, i) => {
    const h = 78 * v / d.top, x = 10 + i * w + w * .15;
    return `<rect class="bar ${i === 0 && type === "rmse" || i === n - 1 && type === "tiers" ? "a" : "b"}" style="transition-delay:${i * .07}s" x="${x}" y="${88 - h}" width="${w * .7}" height="${h}" rx="2"/>` + (d.l[i] ? `<text class="t" x="${x + w * .35}" y="98" text-anchor="middle">${d.l[i]}</text>` : "");
  }).join("") + `</svg>`;
}
const thumb = p => `<div class="thumb">${chart(p.chart)}<p class="mono">${esc(p.caption)}</p></div>`;

$("#project-list").innerHTML = projects.map((p, i) => `
  <article class="card rv" style="--d:${i * .12}s">
    ${thumb(p)}
    <div class="cbody">
      <span class="badge">${esc(p.cat)}</span>
      <h3>${esc(p.name)}</h3><p class="sum">${esc(p.summary)}</p>
      <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="cta"><button class="btn primary" data-i="${i}">View case study</button><a class="btn" href="${p.repo}" target="_blank" rel="noopener">GitHub</a></div>
    </div>
  </article>`).join("");

// Skills tabs
const tabs = $(".tabs"), panel = $("#skill-panel");
const mono = s => s.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
function showSkills(cat) {
  $$("button", tabs).forEach(b => b.setAttribute("aria-selected", b.dataset.c === cat));
  panel.innerHTML = skills[cat].map((s, i) => {
    const n = projects.filter(p => p.tags.some(t => t.toLowerCase() === s.toLowerCase())).length;
    return `<div class="chip" style="animation-delay:${i * .04}s"><i>${esc(mono(s))}</i><div><b>${esc(s)}</b>${n ? `<small>Used in ${n} project${n > 1 ? "s" : ""}</small>` : ""}</div></div>`;
  }).join("");
}
tabs.innerHTML = Object.keys(skills).map(c => `<button role="tab" data-c="${esc(c)}">${esc(c)}</button>`).join("");
tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) showSkills(b.dataset.c); });
showSkills("Programming");

// Case-study modal
const modal = $("#modal");
$("#project-list").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]"); if (!b) return;
  const p = projects[b.dataset.i];
  $("#m-body").innerHTML = `<h3 id="m-title">${esc(p.name)}</h3><p class="mono">${esc(p.cat)}</p>
    ${thumb(p).replace('class="thumb"', 'class="thumb in"')}
    <h4>Problem</h4><p>${esc(p.problem)}</p><h4>Data</h4><p>${esc(p.data)}</p>
    <h4>Approach</h4>${ul(p.approach)}<h4>Technologies</h4><ul class="tags" style="margin:0">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <h4>Key results</h4>${ul(p.results)}<h4>Business insights</h4>${ul(p.insights)}
    ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" style="max-width:100%;margin-top:16px;border-radius:8px">` : ""}
    <p style="margin-top:26px"><a class="btn primary" href="${p.repo}" target="_blank" rel="noopener">View on GitHub</a></p>`;
  modal.showModal();
});
const closeModal = () => { modal.close(); };
$(".close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

// Theme (persisted), with a smooth fade
$(".theme").addEventListener("click", () => {
  const de = document.documentElement, next = de.dataset.theme === "dark" ? "light" : "dark";
  de.classList.add("theming"); de.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  setTimeout(() => { de.classList.remove("theming"); readColor(); }, 400);
});

// Nav: blur on scroll, mobile menu, active section
const nav = $("#nav"), menu = $(".menu"), links = $("#links");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 24), { passive: true });
menu.addEventListener("click", () => menu.setAttribute("aria-expanded", links.classList.toggle("open")));
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); } });
const secs = $$("main section[id]");
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$("a", links).forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
secs.forEach(s => so.observe(s));

// Reveal on scroll (with stagger inside groups)
$$(".hl,.tl,.edu").forEach(g => $$(".rv", g).forEach((el, i) => el.style.setProperty("--d", i * .09 + "s")));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".rv").forEach(el => io.observe(el));

// KPI counters (real numbers only)
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; co.unobserve(e.target);
  $$(".kpi b").forEach(b => {
    const end = +b.dataset.count, dec = +(b.dataset.dec || 0), t0 = performance.now();
    if (calm) return;
    (function f(t) { const k = Math.min(1, (t - t0) / 1400), v = end * (1 - Math.pow(1 - k, 3));
      b.textContent = v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }); if (k < 1) requestAnimationFrame(f); })(t0);
  });
}), { threshold: .4 });
co.observe($(".kpis"));

// Rotating indicator
const words = ["Data Science", "Machine Learning", "Analytics", "AI"], rot = $("#rot");
if (!calm) { let w = 0; setInterval(() => { rot.classList.add("out"); setTimeout(() => { rot.textContent = words[++w % words.length]; rot.classList.remove("out"); }, 250); }, 2600); }

// Hero network background: subtle, pauses off-screen
const cv = $("#bg"), cx = cv.getContext("2d"); let W, H, pts = [], mx = .5, my = .5, col = "15,111,138", vis = true;
function readColor() { col = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim(); if (calm) draw(); }
function size() {
  const r = cv.parentElement.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
  W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
  pts = Array.from({ length: Math.min(70, Math.round(W * H / 20000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, z: .4 + Math.random() }));
}
function draw() {
  cx.clearRect(0, 0, W, H);
  const ox = (mx - .5) * 26, oy = (my - .5) * 26;
  const P = pts.map(p => [p.x + ox * p.z, p.y + oy * p.z, p.z]);
  for (let i = 0; i < P.length; i++) {
    for (let j = i + 1; j < P.length; j++) {
      const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], d = dx * dx + dy * dy;
      if (d < 16900) { cx.strokeStyle = `rgba(${col},${.22 * (1 - d / 16900)})`; cx.beginPath(); cx.moveTo(P[i][0], P[i][1]); cx.lineTo(P[j][0], P[j][1]); cx.stroke(); }
    }
    cx.fillStyle = `rgba(${col},.55)`; cx.beginPath(); cx.arc(P[i][0], P[i][1], 1.3 * P[i][2] + .5, 0, 6.3); cx.fill();
  }
}
function tick() {
  if (vis) { pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }); draw(); }
  requestAnimationFrame(tick);
}
size(); readColor(); addEventListener("resize", () => { size(); if (calm) draw(); });
if (calm) draw(); else {
  new IntersectionObserver(e => vis = e[0].isIntersecting && !document.hidden).observe($(".hero"));
  if (fine) $(".hero").addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; });
  tick();
}

// Card tilt + spotlight, magnetic buttons (mouse only, off for reduced motion)
if (fine) {
  $("#project-list").addEventListener("pointermove", e => {
    const c = e.target.closest(".card"); if (!c) return; const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
    if (!calm) { c.style.setProperty("--ry", (x - .5) * 6 + "deg"); c.style.setProperty("--rx", (.5 - y) * 6 + "deg"); }
  });
  $("#project-list").addEventListener("pointerout", e => { const c = e.target.closest(".card"); if (c) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });
  if (!calm) $$(".mag").forEach(b => {
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
    b.addEventListener("pointerleave", () => b.style.transform = "");
  });
}

// Copy email
$("#copy").addEventListener("click", async function () {
  try { await navigator.clipboard.writeText(this.dataset.email); this.textContent = "Copied!"; }
  catch (e) { this.textContent = "Press Ctrl+C on the address below"; }
  setTimeout(() => this.textContent = "Copy email", 1800);
});
$("#year").textContent = new Date().getFullYear();
