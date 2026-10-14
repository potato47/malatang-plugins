import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import translate from "../plugins/translate/src/backend";
import { indexSchema } from "../scripts/catalog";

test("independent SDK dependency matches its recorded archive", async () => {
  const snapshot = await Bun.file("vendor/snapshot.json").json();
  const digest = createHash("sha256").update(await Bun.file("vendor/fn-sdk.tgz").bytes()).digest("hex");
  expect(digest).toBe(snapshot.sha256);
  for (const [path, dependency] of [["package.json", "file:./vendor/fn-sdk.tgz"], ["plugins/translate/package.json", "file:../../vendor/fn-sdk.tgz"], ["plugins/quick-notes/package.json", "file:../../vendor/fn-sdk.tgz"]]) {
    const pkg = await Bun.file(path!).json();
    expect(pkg.devDependencies[snapshot.packageName]).toBe(dependency);
  }
});

test("translation stores preferences and delegates to the selected host model", async () => {
  const writes: unknown[] = [];
  const calls: unknown[] = [];
  const result = await translate.methods.translate!.execute({ text: " Hello ", target: "English", modelId: "chosen" }, {
    pluginId: "translate", kv: { get: () => null, set: async (...args) => { writes.push(args); }, delete: async () => {} },
    models: { list: () => [], start: async input => { calls.push(input); return { id: "run" } as never; } },
  });
  expect(result).toEqual({ id: "run" });
  expect(writes).toEqual([["preferences", { target: "English", modelId: "chosen" }]]);
  expect(calls[0]).toMatchObject({ modelId: "chosen", prompt: "Hello" });
  expect(() => translate.methods.translate!.execute({ text: " ", target: "English", modelId: "chosen" }, {} as never)).toThrow();
});

test("official index has no unpublished archive entries", async () => {
  const index = indexSchema.parse(await Bun.file("marketplace.json").json());
  expect(index.schemaVersion).toBe(1);
  for (const entry of index.plugins) expect(entry.url).toBe(`https://github.com/semicoder-dev/fn-plugins/releases/download/${entry.id}-v${entry.version}/${entry.id}-${entry.version}.tgz`);
});
