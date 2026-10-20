const $ = (s) => document.querySelector(s);
const root = document.documentElement;

// theme toggle (remembers the choice)
$('#theme').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme-pref', next); } catch (e) {}
});

// Row 1 = the team; row 2 (same column) = what I built there.
const TEAMS = [
  ['Genesilico', 'Lead Research Engineer', 'Working...', 'https://www.genesilico.ai/'],
  ['KPMG India', 'AI/ML Consultant', 'GovTech AI for the Gujarat Government (DST).', 'https://kpmg.com/in/en/services/advisory/consulting/government-and-public-services/government-technology.html'],
  ['HolboxAI', 'Data Scientist II', 'LLM, RAG and medical-imaging POCs for clients.'],
  ['Strand Life Sciences', 'Bioinformatics Engineer II', 'Clinical WES, PGx and CNV pipelines.', 'https://www.strandls.com'],
  ['NielsenIQ', 'Data Processing Specialist', 'Statistical operations and market data validation.', 'https://nielseniq.com'],
  ['Working...', 'Genesilico · Ongoing', ''],
  ['G-SAAR link', 'Builder · KPMG', 'AI search over 30,000+ government circulars, launched by the Chief Minister.'],
  ['Breast MRI Segmentation', 'Researcher · HolboxAI', 'nnU-Net and TransUNet on multiphase MRI, average IoU ≈ 0.81, with a 3D viewer.'],
  ['End-to-End WES Pipeline', 'Builder · Strand', 'Dragen Enrichment data to SNP and CNV calls with variant filtering.'],
  ['PER Automation', 'Logic lead · NielsenIQ', 'Automated final market sign-off, saving 7–10 days with 0% quality escape.']
];

const JOBS = [
  ['Jan 2026 – Present', 'Lead Research Engineer, AI & Bioinformatics', '<a href="https://www.genesilico.ai/" target="_blank" rel="noopener">Genesilico ↗</a> · Delhi (Remote)', ['Working...']],
  ['Jun – Dec 2025', 'AI/ML Consultant, GovTech', '<a href="https://kpmg.com/in/en/services/advisory/consulting/government-and-public-services/government-technology.html" target="_blank" rel="noopener">KPMG India ↗</a> · Gandhinagar', ['Built G-SAAR link (30,000+ documents), launched by the Chief Minister of Gujarat.', 'Led the <a href="https://aiservices.gujarat.gov.in" target="_blank" rel="noopener">Gujarat Government AI Stack ↗</a>; shaped AI infrastructure and GPU strategy.', 'Led a national MoHA analytics dashboard with LLM-driven alerts.', 'Served on the AI CoE at GIFT City building Gujarati LLM and RAG tools.']],
  ['Aug 2024 – May 2025', 'Data Scientist II', 'HolboxAI · Ahmedabad', ['Delivered LLM, RAG and DL/ML POCs.', 'Breast cancer MRI segmentation (nnU-Net, TransUNet), average IoU ≈ 0.81.', 'LLM-based receipt fraud detection and SARIMAX comfort forecasting.']],
  ['Jan 2023 – Aug 2024', 'Associate Bioinformatics Engineer II', 'Strand Life Sciences (Reliance) · Bengaluru', ['Clinical WES panels, PGx report pipeline, WES SNP/CNV pipeline.', 'QC and variant analysis apps with anomaly detection.']],
  ['Jan 2021 – Feb 2022', 'Data Processing Specialist', 'NielsenIQ · Vadodara', ['Led PER Automation: saved 7–10 days of sign-off time with 0% quality escape.']]
];

$('#teams').innerHTML = TEAMS.map((t, i) => {
  const inner = `<h4>${t[0]}</h4><span>${t[1]}</span>${t[2] ? `<p>${t[2]}</p>` : ''}`;
  const cls = `team${i > 4 ? ' built' : ''}`;
  return t[3] ? `<a class="${cls} linked" href="${t[3]}" target="_blank" rel="noopener">${inner}</a>` : `<div class="${cls}">${inner}</div>`;
}).join('');

$('#jobs').innerHTML = JOBS.map((j) =>
  `<div class="job"><small>${j[0]}</small><div><h4>${j[1]}</h4><span>${j[2]}</span><ul>${j[3].map((x) => `<li>${x}</li>`).join('')}</ul></div></div>`).join('');

// soft glow that follows the cursor (skipped on touch screens and for reduced motion)
if (matchMedia('(hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  glow.id = 'glow';
  document.body.appendChild(glow);
  let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; glow.style.opacity = '1'; });
  document.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
  (function loop() {
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    glow.style.transform = `translate(${x - 110}px, ${y - 110}px)`;
    requestAnimationFrame(loop);
  })();
}
