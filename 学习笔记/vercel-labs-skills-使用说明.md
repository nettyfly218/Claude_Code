# vercel-labs/skills 项目解读与使用说明

## 项目简介

**vercel-labs/skills** 是一个开源的 CLI 工具，旨在统一管理不同 AI 编程助手（AI Agents）的"技能"（Skills）。它允许用户从 GitHub、GitLab 或本地路径轻松安装、更新和移除可重用的指令集，从而扩展 AI 助手的编码能力。

该工具的核心理念是**"编写一次，随处运行"**。它遵循 Agent Skills 规范，确保技能可以在支持该标准的 40 多个 AI 编程助手之间通用。

## 核心功能

1.  **多代理支持 (Multi-Agent Support)**：兼容 Claude Code, OpenCode, Codex, Cursor, Windsurf, GitHub Copilot 等 40 多种主流 AI 编码助手。
2.  **灵活安装 (Flexible Installation)**：
    *   支持从远程仓库（GitHub/GitLab）或本地路径安装。
    *   支持项目级（Project-level）和全局级（Global）安装。
    *   支持软链接（Symlink，推荐用于开发）或复制模式。
3.  **标准化格式**：基于 Markdown 文件和 YAML Frontmatter 定义技能，易于编写和阅读。

## 快速开始

无需繁琐的安装过程，直接使用 `npx` 即可运行：

```powershell
npx skills <command> [options]
```

## 常用命令详解

### 1. 安装技能 (Add)

从远程仓库或本地路径添加技能。

```powershell
# 安装整个仓库的技能
npx skills add vercel-labs/agent-skills

# 安装指定仓库中的特定技能，并指定目标代理
npx skills add owner/repo --agent claude-code --skill frontend-design

# 全局安装（适用于所有项目）
npx skills add vercel-labs/agent-skills --global
```

### 2. 查看已安装技能 (List)

列出当前配置下可用的所有技能。

```powershell
npx skills list -g
npx skills check -g
```

### 3. 查找技能 (Find)

交互式搜索并发现可用的技能。

```powershell
npx skills find
```

### 4. 更新技能 (Update)

将已安装的技能更新到最新版本。

```powershell
npx skills update -g
```

### 5. 移除技能 (Remove)

卸载不再需要的技能。

```powershell
npx skills remove <skill-name>
```

### 6. 创建新技能 (Init)

初始化一个新的技能模板，帮助你快速开始编写自定义技能。

```powershell
npx skills init
```

## 技能文件格式

一个标准的技能文件是一个 Markdown 文件（通常命名为 `SKILL.md`），头部包含 YAML 格式的元数据（Frontmatter）：

```markdown
---
name: my-skill-name        # 必填：技能名称
description: description   # 必填：技能描述
metadata:
  internal: false          # 选填：是否为内部/隐藏技能
---

# 技能具体指令内容
在这里编写提示词、指令或上下文信息...
```

## 总结

`vercel-labs/skills` 解决了 AI 提示词（Prompt）工程中的碎片化问题。通过这个工具，开发者可以像管理代码依赖（npm packages）一样管理 AI 的技能库，极大地提升了跨工具、跨团队的协作效率。

---
*生成日期: 2026-02-02*
