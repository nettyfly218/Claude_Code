# Jarrod Watts Claude Code 配置使用说明

这份文档基于 [jarrodwatts/claude-code-config](https://github.com/jarrodwatts/claude-code-config) 仓库整理，详细说明了该配置的使用方法、安装步骤及核心工作流。

## 1. 项目概述

这是 Jarrod Watts 整理的一套 Claude Code 个人配置，汇集了社区中优秀的规则、Hooks、Agents、Skills 和命令。它的核心目标是将 Claude Code 塑造成一个**高级主任工程师 (Senior Staff Engineer)**，具备以下特质：
- **主动性**：不仅是回答问题，而是根据意图主动规划。
- **严谨性**：拒绝 AI 幻觉，强调验证和测试。
- **条理性**：强制使用 Todo 列表管理复杂任务。
- **工具化**：善于将任务委托给专用的 Agent 或 Skill。

## 2. 安装方法

### 方法一：一键安装（推荐）

无需 Git，直接在 Claude Code 对话框中粘贴以下 Prompt 即可自动拉取配置：

`text
Install Claude Code configuration from https://github.com/jarrodwatts/claude-code-config

Fetch and install these files to ~/.claude/:

**Rules** (path-scoped instructions):
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/rules/typescript.md → ~/.claude/rules/typescript.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/rules/testing.md → ~/.claude/rules/testing.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/rules/comments.md → ~/.claude/rules/comments.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/rules/forge.md → ~/.claude/rules/forge.md

**Skills** (model-invoked capabilities):
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/planning-with-files/SKILL.md → ~/.claude/skills/planning-with-files/SKILL.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/planning-with-files/examples.md → ~/.claude/skills/planning-with-files/examples.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/planning-with-files/reference.md → ~/.claude/skills/planning-with-files/reference.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/react-useeffect/SKILL.md → ~/.claude/skills/react-useeffect/SKILL.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/react-useeffect/alternatives.md → ~/.claude/skills/react-useeffect/alternatives.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/skills/react-useeffect/anti-patterns.md → ~/.claude/skills/react-useeffect/anti-patterns.md

**Agents** (custom subagents):
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/agents/codebase-search.md → ~/.claude/agents/codebase-search.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/agents/media-interpreter.md → ~/.claude/agents/media-interpreter.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/agents/open-source-librarian.md → ~/.claude/agents/open-source-librarian.md
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/agents/tech-docs-writer.md → ~/.claude/agents/tech-docs-writer.md

**Commands** (slash commands):
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/commands/interview.md → ~/.claude/commands/interview.md

**Hooks** (event-triggered scripts):
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/hooks/keyword-detector.py → ~/.claude/hooks/keyword-detector.py
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/hooks/check-comments.py → ~/.claude/hooks/check-comments.py
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/hooks/todo-enforcer.sh → ~/.claude/hooks/todo-enforcer.sh

**Global Instructions**:
- https://raw.githubusercontent.com/jarrodwatts/claude-code-config/master/CLAUDE.md → ~/.claude/CLAUDE.md

**CRITICAL: Do NOT overwrite existing files.**
If a file exists, ask me whether to Skip, Overwrite, or Merge.
`

### 方法二：手动克隆

`bash
git clone https://github.com/jarrodwatts/claude-code-config.git ~/.claude
`

## 3. 核心组件说明

该配置包含以下五个主要部分：

### 3.1 Rules (规则)
位于 `.claude/rules/`，根据文件路径自动加载的指令。
- **typescript.md**: TypeScript 编码规范。
- **testing.md**: 测试模式与最佳实践。
- **comments.md**: 代码注释策略。
- **forge.md**: Foundry/ZKsync 开发规则。

### 3.2 Skills (技能)
位于 `.claude/skills/`，Claude 可调用的增强能力。
- **planning-with-files**: Manus 风格的文件化规划（生成 `task_plan.md`, `findings.md` 等）。
- **react-useeffect**: React Hooks 编写的最佳实践与反模式检查。

### 3.3 Agents (子智能体)
位于 `.claude/agents/`，用于处理特定领域的复杂任务。
- **codebase-search**: 深度代码库搜索。
- **media-interpreter**: PDF/图像内容解析。
- **open-source-librarian**: 开源库研究员（查阅文档、GitHub 示例）。
- **tech-docs-writer**: 技术文档编写专家。

### 3.4 Commands (斜杠命令)
位于 `.claude/commands/`，用户可直接调用的快捷指令。
- **/interview**: 交互式需求挖掘。当需求不明确时，通过问答完善规格说明。

### 3.5 Hooks (钩子)
位于 `.claude/hooks/`，在特定事件发生时自动运行的脚本。
- **keyword-detector.py**: 提交 Prompt 时检测关键词。
- **check-comments.py**: 使用 Write/Edit 工具后检查注释规范。
- **todo-enforcer.sh**: 任务停止时强制检查 Todo 完成情况。

## 4. 核心工作流 (The Workflow)

此配置在 `CLAUDE.md` 中定义了一套严格的工作流程（Phase 0 - Phase 3），要求 Claude 像高级工程师一样思考。

### Phase 0: 意图识别 (Intent Gate)
在执行任何操作前，先判断用户意图并分类：
- **Trivial**: 简单问题 -> 直接回答。
- **Exploratory**: "如何..." -> 启动 `explore` Agent。
- **GitHub Work**: "@mention" -> 启动完整开发循环（调查->实现->PR）。
- **Ambiguous**: 模糊需求 -> 启动 `/interview` 或提问。

**关键触发器 (Triggers):**
- 提到外部库 -> 触发 `librarian` (研究员)
- 涉及 2+ 模块 -> 触发 `explore` (探索者)
- 编写代码前 -> 触发 `/rigorous-coding` (严格编码模式)
- React 开发 -> 触发 `/react-useeffect`

### Phase 1: 代码库评估 (Assessment)
在动手前，先评估代码库状态：
- **Disciplined (规范)**: 严格遵循现有模式。
- **Chaotic (混乱)**: 提议最佳实践或遵循现有混乱。

### Phase 2: 探索与实现 (Exploration & Implementation)
- **并行执行**: 默认并行运行 `explore` (内部搜索) 和 `librarian` (外部文档搜索)。
- **任务委托**: 将任务指派给专用 Agent，Prompt 必须包含 7 要素（任务、预期结果、所需技能、工具白名单、必做、禁止做、上下文）。
- **Todo 管理 (CRITICAL)**: **强制**在开始复杂任务前创建 Todo 列表，并实时更新状态 (`in_progress`, `completed`)。

### Phase 3: 完成与验证 (Completion)
任务完成的标准：
1. 所有 Todo 已完成。
2. 修改的文件通过 `lsp_diagnostics` 检查。
3. 构建/测试通过。
4. 后台任务已取消。

## 5. 推荐插件

除了核心配置，建议安装以下官方和第三方插件以获得完整体验：

`bash
# 官方插件
claude plugin install frontend-design    # 前端设计
claude plugin install code-review        # 代码审查
claude plugin install typescript-lsp     # TS 语言服务
claude plugin install plugin-dev         # 插件开发
claude plugin install ralph-loop         # 循环执行工具

# 状态栏插件 (Claude HUD)
claude plugin marketplace add jarrodwatts/claude-hud
claude plugin install claude-hud@claude-hud
`

## 6. 使用小贴士

1. **善用 Todo**: 如果你发现 Claude 迷失了方向，要求它"创建一个 Todo 列表"。本配置已强制要求它在复杂任务前这么做。
2. **利用 Agent**: 遇到不熟悉的库（如从未用过的 npm 包），直接告诉 Claude "咨询 Librarian 怎么用这个库"，它会去查阅官方文档和 GitHub 用法。
3. **规划模式**: 遇到大型重构或新功能开发，输入 `/planning-with-files`，让 Claude 生成持久化的计划文档，避免上下文丢失。
4. **面试模式**: 只有一句话需求时，输入 `/interview`，让 Claude 引导你完善需求细节。
