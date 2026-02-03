#!/usr/bin/env python3
"""
GitHub Trending Reporter - 一键生成日报
Usage: python run.py [output_path]
"""

import json
import sys
import os
import datetime
import subprocess
import shutil
from collections import Counter
from pathlib import Path


# 安全的 JSON 字符串转义 - 处理中文标点符号
def safe_json_string(text):
    """转义 JSON 字符串中的特殊字符和中文标点"""
    if not isinstance(text, str):
        return text
    # 先转义已有的特殊字符
    text = text.replace("\\", "\\\\")
    text = text.replace('"', '\\"')
    # 替换中文标点符号为ASCII兼容字符
    text = text.replace('"', '"')  # 左双引号
    text = text.replace('"', '"')  # 右双引号
    text = text.replace(
        """, "'")  # 左单引号
    text = text.replace(""",
        "'",
    )  # 右单引号
    text = text.replace("「", "[")  # 左书名号
    text = text.replace("」", "]")  # 右书名号
    text = text.replace("『", "[")  # 左双书名号
    text = text.replace("』", "]")  # 右书名号
    return text


def get_rank_emoji(idx):
    """根据排名返回对应的 emoji"""
    emoji_map = {
        1: "🥇",
        2: "🥈",
        3: "🥉",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
        10: "🔟",
    }
    return emoji_map.get(idx, f"{idx}")


def add_summaries(data):
    """为每个项目添加摘要（占位符，实际由 Claude 填充）"""
    for repo in data:
        repo["summary"] = repo.get("description", "No description available.")
        repo["tech_stack"] = repo.get("language", "Unknown")
    return data


def analyze_tech_stack(data):
    """分析技术栈分布"""
    # 统计编程语言
    languages = [repo.get("language", "Unknown") for repo in data]
    language_counts = Counter(languages)

    # 统计星标数
    total_stars = sum(int(repo.get("stars", "0").replace(",", "")) for repo in data)
    avg_stars = total_stars // len(data) if data else 0

    # 分析主要技术领域
    ai_related = sum(
        1
        for repo in data
        if any(
            keyword in repo.get("description", "").lower()
            for keyword in [
                "ai",
                "llm",
                "agent",
                "gpt",
                "model",
                "machine learning",
                "deep learning",
            ]
        )
    )
    dev_tools = sum(
        1
        for repo in data
        if any(
            keyword in repo.get("description", "").lower()
            for keyword in ["tool", "framework", "library", "cli", "development"]
        )
    )

    return {
        "language_counts": dict(language_counts),
        "total_stars": total_stars,
        "avg_stars": avg_stars,
        "ai_related": ai_related,
        "dev_tools": dev_tools,
    }


def cleanup_temp_files(base_dir):
    """清理临时文件"""
    cleanup_patterns = [
        "trending_raw.json",
        "trending_with_summary.json",
        "test-report.html",
        "github-trending-report.html",
        "TODAY_TRENDING.md",
    ]

    print("\n[Cleanup] Cleaning up temporary files...")
    cleaned_count = 0
    for pattern in cleanup_patterns:
        file_path = os.path.join(base_dir, pattern)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                print(f"  - Removed: {pattern}")
                cleaned_count += 1
            except Exception as e:
                print(f"  - Failed to remove {pattern}: {e}")

    # 清理匹配通配符的文件
    for pattern in ["github-trending-report-*.html", "github-trending-report-*.md"]:
        # 只清理旧的文件（不是今天生成的）
        if "*" in pattern:
            base_pattern = pattern.split("*")[0]
            for file in os.listdir(base_dir):
                if file.startswith(base_pattern):
                    file_path = os.path.join(base_dir, file)
                    try:
                        os.remove(file_path)
                        print(f"  - Removed: {file}")
                        cleaned_count += 1
                    except Exception as e:
                        pass

    print(f"[Cleanup] Removed {cleaned_count} temporary file(s)")
    return cleaned_count


def generate_markdown_report(data, output_md_full):
    """生成增强的 Markdown 报告"""
    # 分析技术栈
    analysis = analyze_tech_stack(data)

    # 生成 Markdown 报告
    md_content = (
        "# GitHub Trending 日报 - "
        + datetime.datetime.now().strftime("%Y-%m-%d")
        + "\n\n"
    )

    # 摘要部分
    md_content += "## 📰 今日摘要\n\n"
    md_content += (
        f"> 今日 GitHub 热榜共有 **{len(data)}** 个热门项目，"
        f"总星标数 **{analysis['total_stars']:,}**，"
        f"平均每个项目 **{analysis['avg_stars']:,}** ⭐\n\n"
    )

    # 技术栈分析
    md_content += "### 📊 技术栈分布\n\n"
    for lang, count in sorted(
        analysis["language_counts"].items(), key=lambda x: x[1], reverse=True
    ):
        percentage = (count / len(data)) * 100
        bar = "█" * int(percentage / 10)
        md_content += f"- **{lang}**: {count} 个项目 ({percentage:.1f}%) {bar}\n"
    md_content += "\n"

    # 领域分析
    md_content += "### 🎯 领域分析\n\n"
    md_content += f"- **AI/LLM 相关**: {analysis['ai_related']} 个项目 ({analysis['ai_related'] / len(data) * 100:.1f}%)\n"
    md_content += f"- **开发工具**: {analysis['dev_tools']} 个项目 ({analysis['dev_tools'] / len(data) * 100:.1f}%)\n"
    md_content += "\n"

    # 热门项目概览
    md_content += "## 🏆 今日热榜概览\n\n"
    md_content += "| 排名 | 项目 | 语言 | Star 数 | 核心亮点 |\n"
    md_content += "|------|------|------|---------|----------|\n"

    for idx, repo in enumerate(data, 1):
        emoji = get_rank_emoji(idx)
        lang = repo.get("language", "Unknown")
        stars = repo.get("stars", "0")
        highlight = (
            repo.get("summary", "")[:60] + "..."
            if len(repo.get("summary", "")) > 60
            else repo.get("summary", "")
        )

        md_content += f"| {idx:02} | {emoji} {repo['name'].split('/')[1]} | {lang} | {stars} | {highlight} |\n"

    md_content += "\n"

    # 热门项目详解
    md_content += "## 🔥 热门项目详解\n\n"

    for idx, repo in enumerate(data, 1):
        emoji = get_rank_emoji(idx)
        md_content += f"### {emoji} {repo['name']} ({repo['stars']} ⭐)\n"
        md_content += f"**语言**: {repo.get('language', 'Unknown')}\n"
        md_content += f"**项目地址**: [{repo['name']}]({repo['url']})\n\n"
        md_content += (
            f"**摘要**:\n> {repo.get('summary', 'No description available.')}\n\n"
        )
        md_content += f"**技术栈**: {repo.get('tech_stack', 'Unknown')}\n\n"
        md_content += "---\n\n"

    # 页脚
    md_content += "\n---\n"
    md_content += (
        f"\n*报告生成时间: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n"
    )
    md_content += "*Generated by Claude Agent - GitHub Trending Reporter*\n"

    # 保存 Markdown 报告
    with open(output_md_full, "w", encoding="utf-8") as f:
        f.write(md_content)


def main():
    # 获取脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(script_dir)

    # 文件路径
    raw_json = os.path.join(base_dir, "trending_raw.json")
    summary_json = os.path.join(base_dir, "trending_with_summary.json")

    # 默认输出路径
    date_str = datetime.datetime.now().strftime("%Y%m%d")
    output_html_base = f"github-trending-{date_str}"
    output_html = f"{output_html_base}.html"
    output_md = f"{output_html_base}.md"

    # 尝试使用桌面路径
    desktop = os.path.join(os.path.expanduser("~"), "Desktop")
    if not os.path.exists(desktop):
        desktop = os.path.join(os.path.expanduser("~"), "desktop")

    output_html_full = os.path.join(desktop, output_html)
    output_md_full = os.path.join(desktop, output_md)

    # 如果用户指定了自定义输出路径，使用自定义路径
    if len(sys.argv) > 1:
        custom_path = sys.argv[1]
        # 如果是目录，使用默认文件名
        if os.path.isdir(custom_path):
            output_html_full = os.path.join(custom_path, output_html)
            output_md_full = os.path.join(custom_path, output_md)
        # 如果是文件路径，生成对应的 HTML 和 MD 文件
        else:
            output_html_full = custom_path
            # 将 .html 替换为 .md
            output_md_full = custom_path.rsplit(".html", 1)[0] + ".md"

    print("=" * 50)
    print("GitHub Trending Reporter")
    print("=" * 50)

    # Step 1: Fetch trending data
    print("\n[1/5] Fetching GitHub trending...")
    fetch_script = os.path.join(script_dir, "fetch_trending.py")
    result = subprocess.run(
        [sys.executable, fetch_script, raw_json], capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return 1
    print(result.stdout.strip())

    # Step 2: Read and prepare data
    print("\n[2/5] Reading trending data...")
    with open(raw_json, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 添加占位符摘要（实际使用时由 Claude 生成）
    data = add_summaries(data)

    # 保存带有摘要占位符的数据
    with open(summary_json, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Processed {len(data)} repositories")

    # Step 3: Generate HTML report
    print("\n[3/5] Generating HTML report...")
    gen_script = os.path.join(script_dir, "generate_report.py")
    result = subprocess.run(
        [sys.executable, gen_script, summary_json, output_html_full],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return 1
    print(result.stdout.strip())

    # Step 4: Generate Markdown trend analysis report
    print("\n[4/5] Generating Markdown report...")
    generate_markdown_report(data, output_md_full)
    print(f"Markdown report saved to: {output_md_full}")

    # Step 5: Cleanup temporary files
    cleanup_temp_files(base_dir)

    print("\n" + "=" * 50)
    print(f"[OK] Reports generated successfully")
    print(f"   HTML: {output_html_full}")
    print(f"   Markdown: {output_md_full}")
    print("=" * 50)
    return 0


if __name__ == "__main__":
    sys.exit(main())
