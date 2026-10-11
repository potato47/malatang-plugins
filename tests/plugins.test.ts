import { expect, test } from "bun:test";
import translate from "../plugins/translate/src/backend";
import { indexSchema } from "../scripts/catalog";

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
  for (const entry of index.plugins) expect(entry.url).toBe(`https://github.com/potato47/malatang-plugins/releases/download/${entry.id}-v${entry.version}/${entry.id}-${entry.version}.tgz`);
});
