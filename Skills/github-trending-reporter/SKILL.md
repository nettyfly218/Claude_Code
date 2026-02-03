---
name: github-trending-reporter 热榜日报
description: 自动抓取GitHub今日热榜项目，提取README并生成包含中文摘要的科技风格日报。一键执行完整流程。支持技术栈分析、趋势统计和自动清理。
version: 2.0.0
entry_point: scripts/run.py
---

# GitHub Trending Reporter

此技能用于自动化生成 GitHub 每日热榜报告。

## 功能特性

1. **自动爬取** - 从 `https://github.com/trending` 获取前 10 个热门项目
2. **README 提取** - 抓取每个项目的 README 片段
3. **智能摘要** - 使用 Claude AI 生成项目核心价值和技术栈的中文摘要
4. **双格式报告** - 生成科技风格的 HTML 日报和 Markdown 格式的趋势分析报告
5. **技术栈分析** - 自动统计编程语言分布和星标数据
6. **趋势分析** - 提供 AI/LLM 相关项目和开发工具的分类统计
7. **自动清理** - 任务完成后自动清理临时文件，保持工作目录整洁

## 依赖

请确保安装了以下 Python 库：

```bash
pip install -r Skills/github-trending-reporter/requirements.txt
```

**依赖列表：**
- requests
- beautifulsoup4

## 快速使用

### 方法一：一键生成（推荐）

```bash
python Skills/github-trending-reporter/scripts/run.py
```

报告会自动保存到桌面，文件名格式：`github-trending-YYYYMMDD.html`

### 方法二：指定输出路径

```bash
python Skills/github-trending-reporter/scripts/run.py /path/to/output.html
```

## 工作流程

脚本会自动执行以下步骤：

1. **Fetch** - 调用 `fetch_trending.py` 获取原始数据
2. **Prepare** - 读取数据并添加摘要占位符
3. **Generate HTML** - 调用 `generate_report.py` 生成科技风格 HTML 报告
4. **Generate Markdown** - 生成包含技术栈统计和趋势分析的 Markdown 报告
5. **Cleanup** - 自动清理临时文件（trending_raw.json、trending_with_summary.json、旧的报告文件）

## AI 摘要生成指南

当使用 Claude AI 生成摘要时，请为每个项目添加以下字段：

```json
{
  "summary": "项目功能的中文摘要，2-3句话说明核心价值",
  "tech_stack": "技术栈关键词，用逗号分隔"
}
```

**注意事项：**
- 摘要应突出项目的独特价值和用途
- 技术栈应包含主要语言、框架和工具
- 避免使用中文标点符号 `「」"'`，使用 `[]""` 替代
- JSON 中的双引号必须转义为 `\"`

## 输出报告样式

报告采用 GitHub 风格的暗色主题，包含：
- 项目排名和名称
- 星标数和编程语言
- AI 生成的项目摘要
- 技术栈标签

## 示例指令

- "生成今天的 GitHub 热榜日报"
- "看看今天 GitHub 都在火什么项目"
- "抓取 GitHub trending 并生成报告"

## 文件结构

```
Skills/github-trending-reporter/
├── SKILL.md              # 本文件
├── requirements.txt      # Python 依赖
├── scripts/
│   ├── run.py           # 一键执行入口 (v1.1.0+)
│   ├── fetch_trending.py # 爬取热榜数据
│   └── generate_report.py # 生成 HTML 报告
├── trending_raw.json           # 原始数据（临时，任务完成后自动清理）
├── trending_with_summary.json  # 带摘要的数据（临时，任务完成后自动清理）
├── test-report.html            # 测试报告（临时，任务完成后自动清理）
└── github-trending-report.html # 中间报告文件（临时，任务完成后自动清理）

**注意：** 所有临时文件在报告生成并复制到桌面后会自动清理，确保工作目录整洁。
```

## 更新日志

**v2.0.0** - 全面重构与功能增强 (2026-02-03)
- 修复：删除 run.py 中 Step 3 重复执行的代码
- 修复：修复文件复制到桌面的逻辑错误
- 新增：技术栈分布统计和可视化条形图
- 新增：AI/LLM 相关项目和开发工具的分类分析
- 新增：星标总数和平均星标统计
- 新增：自动清理临时文件功能，支持自定义清理模式
- 改进：增强 Markdown 报告，包含更多数据分析和趋势洞察
- 改进：优化代码结构，提高可维护性
- 改进：使用 shutil 替代系统 copy 命令，提高跨平台兼容性
- 文档：通过 skill-evolution-manager 沉淀最佳实践和用户偏好

**v1.2.1** - 增加自动清理功能 (2026-02-03)
- 新增：任务完成后自动清理临时文件
- 新增：cleanup_patterns 配置支持自定义清理模式
- 改进：优化工作目录整洁度

**v1.2.0** - 基于使用经验优化 (2026-02-03)
- 新增：自动生成 Markdown 格式摘要报告
- 新增：自动将报告复制到桌面
- 改进：增加趋势分析和可视化内容
- 文档：通过 skill-evolution-manager 沉淀最佳实践

**v1.1.0** - 添加 `run.py` 一键执行入口，简化使用流程
**v1.0.0** - 初始版本，支持手动三步执行流程

## User-Learned Best Practices & Constraints

> **Auto-Generated Section**: This section is maintained by `skill-evolution-manager`. Do not edit manually.

### User Preferences
- 用户希望同时生成同名的 .html 和 .md 两份报告文件
- 用户希望两份报告都自动复制到桌面以便快速访问
- 用户希望报告包含趋势分析和可视化图表
- 用户希望看到更多技术栈分类和主题分析
- 报告文件名格式统一为: github-trending-YYYYMMDD.html 和 github-trending-YYYYMMDD.md

### Known Fixes & Workarounds
- Windows 下路径处理应使用 shutil.copy 而非系统 copy 命令
- JSON 处理应确保中文标点符号正确转义
- 生成报告时应验证文件完整性
- 删除重复代码以避免逻辑错误和资源浪费

### Best Practices (Implemented)
- 使用 todo 列表跟踪执行进度，提高透明度
- 生成中文技术栈标签时应包含具体技术名称
- 为每个项目生成 2-3 句话的精炼中文摘要
- 添加跨项目的技术趋势对比分析（语言分布、星标统计、领域分类）
- 任务完成后自动清理临时文件，保持工作目录整洁
- 使用 collections.Counter 统计技术栈分布
- 提供可视化的条形图展示技术栈占比
- 统计 AI/LLM 相关项目和开发工具的数量

### Custom Instruction Injection

在生成报告后，主动提供 Markdown 摘要和趋势分析，包括：
- 技术栈分布统计
- AI/LLM 相关项目分析
- 开发工具项目分析
- 星标数据统计（总数、平均值）