# Claude Code 学习笔记

记录 Claude Code AI 助手的使用配置、学习笔记和最佳实践。

## 项目结构

```
Claude_Code/
├── .claude/          # Claude Code 配置目录
├── Agents/           # Agent 配置文件
├── MCP/              # MCP 服务器配置
├── Memory/           # 记忆数据库
├── Project/          # 项目实践代码
├── Prompt/           # Prompt 技能文档
├── Skills/           # Claude Skills 技能模块
├── 学习笔记/          # 个人学习笔记
└── README.md         # 项目说明
```

## MCP 服务器配置

### 常用 MCP 服务器

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

## Skills 安装

### 插件市场安装

```powershell
/plugin marketplace add anthropics/skills
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add https://github.com/daymade/claude-code-skills
/plugin marketplace add https://github.com/davila7/claude-code-templates
```

### 常用官方技能

| 技能 | 描述 |
|------|------|
| algorithmic-art | 算法艺术创作 |
| canvas-design | 视觉设计 |
| docx | Word 文档处理 |
| frontend-design | 前端界面开发 |
| pdf | PDF 处理 |
| pptx | PPT 制作 |
| xlsx | Excel 处理 |
| mcp-builder | MCP 服务器开发 |
| web-artifacts-builder | 复杂 Web 组件 |
| webapp-testing | Web 应用测试 |

## 使用说明

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

## 文档说明

- `学习笔记/` - 存放学习过程中的笔记和心得
- `MCP/` - MCP 服务器配置说明
- `Skills/` - 技能模块使用说明
- `Prompt/` - Prompt 编写技巧和示例

## 作者

- GitHub: [@nettyfly218](https://github.com/nettyfly218)

## 许可证

MIT License
