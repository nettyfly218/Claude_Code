---
name: github-trending-reporter 热榜日报
description: 自动抓取GitHub今日热榜项目，提取README并生成包含中文摘要的科技风格日报。
version: 1.0.0
entry_point: scripts/fetch_trending.py
---

# GitHub Trending Reporter

此技能用于自动化生成 GitHub 每日热榜报告。它会：
1. 爬取 `https://github.com/trending` 获取前 5 个热门项目。
2. 抓取每个项目的 README 片段。
3. 使用 LLM (通过 Agent) 总结项目核心价值、技术栈。
4. 生成一份科技风格的 HTML 日报保存到桌面。

## 依赖
请确保安装了以下 Python 库：
- requests
- beautifulsoup4

安装命令: `pip install -r Skills/github-trending-reporter/requirements.txt`

## 使用流程
1. **Fetch**: 运行 `fetch_trending.py` 获取原始数据。
2. **Summarize**: Agent 读取原始数据，生成中文摘要。
3. **Generate**: 运行 `generate_report.py` 生成最终 HTML。

## 示例指令
- "生成今天的 GitHub 热榜日报"
- "看看今天 GitHub 都在火什么项目"
