---
name: yt-dlp
description: 智能视频下载助手。当用户提供视频链接想要下载，或者提到下载视频时使用此技能。
---

# yt-dlp 视频下载技能

此技能用于智能下载视频，基于 `yt-dlp` 工具。

## 前置条件

在使用此技能之前，请确保系统已安装 `yt-dlp`。

检查安装:
```bash
yt-dlp --version
```

如果未安装，请运行:
```bash
pip install yt-dlp
```

## 使用方法

### 方式一: Python 脚本 (推荐 - 增强版)

脚本 `scripts/download.py` 已内置**自动重试**和**反爬虫绕过**策略。它会自动尝试不同的客户端 (Android/Web/iOS) 直到成功。

#### 1. 基础用法 (自动重试)
```bash
python scripts/download.py "视频URL"
```

#### 2. 身份验证 (解决 "Sign in" 错误)
推荐使用 `cookies.txt` 文件 (需先通过浏览器插件导出):
```bash
python scripts/download.py "视频URL" --cookies-file "cookies.txt"
```

或者尝试直接读取浏览器 Cookies (可能受系统加密限制):
```bash
python scripts/download.py "视频URL" --browser chrome
```

#### 3. 高级用法: PO Token
如果常规方法失效，可以使用 PO Token (Proof of Origin) 进行验证绕过:
```bash
python scripts/download.py "视频URL" --cookies-file "cookies.txt" --po-token "YOUR_PO_TOKEN_HERE"
```

### 方式二: 命令行直接调用

```bash
yt-dlp "视频URL"
```
