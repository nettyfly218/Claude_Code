# Everything Claude Code 安装使用说明 (精简版)

## 系统要求
- **系统**: Windows 10/11、macOS、Linux
- **依赖**: Node.js 18+、Git、Claude Code

## 安装步骤

### 1. 插件安装
`bash
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
`

### 2. 手动安装规则 (必需)
由于插件不支持分发规则，需手动复制：
`powershell
git clone https://github.com/affaan-m/everything-claude-code.git
# 安装到全局目录
Copy-Item "everything-claude-code\rules\*" "$env:USERPROFILE\.claude\rules\" -Recurse -Force
`

### 3. 验证
`bash
claude commands list
# 应显示 /tdd, /plan, /code-review 等命令
`

## 常用命令

| 命令 | 描述 |
|------|------|
| **/tdd** | 测试驱动开发工作流 |
| **/plan** | 创建实现计划 |
| **/code-review** | 代码质量审查 |
| **/learn** | 从会话中提取模式 |
| **/evolve** | 将学习到的经验转化为技能 |

## MCP 配置 (可选)
编辑 `~/.claude.json`:
`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token" }
    }
  }
}
`
*注意：建议 MCP 启用数量 < 10 个，以免过度占用上下文窗口。*

## 资源
- **GitHub**: https://github.com/affaan-m/everything-claude-code
