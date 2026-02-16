# 常用 MCP 服务器 (10个)

## 安装命令

| 服务器 | 功能 | 安装命令 | 状态 |
|--------|------|----------|------|
| MiniMax | Web 搜索与图像理解 | 内置 | ✓ |
| context7 | 获取库的最新文档 | `npx @upstash/context7-mcp` | ✓ |
| github | 操作仓库、Issue、PR | `npx @modelcontextprotocol/server-github` | ✓ |
| playwright | 浏览器自动化 | `npx @playwright/mcp@latest` | ✓ |
| chrome-devtools | 浏览器调试 | `npx chrome-devtools-mcp@latest` | ✓ |
| memory | 知识图谱记忆 | `npx @modelcontextprotocol/server-memory` | ✓ |
| fetch | HTTP 请求 | `uvx mcp-server-fetch` | ✓ |
| sqlite | SQLite 数据库 | `uvx mcp-server-sqlite` | ✓ |
| grep-app | GitHub 代码搜索 | `npx grep-mcp` | ✓ |
| pencil | UI 设计工具 | VS Code 扩展 | ✓ |

> 注：完整安装命令格式为 `claude mcp add <name> -s user -- <command>`
