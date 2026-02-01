# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
本项目是 Claude Code 的学习与实践仓库，包含配置、MCP 服务器设置、Prompt 技能文档以及多个实践子项目。

## 架构与目录结构
- **.claude/**: Claude Code 配置文件
- **Agents/**: 自定义 Agent 配置
- **MCP/**: MCP (Model Context Protocol) 服务器配置与定义
- **Prompt/**: Prompt 技能文档与模板
- **Skills/**: 扩展技能模块 (如 github-trending-reporter)
- **Project/**: 实践项目代码
    - **MemorizeWords/**: 背单词工具
    - **SnakeGame/**: 贪吃蛇游戏
    - **temp_converter/**: 温度转换工具
    - **SkitScript/**: 小品剧本生成
- **学习笔记/**: 个人学习记录文档

## 常用命令

### 环境管理
- **终端**: PowerShell
- **Python 依赖**: `pip install requests beautifulsoup4 jinja2` (针对 github-trending-reporter)

### Claude Code 配置命令
- **安装 MCP (示例)**: `claude mcp add context7 -s user -- npx @upstash/context7-mcp`
- **安装 Skills**: `/plugin marketplace add <repo_url>`

### Git 操作
- **提交代码**:
  ```powershell
  git add .
  git commit -m "具体的提交信息"
  git push
  ```

## 代码规范与风格
- **语言**: 所有回复、解释和文档优先使用**中文**。
- **路径格式**: 使用正斜杠 `/` 或反斜杠 `\`，尽量避免路径中包含中文或空格。
- **注释**: 代码必须包含中文注释，解释"为什么这么做"而非仅描述"做了什么"。
- **代码块**: 提供完整、可运行的代码示例。
