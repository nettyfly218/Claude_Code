import os
import re
import subprocess
import shutil
import datetime

def get_remote_hash(url):
    try:
        result = subprocess.run(
            ['git', 'ls-remote', url, 'HEAD'],
            capture_output=True,
            text=True,
            check=True
        )
        # Output format: <hash>\tHEAD
        return result.stdout.split()[0]
    except Exception as e:
        print(f"Error fetching hash for {url}: {e}")
        return None

def update_skill_hash(skill_dir):
    skill_md_path = os.path.join(skill_dir, 'SKILL.md')
    if not os.path.exists(skill_md_path):
        print(f"Skipping {skill_dir}: SKILL.md not found")
        return

    with open(skill_md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract GitHub URL
    url_match = re.search(r'^github_url:\s*(.+)$', content, re.MULTILINE)
    if not url_match:
        print(f"Skipping {skill_dir}: No github_url found")
        return

    github_url = url_match.group(1).strip()
    print(f"Checking {os.path.basename(skill_dir)} ({github_url})...")

    # Get latest hash
    latest_hash = get_remote_hash(github_url)
    if not latest_hash:
        return

    # Extract current hash
    hash_match = re.search(r'^github_hash:\s*(.+)$', content, re.MULTILINE)
    current_hash = hash_match.group(1).strip() if hash_match else None

    if current_hash == latest_hash:
        print(f"  - Already up to date ({current_hash[:7]})")
        return

    print(f"  - Updating from {current_hash[:7] if current_hash else 'None'} to {latest_hash[:7]}")

    # Backup
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{skill_md_path}.bak.{timestamp}"
    shutil.copy2(skill_md_path, backup_path)
    print(f"  - Backup created: {os.path.basename(backup_path)}")

    # Update content
    if current_hash:
        new_content = content.replace(current_hash, latest_hash)
    else:
        # If no hash existed, insert it after github_url
        new_content = content.replace(
            f"github_url: {github_url}",
            f"github_url: {github_url}\ngithub_hash: {latest_hash}"
        )

    # Add an update note to the bottom if it's not there
    update_note = f"\n\n<!-- Updated by Skill Manager on {datetime.date.today()} to commit {latest_hash} -->"
    if "Updated by Skill Manager" not in new_content:
        new_content += update_note

    with open(skill_md_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("  - SKILL.md updated successfully")

def main():
    base_skills_dir = "Skills"
    targets = ["pake", "lossless-cut", "convertx", "yt-dlp"]

    print("Starting batch update...")
    for target in targets:
        skill_dir = os.path.join(base_skills_dir, target)
        if os.path.exists(skill_dir):
            update_skill_hash(skill_dir)
        else:
            print(f"Warning: Directory {skill_dir} not found")

if __name__ == "__main__":
    main()
