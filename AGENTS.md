# 官方插件仓库

此仓库独立维护官方市场索引与插件，不属于宿主 workspace。使用固定的公开 SDK 0.3.2，不引用相邻源码。交流和文档默认中文。

- `plugins/translate`、`plugins/quick-notes` 分别管理版本；ID 是业务数据命名空间，不随意改名。
- 修改后运行 `bun run check`、`bun run test`、`bun run pack` 和 `bun run index:check`；插件必须含预构建 dist。
- 未公开的归档不得写入正式 `marketplace.json`。发布脚本生成候选条目，验收公开归档后通过 PR 更新索引。
- 普通开发不自动推送、打标签、发布或部署；正式标签格式为 `<plugin-id>-v<version>`。
- 发布需同步 Semicoder 插件指南和 workspace 项目笔记，记录源码、归档哈希及线上验证结果。
