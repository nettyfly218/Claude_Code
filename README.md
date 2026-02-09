# Claude Code 学习与实践仓库

本项目是 [Claude Code](https://claude.ai/code) 的学习与实践仓库，旨在探索 Agentic AI 编码助手的潜力。项目中包含完整的环境配置、MCP 服务器设置、Prompt 技能库以及多个实战项目案例。

## 📂 项目架构

```text
Claude_Code/
├── .claude/             # Claude Code 全局配置
├── Agents/              # 自定义 Agent 角色配置
├── Extensions/          # Claude Code 扩展配置与推荐
├── MCP/                 # Model Context Protocol 服务器配置
├── Project/             # 实战项目代码
│   ├── MemorizeWords/   # 背单词工具 (Web 应用，530 单词，3 游戏)
│   ├── SnakeGame/       # 贪吃蛇游戏 (霓虹复古街机风格)
│   ├── Skit Script/     # 小品剧本生成器
│   ├── fuxa-hmi-demo/   # FUXA HMI/SCADA 演示项目
│   ├── HotPump.pen      # 热泵系统设计 (Pencil 文件)
│   └── HotPump.png      # 热泵系统预览图
├── Prompt/              # Prompt 编写指南与模板
├── Skills/              # 扩展技能模块 (15+ 本地技能)
├── CLAUDE.md            # 项目指南文档
└── 学习笔记/            # 个人学习记录文档 (12 篇)
```

## 🧩 MCP 服务器 (Model Context Protocol)

本项目集成了以下核心 MCP 服务器，极大地扩展了 Claude 的能力边界：

| 服务器 | 功能 | 安装命令 |
|--------|------|----------|
| **Context7** | 获取任意库的最新文档和代码示例 | `npx @upstash/context7-mcp` |
| **GitHub** | 直接操作仓库、Issue、PR 和代码搜索 | HTTP 方式连接 |
| **Playwright** | 浏览器自动化测试与网页交互 | `npx @playwright/mcp@latest` |
| **Chrome DevTools** | 浏览器调试与深度分析 | `npx chrome-devtools-mcp@latest` |

*详细配置请参考 [`MCP/mcp_list.md`](./MCP/mcp_list.md)*

## 🛠️ Skills 技能库

本项目加载了丰富的自定义技能，涵盖 **6 大领域，共 51 个技能**：

### 🎨 提示词与创意
> `prompt-master`, `intelligent-prompt-generator`, `art-master`, `design-master`, `video-master`, `product-master` 等
用于生成高质量的 AI 绘画、视频及设计提示词。

### 🧠 深度思考与交互
> `ai-debater`, `dissenter`, `project-premortem`, `dual-explanation`, `expert-lens` 等
增强逻辑分析、辩论与多视角思考能力。

### 📄 文档与办公
> `docx`, `xlsx`, `pptx`, `pdf`, `doc-coauthoring`, `internal-comms` 等
全能的 Office 文档处理能力，支持创建、编辑与分析。

### 🖌️ 设计与前端
> `web-artifacts-builder`, `frontend-design`, `ui-ux-pro-max`, `canvas-design` 等
生成生产级前端代码、UI/UX 设计方案及视觉素材。

### 💻 开发与工程
> `feature-dev`, `code-review`, `webapp-testing`, `vercel-react-best-practices` 等
辅助架构设计、代码审查、自动化测试及最佳实践落地。

### ⚙️ 管理与工具
> `planning-with-files`, `skill-manager`, `github-to-skills`, `find-skills` 等
任务规划、技能生命周期管理及 GitHub 仓库转技能工具。

*完整技能列表请参考 [`Skills/Skills_list.md`](./Skills/Skills_list.md)*

## 🚀 实战项目介绍

### 1. MemorizeWords - 快乐学单词
一个专为小学 1-2 年级学生设计的英语单词学习 Web 应用，采用纯前端技术实现。

**核心特性**：
- ✅ **530 个常用单词** - 覆盖 18 个分类
- ✅ **三个互动游戏** - 选择题、配对、拼写
- ✅ **智能复习系统** - 基于遗忘曲线的科学复习算法
- ✅ **成就系统** - 8 个成就徽章，激励学习
- ✅ **完全本地化** - 无需后端服务器，数据保存在浏览器

**技术栈**：原生 JavaScript (ES6+)、CSS3 (Flexbox + Grid)、localStorage、Web Speech API

*📁 项目路径：[`Project/MemorizeWords/`](./Project/MemorizeWords/)*

### 2. SnakeGame - 霓虹贪吃蛇
使用原生 HTML5 Canvas 和 JavaScript 构建的经典贪吃蛇游戏，采用 **Neon Retro Arcade** 风格。

**核心特性**：
- ✅ **霓虹复古风格** - 品红、青色、黄色大胆碰撞
- ✅ **CRT 扫描线效果** - 模拟 80 年代老式显示器质感
- ✅ **动态 3D 背景网格** - 透视动画网格营造空间感
- ✅ **可调节速度** - Turbo 到 Slow 四档
- ✅ **粒子爆炸特效** - 吃到食物时绽放粒子

**技术栈**：HTML5 Canvas、原生 JavaScript、CSS3 动画

*📁 项目路径：[`Project/SnakeGame/`](./Project/SnakeGame/)*

### 3. Skit Script - 小品剧本生成器
利用 LLM 的创作能力自动生成小品剧本的创意工具。

**示例剧本**：
- 📄 《AI练习生剧本》
- 📄 《疯狂 AI 事业部》

*📁 项目路径：[`Project/Skit Script/`](./Project/Skit%20Script/)*

### 4. fuxa-hmi-demo - FUXA HMI 演示项目
一个完整的 FUXA HMI/SCADA 项目示例，展示如何使用 Claude Code 快速开发智能工厂生产线监控系统。

**核心特性**：
- ✅ **温度监控** - 3 个传感器实时监控，彩色仪表盘，趋势图
- ✅ **电机控制** - 2 个电机状态监控，启动/停止按钮
- ✅ **安全系统** - 紧急停止按钮，安全门状态监控
- ✅ **报警系统** - 温度超限、电机故障、安全事件报警
- ✅ **自动化脚本** - 温度报警处理，生产数量计数

**技术栈**：FUXA v1.2.0、MQTT/Modbus/OPC UA、JavaScript 脚本

*📁 项目路径：[`Project/fuxa-hmi-demo/`](./Project/fuxa-hmi-demo/)*

## 🔌 VS Code 扩展推荐

本项目推荐使用以下 **26 个 VS Code 扩展**，覆盖 AI 辅助、Web 开发、Python、远程开发等场景：

| 分类 | 扩展 |
|------|------|
| **🤖 AI 与智能辅助** | Claude Code、Gemini CLI、Roo Cline、Pencil |
| **🌐 Web 开发** | Auto Close Tag、Auto Rename Tag、Prettier、REST Client、Live Server、Vite |
| **🐍 Python 开发** | Python、Pylance、Black Formatter |
| **💻 系统/远程/容器** | Remote SSH、WSL、Docker、Dev Containers、PowerShell |
| **📝 文档与工具** | Markdown All in One、Markdown PDF、PDF、YAML、Terminal Paste Image |
| **🌍 语言包** | 简体中文语言包 |

*完整列表请参考 [`Extensions/Extensions_list.md`](./Extensions/Extensions_list.md)*

## 📚 学习资源

### 📝 学习笔记 (12 篇)

| 文档 | 描述 |
|------|------|
| **ClaudeCode-使用指南** | Claude Code 完整使用指南 |
| **everything-claude-code-使用说明** | Everything Claude Code 技能说明 |
| **HMI_Development_Solution_NodeRED_FUXA_ClaudeCode** | HMI 开发方案 (Node-RED + FUXA + Claude Code) |
| **Python后端与前端开发环境配置指南** | Python 开发环境配置 |
| **OpenCode-使用入门指南** | OpenCode 使用入门 |
| **claude-code-config-使用说明** | Claude Code 配置说明 |
| **planning-with-files-使用说明** | 任务规划技能使用 |
| **Khazix-Skills-使用说明** | Khazix Skills 使用 |
| **oh-my-opencode-使用说明** | Oh My OpenCode 使用 |
| **vercel-labs-skills-使用说明** | Vercel Labs Skills 使用 |
| **vercel-labs-agent-skills-使用说明** | Vercel Labs Agent Skills 使用 |
| **【年度总结】2025年AI发展总结与AI学习重点技能** | 2025 AI 发展总结 |

*📁 路径：[`学习笔记/`](./学习笔记/)*

### 📖 项目指南

- **[`CLAUDE.md`](./CLAUDE.md)** - 项目概述、架构与开发规范

## 🚀 快速开始

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

### v1.3.0 (2026-02)
- **项目扩展**: 新增 `fuxa-hmi-demo` HMI/SCADA 演示项目
- **技能整合**: 整理并分类 51 个 Skills（6 大领域）
- **学习资源**: 新增 12 篇学习笔记文档
- **扩展推荐**: 添加 26 个 VS Code 扩展推荐
- **文档重构**: 全面更新 README.md，优化项目结构展示

### v1.2.0 (2026-02)
- **文档重构**: 全面更新 README.md，优化项目结构展示
- **技能整合**: 整理并分类 14+ 个自定义 Skills
- **项目收录**: 新增 Skit Script 和 HotPump 项目说明
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
- [FUXA 官方文档](https://github.com/frangoteam/FUXA/wiki)

## 许可证
MIT License
