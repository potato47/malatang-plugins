# 麻辣烫官方插件与市场

[独立官方仓库](https://github.com/semicoder-dev/malatang-plugins)，宿主不携带此处任何插件。翻译和随手记 0.1.0 已发布归档并上架，市场适用于麻辣烫 0.4.2。

- `plugins/translate`：译文，使用宿主模型翻译。
- `plugins/quick-notes`：随手记，使用宿主 KV 存储。
- `marketplace.json`：仅列已发布并验收的插件。默认索引为 https://raw.githubusercontent.com/semicoder-dev/malatang-plugins/main/marketplace.json 。
- `scripts/tasks.ts`：通过固定的公开 SDK 0.3.2 检查、构建和打包，产生归档、SHA-256 与候选条目。
- `tests/translate-models.html`：迁入的离线浏览器回归；通过 `bun scripts/browser-fixture.ts` 生成 `artifacts/browser/index.html`，直接用浏览器打开（无需额外服务），覆盖模型选择、空模型与账号断开；不发送真实模型请求。

## 开发

使用 Bun 1.4.3。仓库独立安装公开依赖，不需要相邻麻辣烫源码。

```sh
bun install --frozen-lockfile --ignore-scripts
bun run check
bun run test
bun run pack
bun run index:check
```

可使用 `bun run pack translate` 或 `bun run pack quick-notes` 单独打包。候选产物在 `artifacts/`，通过宿主“从地址安装”选择 `.tgz` 验收。插件是可信本地代码。

## 发布与上架

以下动作需要当次发布授权；已公开标签和归档不可覆盖。

1. 确认需要发布的插件版本、源码与验收；每个插件独立版本，不随宿主升版。标签为 `translate-v<version>` 或 `quick-notes-v<version>`。
2. 配置真实公开仓库和 Actions 权限；标签触发 `release.yml`，固定 Bun 和 SDK，检查、测试、重新打包后发布不可变 Release 归档及候选 JSON。已公开版本不覆盖。
3. 工作流从公开 URL 下载归档验证 SHA-256，再在当前 main 上运行 `bun scripts/catalog.ts promote artifacts/<id>.json`，创建索引 PR。PR 合并前检查已有较新版本，处理并发变更后重新验收，禁止回退或同版本替换。
4. 合并索引 PR 后官方 Raw 地址可发现版本；再从干净宿主实际浏览、安装和更新，并记录公开产物哈希、工作流、索引提交及官网同步。

工作流默认令牌创建的 PR 不保证自动触发其他工作流，合并前需要手动运行 CI；仓库若禁止 Actions 创建 PR，可在本地按相同步骤创建。发布失败不可改用覆盖已公开标签，已发布但未上架的归档可手动恢复索引步骤。

市场 v1 契约：顶层 `schemaVersion:1/name/plugins`；每项 `id/packageName/name/description/icon/color/version/sdkVersion/url/sha256`。版本为稳定 `x.y.z`，每个 ID 仅一个版本；URL 为 HTTPS 预构建归档，SHA-256 为实际归档的 64 位小写十六进制。包名、ID、版本和 SDK 必须与归档一致，后端入口不作为浏览器资源公开。

## 首次上线证据（2026-10-11）

- 翻译 [translate-v0.1.0](https://github.com/semicoder-dev/malatang-plugins/releases/tag/translate-v0.1.0)，源码 `1d65444`，SHA-256 `47f1ca96ba81a367944c4f01823e25dd960f3465d18f056e6573def05ac8d833`。
- 随手记 [quick-notes-v0.1.0](https://github.com/semicoder-dev/malatang-plugins/releases/tag/quick-notes-v0.1.0)，源码 `a377f30`，SHA-256 `14b55f3722be87a3674cb7bdf0c41408cd8fbe1808de57cdf8dfc6d329cb56e0`。
- 两个归档经匿名下载、包身份和哈希验收；索引 PR [#1](https://github.com/semicoder-dev/malatang-plugins/pull/1)、[#2](https://github.com/semicoder-dev/malatang-plugins/pull/2) 经 CI 后合并，公开 Raw 索引已返回两条记录。
- 首次翻译流程在归档发布后因 Actions 无 PR 创建权限而报错；维护者补建 PR，标签与归档未移动。工作流此后保留候选分支并明确提示手工补建 PR，仓库保护未放宽。
