# fn 官方插件与市场

本仓库独立维护译文（translate）与随手记（quick-notes），宿主不携带插件，也不依赖本仓库构建。当前发行候选为 0.1.2，包名为 `@semicoder/fn-plugin-translate` 和 `@semicoder/fn-example-quick-notes`；清单字段为 `fn`，sdkVersion 保持 0.3。

## 独立开发

使用 Bun 1.4.3，根包与两个插件均固定消费公开 `@semicoder/fn-sdk@0.3.4`，不依赖相邻宿主源码。[vendor 快照](vendor/README.md)仅保留更名阶段历史，不参与当前安装。

```sh
bun install --frozen-lockfile --ignore-scripts
bun run check
bun run test
bun run pack
bun run index:check
```

`artifacts/translate-0.1.2.tgz`、`artifacts/quick-notes-0.1.2.tgz` 为本地候选归档，包含清单与完整 dist。通过 fn 应用中心从地址安装；翻译调用宿主模型，随手记使用宿主 KV。

## 市场与发布

官方索引为 `https://raw.githubusercontent.com/semicoder-dev/fn-plugins/main/marketplace.json`。`pack` 只生成候选条目与 SHA-256，不自动上架。新版本必须通过 `<plugin-id>-v<version>` 发布，公开归档验收后运行 `catalog.ts promote` 并通过 PR 更新索引；不得登记未公开文件或覆盖历史归档。

GitHub 仓库已更名为 `semicoder-dev/fn-plugins`，remote 与 About 已同步。SDK 公开归档、实际 OIDC 与独立消费须先验收，再发行两个插件。Actions 无法创建 PR 时，维护者从生成的 catalog 分支补建，CI 通过后合并；不放宽仓库保护。

## 历史发行证据（原包名与地址）

以下历史标签与归档保持不变，不代表 fn 已发布。

## 组织首次发行（2026-10-11）

源码 `a6a949134703b6c88d43641261888bd75a1a5d97`。翻译 [工作流 38117624321](https://github.com/semicoder-dev/malatang-plugins/actions/runs/38117624321)、随手记 [工作流 38117627294](https://github.com/semicoder-dev/malatang-plugins/actions/runs/38117627294) 成功；公开归档的 SHA-256、包身份、版本和预构建文件经独立下载验收。固定 SDK 0.3.2 已先完成 npm OIDC 与公开归档验收。

- [翻译 0.1.1](https://github.com/semicoder-dev/malatang-plugins/releases/tag/translate-v0.1.1)：SHA-256 `d42181bd290f938170dd7209dd6358f731017c6ac5e05cafaa4262e706a45077`。
- [随手记 0.1.1](https://github.com/semicoder-dev/malatang-plugins/releases/tag/quick-notes-v0.1.1)：SHA-256 `fcfd8422211093d17fa9cdcc7ced2a06785cc93bcea28337ee9c877b41916da6`。
- 索引 PR [#5](https://github.com/semicoder-dev/malatang-plugins/pull/5) / [#6](https://github.com/semicoder-dev/malatang-plugins/pull/6) 经 CI 后合并，固定索引提交 `050e08736bed8462b6c4881bde63d4625ceb640d`；公开 Raw 返回两个 0.1.1 条目。旧标签与归档保持不变。

## 首次上线证据（2026-10-11，历史）

- 翻译 [translate-v0.1.0](https://github.com/semicoder-dev/malatang-plugins/releases/tag/translate-v0.1.0)，源码 `1d65444`，SHA-256 `47f1ca96ba81a367944c4f01823e25dd960f3465d18f056e6573def05ac8d833`。
- 随手记 [quick-notes-v0.1.0](https://github.com/semicoder-dev/malatang-plugins/releases/tag/quick-notes-v0.1.0)，源码 `a377f30`，SHA-256 `14b55f3722be87a3674cb7bdf0c41408cd8fbe1808de57cdf8dfc6d329cb56e0`。
- 两个归档经匿名下载、包身份和哈希验收；索引 PR [#1](https://github.com/semicoder-dev/malatang-plugins/pull/1)、[#2](https://github.com/semicoder-dev/malatang-plugins/pull/2) 经 CI 后合并，公开 Raw 索引已返回两条记录。
- 首次翻译流程在归档发布后因 Actions 无 PR 创建权限而报错；维护者补建 PR，标签与归档未移动。工作流此后保留候选分支并明确提示手工补建 PR，仓库保护未放宽。
