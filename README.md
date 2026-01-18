# Claude Code 学习笔记

记录 Claude Code AI 助手的使用配置、学习笔记和最佳实践。

## 项目简介

本仓库用于记录 Claude Code 的配置方法、使用技巧以及开发实践，帮助更好地利用 AI 助手提升开发效率。

## 项目结构

```
Claude_Code/
├── .claude/          # Claude Code 配置目录
├── Agents/           # Agent 配置文件
├── MCP/              # MCP 服务器配置
├── Memory/           # 记忆数据库
├── Project/          # 项目实践代码
│   ├── MemorizeWords/  # 背单词练习项目
│   ├── SnakeGame/      # 贪吃蛇游戏
│   ├── temp_converter/ # 温度转换工具
│   └── SkitScript/     # 小品剧本 (待重命名)
├── Prompt/           # Prompt 技能文档
│   └── Prompt.md     # Prompt 编写指南
├── Skills/           # Claude Skills 技能模块
└── 学习笔记/          # 个人学习笔记
```

## 目录说明

| 目录 | 说明 |
|------|------|
| `.claude/` | Claude Code 全局配置 |
| `Agents/` | 自定义 Agent 配置 |
| `MCP/` | MCP 服务器配置文档 |
| `Memory/` | 记忆数据库存储 |
| `Project/` | 实践项目代码 |
| `Prompt/` | Prompt 编写技巧 |
| `Skills/` | Skills 技能模块 |
| `学习笔记/` | 个人学习记录 |

## MCP 服务器配置

### 安装命令

```powershell
# Chrome 开发者工具
claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest

# Playwright 浏览器自动化
claude mcp add playwright -s user -- npx @playwright/mcp@latest

# Context7 文档查询
claude mcp add context7 -s user -- npx @upstash/context7-mcp

# GitHub API
claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer $env:GITHUB_PAT" -s user
```

详细配置请参考 [MCP 配置指南](./MCP/mcp_list.md)。

## Skills 技能模块

### 安装命令

```powershell
/plugin marketplace add anthropics/skills
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add https://github.com/daymade/claude-code-skills
/plugin marketplace add https://github.com/davila7/claude-code-templates
```

### 常用技能

| 技能 | 功能 |
|------|------|
| `algorithmic-art` | 算法艺术创作 |
| `canvas-design` | 视觉设计 |
| `docx` | Word 文档处理 |
| `frontend-design` | 前端界面开发 |
| `pdf` | PDF 处理 |
| `pptx` | PPT 制作 |
| `xlsx` | Excel 处理 |
| `mcp-builder` | MCP 服务器开发 |
| `web-artifacts-builder` | 复杂 Web 组件 |
| `webapp-testing` | Web 应用测试 |

详细说明请参考 [Skills 列表](./Skills/skills_list.md)。

## 快速开始

### 克隆仓库

```bash
git clone https://github.com/nettyfly218/Claude_Code.git
cd Claude_Code
```

### 更新内容

```powershell
git add -A
git commit -m "描述更改"
git push
```

## 更新日志

### v1.1.0 (2026-01-12)

#### 新增
- 新增 Prompt.md 文档，包含 git 提交命令示例
- 新增背单词练习项目

#### 优化
- 重构项目结构，将背单词项目迁移到 Project 目录
- 优化 README 文档结构
- 精简文档结构，更新 MCP 和 Skills 配置指南
- 添加 GitHub MCP 上传项目操作说明

### v1.0.0 (2026-01-02)

- 初始化项目
- 添加 Claude Code 配置和基本文档
- 添加 MCP 和 Skills 配置说明
- 添加学习笔记目录

## 参考资源

- [Claude Code 官方文档](https://docs.claude.com/)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)

## 作者

- GitHub: [@nettyfly218](https://github.com/nettyfly218)

## 许可证

MIT License
