# Claude Code 使用入门

---
## 一、安装Claude code

## macOS/Linux
- 方式一：使用 Homebrew（推荐）
brew install --cask claude-code
- 方式二：使用安装脚本
curl -fsSL https://claude.ai/install.sh | bash

## Windows
- 方式一：npm安装（先安装 Node.js）
npm install -g @anthropic-ai/claude-code 
- 方式二：原生安装（推荐）
1. PowerShell（推荐）
irm https://claude.ai/install.ps1 | iex
2. CMD
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

## 验证
claude --version

## 启动
cd your-project-folder
claude

---
## 二、从 npm 安装迁移到原生安装（老用户）
1. 关闭所有 Claude Code 会话
2. 执行迁移命令：
claude install
3. 系统自动完成迁移，包括：
- 保留所有配置（API Key、环境变量等）
- 保留项目数据和插件
- 更新为原生安装版本

---
## 三、配置API

### 安装 claude-hud 状态栏插件
    /plugin marketplace add jarrodwatts/claude-hud
    /plugin install claude-hud
    /claude-hud:setup
    
### 下载安装 CC Switch 快捷切换 API
https://github.com/farion1231/cc-switch
    
### 下载安装 antigravity + Antigravity-Tools 进行反向代理
https://antigravity.google/download
https://github.com/lbjlaq/Antigravity-Manager

---
## 四、配置 Agents

  - Bash - 命令执行
  - Explore - 代码库探索
  - general-purpose - 通用任务
  - Plan - 软件架构设计
  - claude-code-guide - Claude Code 使用指南
  - statusline-setup - 状态栏配置
  
---

## 五、配置常用 MCP 服务器 (4个)

### chrome-devtools-mcp
  claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest

### playwright  
  claude mcp add playwright -s user -- npx @playwright/mcp@latest 

### context7  
  claude mcp add context7 -s user -- npx @upstash/context7-mcp 

### github
  claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer $env:GITHUB_PAT" -s user

---
## 六、配置常用 Skills （24个）

### 在 Claude Code 内
  /plugin marketplace add anthropics/skills
  /plugin marketplace add anthropics/claude-plugins-official
  /plugin marketplace add https://github.com/daymade/claude-code-skills
  /plugin marketplace add https://github.com/davila7/claude-code-templates
    
### 验证安装
	/plugin
	/skills
    
### 安装推荐的官方插件
  /plugin marketplace add anthropics/claude-plugins-official
  /plugin install hookify@claude-plugin-directory
  /plugin install code-review@claude-plugin-directory
  /plugin install feature-dev@claude-plugin-directory

### 常用官方 skills
| 技能 | 描述 |
|------|------|
| algorithmic-art | 算法艺术创作 |
| brand-guidelines | Anthropic 品牌指南 |
| canvas-design | 视觉设计 |
| doc-coauthoring | 协作编写文档 |
| docs-cleaner | 文档清理 |
| docx | Word 文档处理 |
| file-organizer | 文件整理 |
| frontend-design | 前端界面开发 |
| internal-comms | 内部沟通文档 |
| markdown-tools | 文档转换 |
| mcp-builder | MCP 服务器开发 |
| pdf | PDF 处理 |
| pptx | PPT 制作 |
| prompt-optimizer | 提示词优化 |
| qa-expert | QA 测试 |
| skill-creator | 技能创建 |
| template | 模板工具 |
| theme-factory | 主题样式 |
| web-artifacts-builder | 复杂 Web 组件 |
| webapp-testing | Web 应用测试 |
| xlsx | Excel 处理 |
| claude-hud:configure | HUD 配置 |
| claude-hud:setup | HUD 设置 |
  
---
