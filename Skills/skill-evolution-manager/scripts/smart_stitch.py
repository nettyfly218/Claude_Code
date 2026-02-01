import os
import sys
import json
import re
import shutil
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

def stitch_skill(skill_dir):
    """
    Reads evolution.json and stitches it into SKILL.md under a dedicated section.
    Creates a backup of SKILL.md before modification.
    """
    skill_md_path = os.path.join(skill_dir, "SKILL.md")
    evolution_json_path = os.path.join(skill_dir, "evolution.json")

    if not os.path.exists(skill_md_path):
        logging.error(f"SKILL.md not found in {skill_dir}")
        return False
        
    if not os.path.exists(evolution_json_path):
        logging.info(f"No evolution.json found in {skill_dir}. Nothing to stitch.")
        return True

    try:
        with open(evolution_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        logging.error(f"Error parsing evolution.json: {e}")
        return False
    except Exception as e:
        logging.error(f"Error reading evolution.json: {e}")
        return False

    # Prepare the Markdown content block
    evolution_section = []
    evolution_section.append("\n\n## User-Learned Best Practices & Constraints")
    evolution_section.append("\n> **Auto-Generated Section**: This section is maintained by `skill-evolution-manager`. Do not edit manually.")
    
    if data.get("preferences"):
        evolution_section.append("\n### User Preferences")
        for item in data["preferences"]:
            evolution_section.append(f"- {item}")
            
    if data.get("fixes"):
        evolution_section.append("\n### Known Fixes & Workarounds")
        for item in data["fixes"]:
            evolution_section.append(f"- {item}")
            
    if data.get("custom_prompts"):
        evolution_section.append("\n### Custom Instruction Injection")
        evolution_section.append(f"\n{data['custom_prompts']}")
        
    evolution_block = "\n".join(evolution_section)

    try:
        # Read original SKILL.md
        with open(skill_md_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to find existing User-Learned section and replace it, or append if not found
        pattern = r"(\n+## User-Learned Best Practices & Constraints.*$)"
        match = re.search(pattern, content, re.DOTALL)
        
        new_content = ""
        if match:
            logging.info("Updating existing evolution section...")
            new_content = content[:match.start()] + evolution_block
        else:
            logging.info("Appending new evolution section...")
            new_content = content + evolution_block

        # Create Backup
        timestamp = int(time.time())
        backup_path = f"{skill_md_path}.bak.{timestamp}"
        try:
            shutil.copy2(skill_md_path, backup_path)
            logging.info(f"Created backup at {backup_path}")
        except Exception as e:
            logging.warning(f"Failed to create backup: {e}")

        # Write back
        with open(skill_md_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        logging.info(f"Successfully stitched evolution data into {skill_md_path}")
        return True
        
    except Exception as e:
        logging.error(f"An unexpected error occurred during stitching: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python smart_stitch.py <skill_dir>")
        sys.exit(1)
        
    target_dir = sys.argv[1]
    stitch_skill(target_dir)
