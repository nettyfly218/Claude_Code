import requests
from bs4 import BeautifulSoup
import json
import os
import sys

def fetch_trending():
    url = "https://github.com/trending"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    try:
        print(f"Fetching {url}...")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching trending page: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    repos = []

    # GitHub trending structure usually has article.Box-row
    rows = soup.select('article.Box-row')

    print(f"Found {len(rows)} repositories. Processing top 10...")

    for row in rows[:10]:
        try:
            # Title / Repo Name
            h1 = row.select_one('h2.h3 a')
            repo_url_suffix = h1['href'].strip()
            repo_name = repo_url_suffix.lstrip('/')
            full_url = f"https://github.com{repo_url_suffix}"

            # Description
            p = row.select_one('p.col-9')
            description = p.text.strip() if p else "No description provided."

            # Language
            lang_span = row.select_one('[itemprop="programmingLanguage"]')
            language = lang_span.text.strip() if lang_span else "Unknown"

            # Stars (Total)
            # Usually the first link in the f6 text-gray div with svg octicon-star
            # Or just searching for the star count format
            stats_div = row.select_one('div.f6.color-fg-muted.mt-2')
            stars = "0"
            if stats_div:
                links = stats_div.select('a')
                for link in links:
                    if 'stargazers' in link['href']:
                        stars = link.text.strip().replace(',', '')
                        break

            # Fetch README snippet (Simple attempt via raw content)
            # Try 'main' then 'master'
            readme_content = ""
            raw_base = f"https://raw.githubusercontent.com/{repo_name}"
            for branch in ['main', 'master']:
                try:
                    r_url = f"{raw_base}/{branch}/README.md"
                    rr = requests.get(r_url, headers=headers, timeout=5)
                    if rr.status_code == 200:
                        readme_content = rr.text[:2000] # First 2000 chars
                        break
                except:
                    continue

            repos.append({
                "name": repo_name,
                "url": full_url,
                "description": description,
                "language": language,
                "stars": stars,
                "readme_snippet": readme_content
            })

        except Exception as e:
            print(f"Error processing a row: {e}")
            continue

    return repos

if __name__ == "__main__":
    data = fetch_trending()

    output_file = "trending_raw.json"
    if len(sys.argv) > 1:
        output_file = sys.argv[1]

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully fetched {len(data)} repositories and saved to {output_file}")
