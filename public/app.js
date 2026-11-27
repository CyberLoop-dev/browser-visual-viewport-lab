const metrics = document.getElementById("metrics");
const visual = document.getElementById("visual");
const support = document.getElementById("support");
const fmt = (value) => Number.isFinite(value) ? value.toFixed(2) : "—";
function update() {
  const vv = window.visualViewport;
  const data = [
    ["window.innerWidth", window.innerWidth],
    ["window.innerHeight", window.innerHeight],
    ["visualViewport.width", vv?.width],
    ["visualViewport.height", vv?.height],
    ["visualViewport.scale", vv?.scale],
    ["offsetLeft", vv?.offsetLeft],
    ["offsetTop", vv?.offsetTop],
    ["pageLeft", vv?.pageLeft],
    ["pageTop", vv?.pageTop],
    ["devicePixelRatio", window.devicePixelRatio]
  ];
  support.textContent = vv ? "VisualViewport supported" : "VisualViewport unavailable";
  metrics.innerHTML = data.map(([label,value]) => `<div class="metric"><small>${label}</small><strong>${fmt(value)}</strong></div>`).join("");
  if (vv) {
    const scale = Math.max(.5, Math.min(1.4, 1 / vv.scale));
    visual.style.transform = `scale(${scale})`;
  }
}
window.addEventListener("resize", update);
window.addEventListener("scroll", update, {passive:true});
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", update);
  window.visualViewport.addEventListener("scroll", update);
}
update();
