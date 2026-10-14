# fn 官方插件与市场

**本地开发、尚未发布。** 本仓库独立维护译文（translate）与随手记（quick-notes），宿主不携带插件，也不依赖本仓库构建。包名为 `@semicoder/fn-plugin-translate` 和 `@semicoder/fn-example-quick-notes`；版本保持 0.1.1，清单字段为 `fn`，sdkVersion 保持 0.3。

## 独立开发

使用 Bun 1.4.3。本仓库携带经过校验的固定 SDK 归档 `vendor/fn-sdk.tgz`，来源和哈希见[快照说明](vendor/README.md)。新 `@semicoder/fn-sdk` 尚未发布 npm，安装不需要相邻源码。

```sh
bun install --frozen-lockfile --ignore-scripts
bun run check
bun run test
bun run pack
bun run index:check
```

`artifacts/translate-0.1.1.tgz`、`artifacts/quick-notes-0.1.1.tgz` 为本地候选归档，包含清单与完整 dist。通过 fn 应用中心从地址安装；翻译调用宿主模型，随手记使用宿主 KV。

## 市场与后续发布

`marketplace.json` 暂为空，不登记未发布归档。`pack` 生成候选条目与 SHA-256，不自动上架。目标地址为 `https://raw.githubusercontent.com/semicoder-dev/fn-plugins/main/marketplace.json`，新仓库名称和地址尚未落地；当前 Git remote 保持真实旧地址。

后续获得发布授权后：完成 GitHub 更名和新 SDK 公开验收，将依赖切回固定 npm 版本；分别准备两个插件的新版本，不复用历史标签或覆盖旧归档；通过 `<plugin-id>-v<version>` 发布，独立验收公开归档后运行 `catalog.ts promote` 并通过 PR 更新索引。宿主、SDK、插件、官网分别验收，公开前同步文档。

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
