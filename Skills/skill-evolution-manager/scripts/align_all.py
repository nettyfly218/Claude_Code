import os
import sys
import subprocess

def find_skills_dir():
    """
    Auto-detects the skills directory.
    Priorities:
    1. User provided argument (handled by caller)
    2. ~/.claude/skills (Standard location)
    3. Relative to this script (Development/Portable mode)
    """
    # Priority 2: Standard Claude location
    default_path = os.path.expanduser("~/.claude/skills")
    if os.path.isdir(default_path):
        return default_path
        
    # Priority 3: Relative to this script 
    # Assumption: script is in .../Skills/skill-evolution-manager/scripts/
    # We want .../Skills/
    candidate = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    if os.path.isdir(candidate) and os.path.basename(candidate).lower() == "skills":
        return candidate
        
    return None

def align_all(skills_root):
    if not skills_root or not os.path.exists(skills_root):
        print(f"Error: Skills directory '{skills_root}' not found.")
        return

    stitch_script = os.path.join(os.path.dirname(__file__), "smart_stitch.py")
    
    print(f"Scanning skills in: {skills_root}")
    count = 0
    # List all directories in skills_root
    try:
        items = os.listdir(skills_root)
    except Exception as e:
        print(f"Error accessing skills directory: {e}")
        return

    for item in items:
        skill_dir = os.path.join(skills_root, item)
        if not os.path.isdir(skill_dir):
            continue
            
        evolution_json = os.path.join(skill_dir, "evolution.json")
        if os.path.exists(evolution_json):
            print(f"Aligning {item}...")
            # Run the smart_stitch script for this skill
            try:
                subprocess.run([sys.executable, stitch_script, skill_dir], check=True)
                count += 1
            except subprocess.CalledProcessError as e:
                print(f"Failed to align {item}: {e}")
            except Exception as e:
                print(f"Error running stitch script for {item}: {e}")
            
    print(f"\nFinished. Aligned {count} skills.")

if __name__ == "__main__":
    skills_path = None
    if len(sys.argv) > 1:
        skills_path = sys.argv[1]
    
    if not skills_path:
        skills_path = find_skills_dir()
        
    if not skills_path:
        print("Error: Could not detect skills directory. Please provide it as an argument.")
        sys.exit(1)
        
    align_all(skills_path)
