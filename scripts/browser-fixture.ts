export {};
// Standalone offline regression page; no host server or account is required.
const result = await Bun.build({ entrypoints: ["tests/translate-models.tsx"], outdir: "artifacts/browser", target: "browser", define: { "process.env.NODE_ENV": JSON.stringify("development") } });
if (!result.success) throw new AggregateError(result.logs);
const js = (await Bun.file("artifacts/browser/translate-models.js").text()).replaceAll("</script", "<\\/script");
const css = await Bun.file("artifacts/browser/translate-models.css").text();
await Bun.write("artifacts/browser/index.html", `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>Translation regression</title><style>${css}</style></head><body><div id="fixture"></div><pre id="results">Running…</pre><script type="module">${js}</script></body></html>`);
console.log("Open artifacts/browser/index.html; expect PASS lines and no FAIL.");
