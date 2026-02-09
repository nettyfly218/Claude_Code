# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

本项目是 Claude Code 的学习与实践仓库，包含配置、MCP 服务器设置、Prompt 技能库以及多个实战子项目。

## 架构与目录结构

```
Claude_Code/
├── .claude/             # Claude Code 全局配置（settings.local.json、hookify 配置等）
├── Agents/              # 自定义 Agent 配置（6 个常用 Agent）
├── Extensions/          # VS Code 扩展推荐列表（26 个）
├── MCP/                 # MCP 服务器配置与安装命令
├── Project/             # 实战项目代码
│   ├── MemorizeWords/   # 背单词 Web 应用（纯前端，530 单词，3 游戏）
│   ├── SnakeGame/       # 贪吃蛇游戏（霓虹复古街机风格）
│   ├── Skit Script/     # 小品剧本生成器（Markdown 文档）
│   ├── fuxa-hmi-demo/   # FUXA HMI/SCADA 演示项目
│   └── HotPump.pen      # 热泵系统设计（Pencil 文件）
├── Prompt/              # Prompt 编写指南与模板
├── Skills/              # 本地技能模块（15+ 个自定义 Skills）
├── CLAUDE.md            # 本项目指南文档
└── 学习笔记/            # 学习记录文档（12 篇）
```

## 常用命令

### 环境管理
- **终端**: PowerShell
- **Python 依赖**（针对 github-trending-reporter）:
  ```powershell
  pip install requests beautifulsoup4 jinja2
  ```

### Claude Code 配置命令
```powershell
# 安装 MCP 服务器
claude mcp add <server_name> -s user -- <command>

# 示例：安装 Context7
claude mcp add context7 -s user -- npx @upstash/context7-mcp

# 从 GitHub 安装技能
/plugin marketplace add <repo_url>
```

### Git 操作
```powershell
git add .
git commit -m "feat: 具体的提交信息"
git push
```

## MCP 服务器

项目已配置 4 个核心 MCP 服务器：

| 服务器 | 功能 | 安装命令 |
|--------|------|----------|
| Context7 | 获取库的最新文档 | `npx @upstash/context7-mcp` |
| GitHub | 操作仓库、Issue、PR | HTTP 方式连接 |
| Playwright | 浏览器自动化 | `npx @playwright/mcp@latest` |
| Chrome DevTools | 浏览器调试 | `npx chrome-devtools-mcp@latest` |

详细配置：`MCP/mcp_list.md`

## Skills 技能库

项目包含 **15+ 个本地自定义技能**，分为以下类别：

### 深度思考与交互
- `ai-debater` - 辩论专家
- `dissenter` - 反对者（魔鬼代言人）
- `project-premortem` - 失败预演
- `dual-explanation` - 双层解释
- `expert-lens` - 专家视角

### 提示词与创意
- `reverse-prompt-generator` - 提示词逆向工程

### 管理与工具
- `skill-manager` - 技能生命周期管理
- `skill-evolution-manager` - 技能进化与迭代
- `github-to-skills` - GitHub 仓库转技能
- `hot-topic-tracker` - 新媒体热点追踪
- `github-trending-reporter` - GitHub 热榜日报

### 实用工具
- `pake` - 网页打包成桌面应用
- `lossless-cut` - 视频无损剪辑
- `yt-dlp` - 音视频下载
- `convertx` - 格式转换

完整技能列表：`Skills/Skills_list.md`

## 子项目架构说明

### MemorizeWords（背单词应用）

**技术栈**：纯原生 JavaScript (ES6+)、CSS3、localStorage、Web Speech API

**关键架构**：
- **代码加载顺序**：constants.js → helpers.js → data层 → services层 → models层 → components → pages → games → app.js
- **全局单例模式**：`app`、`userProgress`、`audioService`、`reviewScheduler`、游戏实例
- **页面路由**：字符串路由，通过 `App.navigateTo()` 切换
- **智能复习系统**：遗忘曲线算法（1,3,7,15,30天间隔）

**运行方式**：
```powershell
# 直接打开 index.html（推荐）
# 或使用本地服务器
python -m http.server 8000
```

详细文档：`Project/MemorizeWords/CLAUDE.md`

### SnakeGame（贪吃蛇游戏）

**技术栈**：HTML5 Canvas、原生 JavaScript、CSS3 动画

**核心特性**：霓虹复古风格、CRT 扫描线效果、3D 背景网格、粒子爆炸

**运行方式**：直接在浏览器打开 `index.html`

### fuxa-hmi-demo（HMI 演示项目）

**技术栈**：FUXA v1.2.0、MQTT/Modbus/OPC UA、JavaScript

**核心功能**：温度监控、电机控制、安全系统、报警系统、自动化脚本

**运行方式**：
```bash
# Docker 方式
docker run -d --name fuxa -p 1881:1881 frangoteam/fuxa:latest
```

### Skit Script（小品剧本生成器）

**内容**：《AI练习生剧本》、《疯狂 AI 事业部》等生成示例

**格式**：Markdown 文档

## 代码规范与风格

- **语言**：所有回复、解释和文档优先使用**中文**
- **路径格式**：使用正斜杠 `/` 或反斜杠 `\`，尽量避免路径中包含中文或空格
- **注释**：代码必须包含中文注释，解释"为什么这么做"而非仅描述"做了什么"
- **代码块**：提供完整、可运行的代码示例
