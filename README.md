# Claude Code 学习与实践仓库

本项目是 [Claude Code](https://claude.ai/code) 的学习与实践仓库，旨在探索 Agentic AI 编码助手的潜力。项目中包含完整的环境配置、MCP 服务器设置、Prompt 技能库以及多个实战项目案例。

## 📂 项目架构

```text
Claude_Code/
├── .claude/             # Claude Code 全局配置
├── Agents/              # 自定义 Agent 角色配置
├── Extensions/          # Claude Code 扩展功能
├── MCP/                 # Model Context Protocol 配置
├── Memory/              # 长期记忆与知识库
├── Project/             # 实战项目代码
│   ├── MemorizeWords/   # 背单词工具 (命令行)
│   ├── SnakeGame/       # 贪吃蛇游戏 (Pygame)
│   ├── Skit Script/     # 小品剧本生成器
│   └── HotPump/         # 热泵系统计算工具
├── Prompt/              # Prompt 编写指南与模板
├── Skills/              # 扩展技能模块 (14+ 自定义技能)
└── 学习笔记/            # 个人学习记录文档
```

## 🧩 MCP 服务器 (Model Context Protocol)

本项目集成了以下核心 MCP 服务器，极大地扩展了 Claude 的能力边界：

- **Context7**: 获取任意库的最新文档和代码示例
- **GitHub**: 直接操作仓库、Issue、PR 和代码搜索
- **Playwright**: 浏览器自动化测试与网页交互
- **Chrome DevTools**: 浏览器调试与深度分析

*详细配置请参考 [`MCP/mcp_list.md`](./MCP/mcp_list.md)*

## 🛠️ Skills 技能库

本项目加载了丰富的自定义技能，涵盖五大领域：

### 🎨 提示词与创意
> `prompt-master`, `intelligent-prompt-generator`, `art-master`, `design-master`, `video-master` 等
用于生成高质量的 AI 绘画、视频及设计提示词。

### 📄 文档与办公
> `docx`, `xlsx`, `pptx`, `pdf`, `doc-coauthoring` 等
全能的 Office 文档处理能力，支持创建、编辑与分析。

### 🖌️ 设计与前端
> `web-artifacts-builder`, `frontend-design`, `ui-ux-pro-max`, `canvas-design`
生成生产级前端代码、UI/UX 设计方案及视觉素材。

### 💻 开发与工程
> `feature-dev`, `code-review`, `webapp-testing`, `vercel-react-best-practices`
辅助架构设计、代码审查、自动化测试及最佳实践落地。

### ⚙️ 管理与工具
> `planning-with-files` (Manus 风格规划), `skill-manager`, `github-to-skills`
任务规划、技能生命周期管理及 GitHub 仓库转技能工具。

*完整技能列表请参考 [`Skills/Skills_list.md`](./Skills/Skills_list.md)*

## 🚀 实战项目介绍

1. **MemorizeWords**
   - 一个基于命令行的背单词练习工具，帮助用户高效记忆词汇。

2. **SnakeGame**
   - 经典的贪吃蛇游戏实现，展示了基本的图形界面交互开发。

3. **Skit Script**
   - 自动生成小品剧本的创意工具，利用 LLM 的创作能力。

4. **HotPump**
   - 热泵系统相关的计算或模拟工具。

## 📖 快速开始

### 常用配置命令

```powershell
# 安装新的 MCP 服务器
claude mcp add <server_name> -s user -- <command>

# 从 GitHub 安装技能
/plugin marketplace add <repo_url>
```

### Git 工作流

```powershell
git add .
git commit -m "feat: 更新功能说明"
git push
```

## 📝 更新日志

### v1.2.0 (2026-02)
- **文档重构**: 全面更新 `README.md`，优化项目结构展示
- **技能整合**: 整理并分类 14+ 个自定义 Skills，涵盖设计、办公、开发等领域
- **项目收录**: 新增 `Skit Script` 和 `HotPump` 项目说明
- **配置优化**: 更新 MCP 服务器列表与安装指南

### v1.1.0 (2026-01)
- 集成 GitHub Trending Reporter
- 优化 MCP 配置流程与文档
- 迁移背单词项目至 Project 目录

### v1.0.0 (2026-01)
- 项目初始化
- 建立基本目录结构与配置规范

---
## 参考资源

- [Claude Code 官方文档](https://docs.claude.com/)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)

## 许可证
MIT License
