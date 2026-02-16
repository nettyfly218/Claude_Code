# Claude Code 学习与实践仓库

本项目是 [Claude Code](https://claude.ai/code) 的学习与实践仓库，包含完整的环境配置、MCP 服务器、技能库以及多个实战项目案例。

## 项目目录结构

```
Claude_Code/
├── .claude/             # Claude Code 全局配置
├── Agents/              # 自定义 Agent 配置 (15个)
├── Extensions/          # VS Code 扩展推荐 (29个)
├── MCP/                 # MCP 服务器配置 (10个)
├── Project/             # 实战项目代码
├── Prompt/              # Prompt 编写指南与模板
├── Skills/              # 技能模块 (63个，7大类)
├── CLAUDE.md            # 项目指南文档
└── 学习笔记/            # 学习记录文档
```

## 核心能力

### MCP 服务器 (10个)

| 服务器 | 功能 | 安装命令 |
|--------|------|----------|
| **MiniMax** | Web 搜索与图像理解 | 内置 |
| **context7** | 获取库的最新文档 | `npx @upstash/context7-mcp` |
| **github** | 操作仓库、Issue、PR | `npx @modelcontextprotocol/server-github` |
| **playwright** | 浏览器自动化 | `npx @playwright/mcp@latest` |
| **chrome-devtools** | 浏览器调试 | `npx chrome-devtools-mcp@latest` |
| **memory** | 知识图谱记忆 | `npx @modelcontextprotocol/server-memory` |
| **fetch** | HTTP 请求 | `uvx mcp-server-fetch` |
| **sqlite** | SQLite 数据库 | `uvx mcp-server-sqlite` |
| **grep-app** | GitHub 代码搜索 | `npx grep-mcp` |
| **pencil** | UI 设计工具 | VS Code 扩展 |

> 详细配置：[`MCP/mcp_list.md`](./MCP/mcp_list.md)

### Skills 技能库 (63个)

| 分类 | 数量 | 说明 |
|------|------|------|
| 提示词与创意 | 13 | AI 绘画、视频、设计的提示词生成 |
| 深度思考与交互 | 6 | 辩论、专家视角、面试官等 |
| 文档与办公 | 7 | Word、Excel、PPT、PDF 处理 |
| 设计与前端 | 8 | React、Web UI、设计系统 |
| 开发与工程 | 8 | 代码审查、测试、MCP 开发 |
| 管理与工具 | 12 | 任务规划、技能管理、格式转换 |
| 插件开发 | 8 | Agent、Command、Hook 开发 |

> 完整列表：[`Skills/Skills_list.md`](./Skills/Skills_list.md)

### Agents 代理 (15个)

| 类型 | Agent | 功能 |
|------|-------|------|
| 核心 | Bash, Explore, Plan, codebase-search | 命令执行、代码探索、架构设计 |
| 质量 | code-simplifier, code-reviewer, security-reviewer | 代码简化、审查、安全分析 |
| 文档 | tech-docs-writer | 技术文档编写 |
| 媒体 | media-interpreter | 图片、PDF 媒体分析 |
| 插件 | plugin-dev, hookify | 插件与钩子开发 |

> 完整列表：[`Agents/Agents_list.md`](./Agents/Agents_list.md)

## 实战项目

### 1. MemorizeWords - 背单词应用

专为小学 1-2 年级学生设计的英语单词学习 Web 应用。

- **技术栈**: 原生 JavaScript (ES6+), CSS3, localStorage, Web Speech API
- **核心功能**: 530 单词、3 种游戏、智能复习系统、成就系统
- **路径**: [`Project/MemorizeWords/`](./Project/MemorizeWords/)

### 2. SnakeGame - 贪吃蛇游戏

霓虹复古风格的经典贪吃蛇游戏。

- **技术栈**: HTML5 Canvas, 原生 JavaScript, CSS3 动画
- **核心特性**: CRT 扫描线、3D 网格、粒子特效
- **路径**: [`Project/SnakeGame/`](./Project/SnakeGame/)

### 3. Skit Script - 小品剧本生成器

利用 LLM 创作能力自动生成小品剧本。

- **示例**: 《AI练习生剧本》、《疯狂 AI 事业部》
- **路径**: [`Project/Skit Script/`](./Project/Skit%20Script/)

### 4. fuxa-hmi-demo - HMI 演示

FUXA HMI/SCADA 完整示例，展示智能工厂监控系统开发。

- **技术栈**: FUXA v1.2.0, MQTT/Modbus/OPC UA
- **核心功能**: 温度监控、电机控制、报警系统、自动化脚本
- **路径**: [`Project/fuxa-hmi-demo/`](./Project/fuxa-hmi-demo/)

### 5. L06-2F-SCADA - 工业自动化方案

二层楼 SCADA 工业监控系统完整方案。

- **技术栈**: FUXA, Modbus, JavaScript
- **核心功能**: 4 区域监控、报警中心、趋势分析
- **路径**: [`Project/L06-2F-SCADA/`](./Project/L06-2F-SCADA/)

### 6. HotPump - 热泵系统设计

Pencil 绘制的热泵系统设计图。

- **路径**: [`Project/HotPump.pen`](./Project/HotPump.pen)

## VS Code 扩展推荐 (29个)

| 分类 | 扩展 |
|------|------|
| AI 辅助 | Claude Code, Gemini CLI, Roo Cline, Pencil |
| Web 开发 | Auto Close Tag, Prettier, REST Client, Live Server, Vite |
| Python | Python, Pylance, Black Formatter, Ruff |
| 代码质量 | ESLint |
| 远程开发 | Remote SSH, WSL, Docker, Dev Containers, PowerShell |
| 文档工具 | Markdown All in One, Markdown PDF, PDF Viewer, YAML |
| 语言包 | 简体中文 |

> 完整列表：[`Extensions/Extensions_list.md`](./Extensions/Extensions_list.md)

## 学习资源

### 学习笔记

| 文档 | 描述 |
|------|------|
| ClaudeCode-使用指南 | Claude Code 完整使用指南 |
| everything-claude-code-使用说明 | 技能说明 |
| HMI_Development_Solution | HMI 开发方案 |
| Python后端与前端开发环境配置指南 | 开发环境配置 |
| planning-with-files-使用说明 | 任务规划技能 |

> 更多：[`学习笔记/`](./学习笔记/)

### 项目指南

- **[`CLAUDE.md`](./CLAUDE.md)** - 项目概述与开发规范

## 快速开始

### 安装 MCP 服务器

```powershell
# 格式
claude mcp add <server_name> -s user -- <command>

# 示例：安装 Context7
claude mcp add context7 -s user -- npx @upstash/context7-mcp
```

### Git 工作流

```powershell
git add .
git commit -m "feat: 更新功能说明"
git push
```

## 更新日志

### v1.4.0 (2026-02)
- **工业方案**: 新增 L06-2F-SCADA 工业自动化监控系统
- **技能扩展**: 整合 63 个 Skills（7 大类）
- **MCP 升级**: 新增 MiniMax、memory、fetch 等 6 个服务器

### v1.3.0 (2026-02)
- 新增 fuxa-hmi-demo HMI/SCADA 演示项目
- 整理 51 个 Skills（6 大领域）
- 新增 12 篇学习笔记
- 添加 26 个 VS Code 扩展

### v1.2.0 (2026-02)
- 文档重构
- 新增 Skit Script 和 HotPump

### v1.1.0 (2026-01)
- 集成 GitHub Trending Reporter
- 优化 MCP 配置

### v1.0.0 (2026-01)
- 项目初始化

---

## 参考资源

- [Claude Code 官方文档](https://docs.claude.com/)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [FUXA 官方文档](https://github.com/frangoteam/FUXA/wiki)

## 许可证

MIT License
