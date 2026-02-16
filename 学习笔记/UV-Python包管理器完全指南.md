# UV Python 包管理器完全指南

> 由 Astral（ruff、ty 的开发者）出品的极快 Python 包和项目管理器
>
> 版本: v1.0 | 更新日期: 2026-02-14

---

## 📋 目录

- [1. 概述](#1-概述)
- [2. 安装方法](#2-安装方法)
- [3. 核心功能](#3-核心功能)
- [4. 基本命令](#4-基本命令)
- [5. 与 pip 对比](#5-与-pip-对比)
- [6. 迁移指南](#6-迁移指南)
- [7. 常见问题](#7-常见问题)

---

## 1. 概述

### 1.1 什么是 UV

**UV** 是由 Astral 公司（知名 Rust 工具链 ruff、ty 的开发者）出品的 **极快 Python 包和项目管理器**，使用 Rust 编写。

| 项目 | 信息 |
|------|------|
| GitHub | https://github.com/astral-sh/uv |
| 官方文档 | https://docs.astral.sh/uv/ |
| 最新版本 | 0.10.2 (2026-02-10) |
| Stars | 79,191+ |

### 1.2 核心特性

| 特性 | 说明 |
|------|------|
| ⚡ **极速** | 比 pip 快 10-100 倍（Rust 编写） |
| 🛠️ **多合一** | 替代 pip, pip-tools, pipx, poetry, pyenv, twine, virtualenv |
| 📦 **项目管理** | 支持 lockfile、workspace、通用锁文件 |
| 🐍 **Python 版本管理** | 安装和管理多个 Python 版本 |
| 💾 **全局缓存** | 磁盘空间高效，依赖去重 |
| 🔧 **pip 兼容接口** | 提供 `uv pip` 作为 pip 的直接替代 |

---

## 2. 安装方法

### 2.1 Windows (PowerShell)

```powershell
# 推荐方式
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 或通过 pip 安装
pip install uv
```

### 2.2 macOS / Linux (Shell)

```bash
# 推荐方式
curl -LsSf https://astral.sh/uv/install.sh | sh

# 或通过 pip 安装
pip install uv

# 或通过 pipx 安装
pipx install uv
```

### 2.3 验证安装

```powershell
uv --version
# 输出: uv 0.10.2
```

### 2.4 更新 UV

```powershell
uv self update
```

---

## 3. 核心功能

### 3.1 项目管理

```powershell
uv init example          # 初始化项目
uv add <package>         # 添加依赖
uv add -D <package>      # 添加开发依赖
uv lock                  # 生成锁文件
uv sync                  # 同步依赖
uv run <command>        # 在虚拟环境中运行命令
```

### 3.2 虚拟环境

```powershell
uv venv                  # 创建虚拟环境
uv venv .venv            # 指定环境目录
source .venv/Scripts/activate  # 激活（Windows）
source .venv/bin/activate      # 激活（Linux/macOS）
```

### 3.3 pip 兼容接口

```powershell
uv pip compile requirements.in --output-file requirements.txt
uv pip sync requirements.txt
uv pip install <package>
uv pip install -r requirements.txt
uv pip uninstall <package>
```

### 3.4 Python 版本管理

```powershell
uv python install 3.12   # 安装 Python 3.12
uv python install 3.11   # 安装 Python 3.11
uv python list           # 列出已安装版本
uv python pin 3.11       # 固定项目 Python 版本
uv run --python pypy@3.8 # 使用特定版本运行
```

### 3.5 工具运行

```powershell
uvx pycowsay 'hello!'    # 运行临时工具 (uv tool run 别名)
uv tool install ruff     # 安装工具到全局
uv tool list             # 列出已安装工具
uv tool uninstall ruff   # 卸载工具
```

### 3.6 单文件脚本

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["requests", "numpy"]
# ///

import requests
import numpy as np

# 运行时自动安装依赖
response = requests.get("https://api.github.com")
print(f"Status: {response.status_code}")
```

运行脚本：
```powershell
uv run script.py
```

---

## 4. 基本命令

### 4.1 常用命令速查

| 命令 | 说明 |
|------|------|
| `uv --version` | 查看版本 |
| `uv pip install <pkg>` | 安装包 |
| `uv pip install -r requirements.txt` | 从文件安装 |
| `uv pip freeze` | 导出已安装包 |
| `uv pip list` | 列出已安装包 |
| `uv pip show <pkg>` | 查看包信息 |
| `uv pip compile` | 编译 requirements.in |
| `uv pip sync` | 按锁文件安装 |
| `uv venv` | 创建虚拟环境 |
| `uv sync` | 同步项目依赖 |
| `uv lock` | 生成/更新锁文件 |
| `uv add <pkg>` | 添加依赖 |
| `uv remove <pkg>` | 移除依赖 |
| `uv python install <version>` | 安装 Python 版本 |
| `uv tool run <tool>` | 运行工具 |
| `uvx <tool>` | 快速运行工具 |

---

## 5. 与 pip 对比

### 5.1 性能对比

| 特性 | UV | pip |
|------|-----|-----|
| **速度** | 10-100x 更快 | 较慢 |
| **语言** | Rust | Python |
| **依赖解析** | PubGrub 算法，更智能 | 简单 |
| **锁文件** | 支持 uv.lock | 不支持 |
| **Workspace** | 支持 | 不支持 |
| **Python 版本管理** | 内置 | 需 pyenv |
| **全局缓存** | 有，去重 | 有 |
| **工具管理** | uvx/pipx | pipx |

### 5.2 命令对比

| 操作 | pip | UV |
|------|-----|-----|
| 安装包 | `pip install requests` | `uv pip install requests` |
| 安装文件 | `pip install -r req.txt` | `uv pip sync req.txt` |
| 创建环境 | `python -m venv .venv` | `uv venv` |
| 导出依赖 | `pip freeze > req.txt` | `uv pip freeze` |
| 运行脚本 | `python script.py` | `uv run script.py` |

---

## 6. 迁移指南

### 6.1 渐进式迁移

无需改变现有工作流程，直接使用 `uv pip` 接口即可获得性能提升：

```powershell
# 方式 1: 完全替换 pip
# 在配置文件中添加 alias
# alias pip=uv pip

# 方式 2: 保留 pip，用 uv 加速特定场景
uv pip compile requirements.in --output-file requirements.txt
uv pip sync requirements.txt

# 方式 3: 新项目使用完整功能
uv init myproject
uv add requests
uv sync
```

### 6.2 常见迁移场景

#### 从 requirements.txt 迁移

```powershell
# 原有的 pip 工作流
pip install -r requirements.txt

# UV 替代方案
uv pip sync requirements.txt
```

#### 从 poetry 迁移

```powershell
# 导出 poetry 依赖
poetry export -f requirements.txt --output requirements.txt

# 使用 UV
uv pip sync requirements.txt
```

---

## 7. 常见问题

### Q1: UV 和 pip 可以共存吗？

**可以**。UV 设计为与 pip 共存，不会影响系统 Python。你可以同时使用两者。

### Q2: UV 支持 Windows 吗？

**完全支持**。UV 支持 Windows、macOS、Linux，包括 ARM 架构。

### Q3: 如何卸载 UV？

```powershell
# Windows
rm -rf $HOME/.local/bin/uv
rm -rf $HOME/.local/share/uv

# macOS / Linux
rm -rf ~/.local/bin/uv
rm -rf ~/.local/share/uv
```

### Q4: UV 的缓存位置在哪？

```powershell
# Unix
~/.cache/uv/

# Windows
$LOCALAPPDATA/uv/cache/
```

### Q5: 如何查看更详细的日志？

```powershell
uv pip install <package> -v    # 详细输出
uv pip install <package> --verbose
```

---

## 📚 参考资源

- [UV 官方文档](https://docs.astral.sh/uv/)
- [UV GitHub](https://github.com/astral-sh/uv)
- [安装指南](https://docs.astral.sh/uv/getting-started/installation/)
- [项目管理指南](https://docs.astral.sh/uv/guides/projects/)
- [pip 兼容接口](https://docs.astral.sh/uv/pip/index/)

---

*本笔记基于 UV 0.10.2 版本编写*
