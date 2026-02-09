# opencode + oh-my-opencode 使用指南

---

## 🛠️ 第一部分：安装指南

### 1. 环境准备

* **操作系统**：Windows
* **推荐终端**：Powershell
* **必备环境**：确保已安装 Node.js (推荐 v18+)

### 2. 安装 OpenCode

 `npm install -g opencode-ai` 
 `opencode upgrade`

### 3. 安装 oh-my-opencode (插件/增强)

 `bunx oh-my-opencode install --no-tui --claude=no --gemini=no --copilot=no`

 `npm ls -g oh-my-opencode`
 `npm install -g oh-my-opencode@latest` 
 `npm install -g oh-my-opencode@3.1.10` 
 `npm update -g oh-my-opencode`
 `npx oh-my-opencode doctor --verbose`

---

## ⚙️ 第二部分：核心配置

### 1. 连接模型

首次运行需配置模型 API（支持国产大模型直连）：

 `opencode config set provider deepseek`    # 或 anthropic, openai
 `opencode config set api_key <your_key>`

### 2. 网络配置 (国内用户)

若无法直接访问，需配置代理：

  `opencode config set proxy http://127.0.0.1:7890`

---

## 🔌 MCP 服务器配置

OpenCode 通过 MCP (Model Context Protocol) 协议连接各种外部工具，扩展 AI 能力。

### 配置文件
- **路径**: `~/.opencode/opencode.json`
- **当前版本**: OpenCode v1.1.49

### 可用 MCP 服务器清单

#### 1. Pencil (设计工具)
- **用途**: UI/UX 设计和原型制作
- **状态**: ✅ 已连接
- **使用示例**: 
  - 创建设计稿: `@pencil 设计一个登录页面`
  - 生成组件: `@pencil 创建一个按钮组件`

#### 2. Chrome DevTools (浏览器调试)
- **用途**: 网页调试、性能分析、DOM 操作
- **状态**: ✅ 已连接
- **配置参数**:
`
{
  "type": "local",
  "command": ["npx", "-y", "chrome-devtools-mcp@latest"],
  "enabled": true
}
`
- **使用示例**:
  - 调试页面: `@chrome-devtools 调试当前页面并分析性能`
  - 查看元素: `@chrome-devtools 检查页面上的按钮元素`

#### 3. Playwright (自动化测试)
- **用途**: 网页自动化、端到端测试、截图
- **状态**: ✅ 已连接
- **配置参数**:
`
{
  "type": "local",
  "command": ["npx", "-y", "@playwright/mcp@latest"],
  "enabled": true
}
`
- **使用示例**:
  - 访问网页: `@playwright 访问 https://example.com 并截图`
  - 自动化操作: `@playwright 在搜索框输入"OpenCode"并点击搜索`

#### 4. Context7 (文档搜索)
- **用途**: 查询编程文档和 API 参考
- **状态**: ✅ 已连接
- **配置参数**:
`
{
  "type": "remote",
  "url": "https://mcp.context7.com/mcp",
  "enabled": true
}
`
- **使用示例**:
  - 查询文档: `@context7 查询 React useEffect 的用法`
  - 获取示例: `@context7 给我 Python pandas 的数据过滤示例`

#### 5. GitHub (代码托管)
- **用途**: 仓库操作、Issue 管理、PR 处理
- **状态**: ✅ 已连接
- **配置参数**:
`
{
  "type": "local",
  "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
  "enabled": true,
  "environment": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "{env:GITHUB_PERSONAL_ACCESS_TOKEN}"
  }
}
`
- **环境变量设置**:
`powershell
$env:GITHUB_PERSONAL_ACCESS_TOKEN="ghp_xxxxxxxxxxxx"
`
- **使用示例**:
  - 查看 Issue: `@github 列出 opencode 仓库的所有 open issues`
  - 创建 PR: `@github 为当前分支创建一个 Pull Request`

### 快速安装命令

如需重新安装或添加新的 MCP：

`powershell
# Chrome DevTools
claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest

# Playwright  
claude mcp add playwright -s user -- npx @playwright/mcp@latest

# Context7
claude mcp add context7 -s user -- npx @upstash/context7-mcp

# GitHub (需要提前设置 GITHUB_PAT 环境变量)
claude mcp add github -s user -- npx @modelcontextprotocol/server-github
`

### 故障排除

- **MCP 无法连接**: 检查 Node.js 版本 (需 v18+) 和网络连接
- **GitHub MCP 报错**: 确认 GITHUB_PERSONAL_ACCESS_TOKEN 环境变量已设置
- **更新 MCP**: 运行 `opencode upgrade` 更新所有组件

---

## 🚀 第三部分：高效使用指令

### 1. 基础对话

* **开启对话**：直接在终端输入 `opencode`。
* **单条指令**：`opencode "帮我写一个 Python 爬虫脚本"`。

### 2. oh-my-opencode 快捷键与斜杠命令

| 命令 | 功能描述 |
| --- | --- |
| `/plan` | 进入规划模式，只输出方案不改代码 |
| `/build` | 进入构建模式，自动执行代码修改 |
| `/mcp` | 调用 MCP 扩展工具 (如读取本地文件、搜索网页) |
| `tab` | 在终端自动补全 OpenCode 命令 |

---

## 💡 最佳实践建议

* **混合模式**：先用 `/plan` 确认逻辑，再用 `/build` 落地，避免 AI 误删代码。
* **自动更新**：OpenCode 默认开启自动更新，保持版本最新以获得最新模型支持。
