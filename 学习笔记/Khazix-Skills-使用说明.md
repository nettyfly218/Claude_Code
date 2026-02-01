# Khazix-Skills 使用说明 (精简版)

## 核心组件
| 工具 | 功能 |
|------|------|
| **github-to-skills** | 将 GitHub 仓库一键转换为 Claude 技能 |
| **skill-manager** | 管理技能的安装、检查更新和删除 |
| **skill-evolution-manager** | 基于对话反馈自动进化技能，积累最佳实践 |

## 快速安装

1. **安装依赖**: `pip install pyyaml`
2. **下载仓库**: `git clone https://github.com/KKKKhazix/Khazix-Skills.git`
3. **安装技能**: 将 `github-to-skills`, `skill-manager`, `skill-evolution-manager` 三个文件夹复制到 `$env:USERPROFILE\.claude\skills\`。
4. **重启 Claude**: 执行 `exit` 后重新启动。

## 常用命令

### 1. 导入技能
`bash
/github-to-skills <github_url>
# 例: /github-to-skills https://github.com/yt-dlp/yt-dlp
`

### 2. 管理技能
`bash
/skill-manager list                # 列出技能
/skill-manager check               # 检查更新
/skill-manager update <skill-name> # 更新技能
/skill-manager delete <skill-name> # 删除技能
`

### 3. 进化技能
在对话结束时使用，将经验固化到技能中：
`bash
/evolve
# 或: "根据刚才的对话改进这个技能"
`

## 常见问题
- **命令未找到**: 确保目录结构正确（`skills/技能名/SKILL.md`）并已重启 Claude。
- **API 限制**: 设置 `GITHUB_TOKEN` 环境变量可增加 GitHub API 调用次数。
