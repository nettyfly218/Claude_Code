import json
import sys
import os
import datetime

def generate_html(data, output_path):
    # Tech/Cyberpunk Style CSS
    css = """
    :root {
        --bg-color: #0d1117;
        --card-bg: #161b22;
        --accent: #58a6ff;
        --text-main: #c9d1d9;
        --text-dim: #8b949e;
        --border: #30363d;
        --success: #238636;
        --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-main);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 40px;
        line-height: 1.6;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    header {
        border-bottom: 1px solid var(--border);
        padding-bottom: 20px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-family: var(--font-mono);
        color: var(--accent);
        margin: 0;
        font-size: 24px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .date {
        color: var(--text-dim);
        font-family: var(--font-mono);
        font-size: 14px;
    }

    .card {
        background-color: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 24px;
        margin-bottom: 24px;
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
        overflow: hidden;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(88, 166, 255, 0.1);
        border-color: var(--accent);
    }

    .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: var(--accent);
        opacity: 0.5;
    }

    .repo-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }

    .repo-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--accent);
        text-decoration: none;
    }

    .repo-name:hover {
        text-decoration: underline;
    }

    .stats {
        display: flex;
        gap: 16px;
        font-size: 12px;
        font-family: var(--font-mono);
        color: var(--text-dim);
    }

    .tag {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        background: rgba(88, 166, 255, 0.1);
        color: var(--accent);
        border: 1px solid rgba(88, 166, 255, 0.2);
    }

    .summary-box {
        background: rgba(48, 54, 61, 0.3);
        border-left: 2px solid var(--text-dim);
        padding: 12px 16px;
        margin-top: 16px;
    }

    .summary-title {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--text-dim);
        margin-bottom: 8px;
        font-weight: 600;
        font-family: var(--font-mono);
    }

    .summary-content {
        font-size: 15px;
    }

    footer {
        text-align: center;
        margin-top: 60px;
        color: var(--text-dim);
        font-size: 12px;
        font-family: var(--font-mono);
    }
    """

    html_content = f"""
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GitHub Trending Daily Report</title>
        <style>
            {css}
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>GitHub Trending Report</h1>
                <div class="date">{datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}</div>
            </header>

            <div id="content">
    """

    for idx, repo in enumerate(data, 1):
        html_content += f"""
        <div class="card">
            <div class="repo-header">
                <div>
                    <div style="font-family: monospace; color: #8b949e; margin-bottom: 4px;">#{idx:02d}</div>
                    <a href="{repo.get('url', '#')}" class="repo-name" target="_blank">{repo.get('name', 'Unknown Repo')}</a>
                </div>
                <div class="stats">
                    <span class="tag">{repo.get('language', 'Unknown')}</span>
                    <span>★ {repo.get('stars', '0')}</span>
                </div>
            </div>

            <div class="summary-box">
                <div class="summary-title">AI SUMMARY // 项目摘要</div>
                <div class="summary-content">
                    {repo.get('summary', repo.get('description', 'No summary available.'))}
                </div>
            </div>

            <div style="margin-top: 12px; font-size: 13px; color: #8b949e;">
               <strong>技术栈/关键词:</strong> {repo.get('tech_stack', 'N/A')}
            </div>
        </div>
        """

    html_content += """
            </div>
            <footer>
                GENERATED BY CLAUDE AGENT // GITHUB-TRENDING-REPORTER
            </footer>
        </div>
    </body>
    </html>
    """

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Report generated successfully at: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_report.py <input_json> <output_html>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        generate_html(data, output_file)
    except Exception as e:
        print(f"Error generating report: {e}")
        sys.exit(1)
