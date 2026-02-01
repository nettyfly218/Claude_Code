# oh-my-opencode 使用说明

## 简介
**oh-my-opencode** 是一个为 OpenCode (Claude Code) 设计的高级 Agent 增强工具包。它引入了名为 "Sisyphus" 的全能 Agent，旨在提供像人类开发者一样自然、强大的编码体验。

## 核心功能

- **Sisyphus (西西弗斯)**: 具备"像你一样编码"能力的 batteries-included 主控 Agent。
- **多 Agent 协作**:
  - **Oracle**: 专门负责调试。
  - **Librarian**: 负责文档搜索和查询。
  - **Explore**: 负责代码库导航。
- **LSP/AST 工具**: 提供完整的语言服务器协议支持和代码重构能力。
- **内置 MCP 集成**:
  - **Websearch (Exa)**: 强大的网络搜索。
  - **Context7**: 专用的文档查询工具。
  - **grep_app**: GitHub 代码搜索。
- **生产力工具**: 包含 Todo 强制执行、评论检查、Ralph Loop (反馈循环) 等。

## 安装方法

### 推荐安装 (通过 Claude Code)
在 Claude Code 中直接发送以下提示词，让 Agent 自动完成安装和配置：

`text
Install and configure oh-my-opencode by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/refs/heads/master/docs/guide/installation.md
`

## 使用指南

### 魔法关键词 (Magic Keyword)
这是使用 oh-my-opencode 最简单也最强大的方式。只需在你的 Prompt 中包含以下关键词之一，即可自动激活所有增强功能：

- **`ultrawork`**
- **`ulw`**

**示例**:
> "ulw, 分析当前项目的架构并重构 user 模块。"

当检测到该关键词时，Sisyphus Agent 将接管任务，利用其强大的工具链进行深度处理。

## 参考资源
- **GitHub 仓库**: [code-yeongyu/oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode)
