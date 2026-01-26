# Claude Code 完整使用指南

---
## 一、安装 Claude Code

### macOS/Linux
```bash
# 方式一:使用 Homebrew(推荐)
brew install --cask claude-code

# 方式二:使用安装脚本
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows
```powershell
# 方式一:PowerShell 原生安装(推荐)
irm https://claude.ai/install.ps1 | iex

# 方式二:npm 全局安装(需先安装 Node.js + git)
npm install -g @anthropic-ai/claude-code
```

### 代理設置
```
## powershell
$env:HTTP_PROXY = "http://proxy-server:port"
$env:HTTPS_PROXY = "http://proxy-server:port"

## CMD
set HTTP_PROXY=http://proxy-server:port
set HTTPS_PROXY=http://proxy-server:port

## WSL (Linux)
export http_proxy=http://proxy-server:port
export https_proxy=http://proxy-server:port
```

### 验证安装
```bash
claude --version
```

### 绕过首次登录
```
  setx  ANTHROPIC_AUTH_TOKEN "claude_code_cli_for_vscode"    
  Get-ChildItem Env: | Where-Object {$_.Name -like "*ANTHROPIC*"} | Format-Table Name, Value -AutoSize 
``` 

### 启动 Claude Code
```bash
# 进入项目目录
cd your-project-folder

# 启动(跳过权限检查)
claude --dangerously-skip-permissions

# 或正常启动
claude
```

---
## 二、从 npm 安装迁移到原生安装(老用户)

1. 关闭所有 Claude Code 会话
2. 执行迁移命令:
```bash
claude install
```
3. 系统自动完成迁移,包括:
   - 保留所有配置(API Key、环境变量等)
   - 保留项目数据和插件
   - 更新为原生安装版本

---
## 三、配置 API

### 安装 claude-hud 状态栏插件
```bash
/plugin marketplace add jarrodwatts/claude-hud
/plugin install claude-hud
/claude-hud:setup
```

### 修复 claude-hud 上下文显示问题
**问题说明:**  
claude-hud 插件默认启用 `autocompactBuffer` 功能,会预留约 22.5% 的上下文窗口作为"自动压缩缓冲区"。这导致即使在空会话中,状态栏也会显示较高的上下文使用率(例如显示 23% 而不是 0%)。

**解决方案:**  
创建配置文件禁用自动压缩缓冲区,显示真实的上下文使用率。

**配置文件路径:**
```
C:\Users\Administrator\.claude\plugins\claude-hud\config.json
```

**配置内容:**
```json
{
  "display": {
    "autocompactBuffer": "disabled",
    "showUsage": true
  }
}
```

### 下载安装 CC Switch 快捷切换 API
```
https://github.com/farion1231/cc-switch
```

### 下载安装 antigravity + Antigravity-Tools 进行反向代理
```
https://antigravity.google/download
https://github.com/lbjlaq/Antigravity-Manager
```

---
## 四、配置 Memory

### 环境配置
- **操作系统**: Windows 11
- **开发IDE**: VS Code
- **命令行终端**: PowerShell

### 输出规范
- **语言**: 优先使用中文回复
- **代码注释**: 必须包含中文注释,说明关键逻辑
- **命令示例**: 使用 PowerShell 语法

### 代码规范
- 代码示例需完整、可直接运行
- 注释解释"为什么这么做",而非仅描述"做了什么"
- 路径使用反斜杠 `\` 或正斜杠 `/`,避免中文和空格路径

### 工作流程
1. 需求不明确时,先提出澄清问题
2. 给出实施方案和步骤分解
3. 提供完整代码及运行命令
4. 说明变更影响和注意事项

---
## 五、配置 Agents

系统内置的核心 Agents:
- **Bash** - 命令执行
- **Explore** - 代码库探索
- **general-purpose** - 通用任务
- **Plan** - 软件架构设计
- **claude-code-guide** - Claude Code 使用指南
- **statusline-setup** - 状态栏配置

---
## 六、配置常用 MCP 服务器

### chrome-devtools-mcp
```bash
claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest
```

### playwright
```bash
claude mcp add playwright -s user -- npx @playwright/mcp@latest
```

### context7
```bash
claude mcp add context7 -s user -- npx @upstash/context7-mcp
```

### github
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer $env:GITHUB_PAT" -s user
```

---
## 七、配置 Skills 和 Plugins

### 7.1 添加插件市场

```bash
# 添加官方插件市场
/plugin marketplace add anthropics/skills
/plugin marketplace add anthropics/claude-plugins-official

# 添加社区插件市场
/plugin marketplace add https://github.com/daymade/claude-code-skills
/plugin marketplace add https://github.com/davila7/claude-code-templates
/plugin marketplace add https://github.com/obra/superpowers-marketplace
/plugin marketplace add https://github.com/OthmanAdi/planning-with-files
/plugin install planning-with-files@planning-with-files
```

### 7.2 验证安装

```bash
/plugin      # 查看已安装插件
/agents      # 查看可用代理
/skills      # 查看可用技能
/mcp         # 查看 MCP 服务器
```

### 7.3 官方核心插件

```bash
# 安装官方推荐插件
/plugin install hookify@claude-plugin-directory
/plugin install code-review@claude-plugin-directory
/plugin install feature-dev@claude-plugin-directory
```

### 7.4 官方 Skills 列表(22个)

| 技能 | 描述 |
|------|------|
| **开发类** | |
| frontend-design | 前端界面开发 |
| mcp-builder | MCP 服务器开发 |
| skill-creator | 技能创建 |
| web-artifacts-builder | 复杂 Web 组件 |
| webapp-testing | Web 应用测试 |
| qa-expert | QA 测试 |
| api-design-principles | API 设计规范 |
| **文档类** | |
| doc-coauthoring | 协作编写文档 |
| docs-cleaner | 文档清理 |
| docx | Word 文档处理 |
| markdown-tools | 文档转换 |
| pdf | PDF 处理 |
| pptx | PPT 制作 |
| xlsx | Excel 处理 |
| **设计类** | |
| algorithmic-art | 算法艺术创作 |
| brand-guidelines | Anthropic 品牌指南 |
| canvas-design | 视觉设计 |
| theme-factory | 主题样式 |
| **工具类** | |
| file-organizer | 文件整理 |
| internal-comms | 内部沟通文档 |
| prompt-optimizer | 提示词优化 |
| template-skill | 模板工具 |

---
## 八、社区核心 Skills 和 Plugins

### 8.1 code-simplifier - 代码简化专家

**功能介绍:**
- 移除重复代码:把复制粘贴的逻辑合并成通用函数,遵循 DRY 原则(Don't Repeat Yourself)
- 清理孤立代码:删除没人调用的函数和变量
- 简化复杂逻辑:把 5 层嵌套的 if 地狱拍成平的,用卫语句和提前返回
- 改善命名规范:把 func1、temp2 改成 calculate_total、user_session
- 现代化语法:把旧式写法升级成列表推导式、箭头函数这些

**安装:**
```bash
# 方式一:直接安装
claude plugin install code-simplifier

# 方式二:从插件市场安装
/plugin marketplace update claude-plugins-official
/plugin install code-simplifier
```

**使用:**
```bash
# 在长时间编码工作结束后,或者清理复杂的 PR 时
@code-simplifier
```

### 8.2 Superpowers - 核心技能库

**功能介绍:**  
Superpowers 是由 @obra 开发的 Claude Code 核心技能库,旨在通过插件系统扩展 AI 编码助手的能力,提供 TDD、调试、协作模式等核心开发技能。

**安装:**
```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
/plugin install superpowers-chrome
/plugin install superpowers-developing-for-claude-code
```

**更新:**
```bash
/plugin update superpowers
```

### 8.3 Skill-Prompt-Generator - 智能提示词生成系统

**核心特性:**

#### 🎯 Skills 系统(核心)
- **12个专业领域 Skills:**
  - intelligent-prompt-generator (人像提示词专家)
  - art-master (艺术风格专家)
  - design-master (平面设计专家)
  - product-master (产品摄影专家)
  - video-master (视频生成专家)
  - universal-learner (学习系统)
  - prompt-analyzer (提示词分析)
  - prompt-extractor (元素提取)
  - prompt-generator (通用生成器)
  - prompt-master (主控调度)
  - prompt-xray (X-Ray分析)
  - domain-classifier (领域分类)
- **智能领域路由:** 自动识别用户需求,调用对应专家
- **模块化架构:** 每个 Skill 独立工作,协同配合

#### 🧠 智能能力
- 语义理解:区分主体/风格/氛围
- 常识推理:自动推断合理属性(如人种→眼睛颜色)
- 一致性检查:自动检测并修正逻辑冲突
- 框架驱动:基于 prompt_framework.yaml 结构化生成

#### 📦 双轨制系统
- **元素级生成:** 从 1140+ 个元素中智能选择组合
- **模板级生成:** 完整设计系统模板(如 Apple PPT 模板)

#### 📦 支持领域
- 📷 portrait - 人像摄影(502个元素)
- 🎨 design - 平面设计(80个元素)
- 🏠 interior - 室内设计
- 📦 product - 产品摄影
- 🎭 art - 艺术风格
- 🎬 video - 视频生成
- 📸 common - 通用摄影技术(205个元素)

**项目结构:**
```
.
├── .claude/                       # ⭐ Skills系统(核心)
│   ├── CLAUDE.md                  # 项目规则和Skill路由指南
│   └── skills/                    # 12个专业领域Skills
│       ├── intelligent-prompt-generator/
│       ├── art-master/
│       ├── design-master/
│       ├── product-master/
│       ├── video-master/
│       ├── universal-learner/
│       ├── prompt-analyzer/
│       ├── prompt-extractor/
│       ├── prompt-generator/
│       ├── prompt-master/
│       ├── prompt-xray/
│       └── domain-classifier/
│
├── intelligent_generator.py       # Python引擎:核心生成
├── framework_loader.py            # Python引擎:框架加载
├── element_db.py                  # Python引擎:数据库操作
├── prompt_framework.yaml          # 人像框架定义
│
├── extracted_results/
│   └── elements.db                # Universal Elements Library (1140+元素)
│
├── requirements.txt               # Python依赖
└── README.md                      # 项目文档
```

**安装步骤:**

**前置要求:**
- Claude Code (需要安装 Claude Code CLI)
- Python 3.8+ (用于运行底层引擎)
- Git (用于克隆项目,可选)

**方式1:克隆到本地(推荐)**
```bash
# 1. 克隆项目
git clone https://github.com/huangserva/skill-prompt-generator.git

# 2. 进入项目目录
cd skill-prompt-generator

# 3. 安装Python依赖
pip install -r requirements.txt
```
> 重要:克隆后,.claude/skills/ 下的12个Skills会自动被Claude Code识别。

**方式2:下载ZIP**
1. 访问 https://github.com/huangserva/skill-prompt-generator
2. 点击 "Code" → "Download ZIP"
3. 解压到任意目录
4. 在该目录下运行 `pip install -r requirements.txt`

**验证安装:**
```bash
# 测试人像生成skill
生成电影级的亚洲女性

# 测试设计skill
生成Bento Grid海报
```

**使用示例:**

**示例1:人像摄影(intelligent-prompt-generator skill)**
```
用户请求: 生成电影级的亚洲女性,张艺谋电影风格

Skill自动处理:
- 识别:人像摄影领域
- 调用:intelligent-prompt-generator skill
- 生成:电影级人像提示词,包含戏剧性光影

输出提示词:
Cinematic portrait of young East Asian woman, dramatic lighting with rim light
and chiaroscuro effect, Zhang Yimou's signature color palette with rich reds
and golds, 85mm lens, shallow depth of field, film grain texture...
```

**示例2:平面设计(design-master skill)**
```
用户请求: 生成Apple风格PPT模板

Skill自动处理:
- 识别:平面设计领域
- 调用:design-master skill
- 查询:Apple淡蓝商务PPT模板(12个元素完整系统)
- 输出:完整模板系统,包括背景、布局、配色、字体、视觉效果
```

**示例3:艺术绘画(art-master skill)**
```
用户请求: 生成中国水墨画山水

Skill自动处理:
- 识别:艺术绘画领域(无人物)
- 调用:art-master skill
- 生成:包含笔触、留白、泼墨等技法的提示词
```

**示例4:产品摄影(product-master skill)**
```
用户请求: 生成奢华手表产品摄影

Skill自动处理:
- 识别:产品摄影领域
- 调用:product-master skill
- 生成:商业级产品摄影提示词
```

---
## 九、常用命令速查

### 插件管理
```bash
/plugin                              # 查看已安装插件
/plugin marketplace add <url>        # 添加插件市场
/plugin marketplace update <name>    # 更新插件市场
/plugin install <name>               # 安装插件
/plugin update <name>                # 更新插件
/plugin uninstall <name>             # 卸载插件
```

### Skills 和 Agents
```bash
/skills                              # 查看可用技能
/agents                              # 查看可用代理
@<skill-name>                        # 调用特定技能
```

### MCP 管理
```bash
/mcp                                 # 查看 MCP 服务器
claude mcp add <name> -s user -- <command>  # 添加 MCP 服务器
```

---
## 十、最佳实践

### 1. 项目初始化建议
- 在项目根目录启动 Claude Code
- 配置好 `.claude/` 目录下的 Memory 和 Skills
- 安装必要的 MCP 服务器

### 2. 代码质量维护
- 定期使用 `@code-simplifier` 清理代码
- 使用 `@code-review` 进行代码审查
- 利用 `@qa-expert` 进行质量检查

### 3. 提示词优化
- 使用 `@prompt-optimizer` 优化提示词
- 对于复杂需求,使用专业 Skills(如 intelligent-prompt-generator)

### 4. 性能监控
- 使用 claude-hud 监控上下文使用情况
- 及时清理不必要的上下文

---
## 十一、故障排查

### 常见问题

**1. Skills 无法识别**
- 检查 `.claude/skills/` 目录是否存在
- 确认 Skills 文件夹结构正确
- 重启 Claude Code

**2. MCP 服务器连接失败**
- 检查网络连接
- 确认 API Token 配置正确
- 查看 MCP 服务器日志

**3. 插件安装失败**
- 更新插件市场: `/plugin marketplace update`
- 检查 Python 环境(部分插件需要)
- 查看错误日志

**4. 上下文显示异常**
- 检查 claude-hud 配置文件
- 确认 `autocompactBuffer` 已禁用

---
## 十二、相关资源

### 官方资源
- Claude Code 官网: https://claude.ai
- 官方文档: https://docs.claude.ai
- 官方技能市场: https://github.com/anthropics/skills/tree/main/skills
- 官方插件市场: https://github.com/anthropics/claude-plugins-official

### 社区资源
- Superpowers: https://github.com/obra/superpowers-marketplace
- Skill-Prompt-Generator: https://github.com/huangserva/skill-prompt-generator
- CC Switch: https://github.com/farion1231/cc-switch
- Claude Code Skills: https://github.com/daymade/claude-code-skills
- Claude Code Templates: https://github.com/davila7/claude-code-templates

### 工具资源
- Antigravity: https://antigravity.google/download
- Antigravity Manager: https://github.com/lbjlaq/Antigravity-Manager

---
## 附录:快速上手清单

- [ ] 安装 Claude Code
- [ ] 配置 API 和 claude-hud
- [ ] 设置 Memory 配置
- [ ] 添加插件市场
- [ ] 安装核心 Skills 和 Plugins
- [ ] 配置 MCP 服务器
- [ ] 验证安装 (`/plugin`, `/skills`, `/mcp`)
- [ ] 测试核心功能

---

**最后更新:** 2026-01-17  
**维护者:** nettyfly218