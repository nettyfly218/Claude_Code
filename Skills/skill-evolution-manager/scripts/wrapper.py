import argparse
import sys
import os

# Ensure we can import sibling scripts
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

try:
    import align_all
    import merge_evolution
    import smart_stitch
except ImportError as e:
    print(f"Error importing required modules: {e}")
    sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Skill Evolution Manager Wrapper")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command: align
    # Runs align_all.py. Optional argument: skills_dir
    align_parser = subparsers.add_parser("align", help="Align all skills by stitching evolution data into SKILL.md")
    align_parser.add_argument("skills_dir", nargs="?", help="Path to skills directory (optional, auto-detected if not provided)")

    # Command: merge
    # Runs merge_evolution.py. Args: skill_dir, json_data
    merge_parser = subparsers.add_parser("merge", help="Merge new evolution data into a skill's evolution.json")
    merge_parser.add_argument("skill_dir", help="Target skill directory")
    merge_parser.add_argument("json_data", help="JSON string containing new data")

    # Command: stitch
    # Runs smart_stitch.py. Args: skill_dir
    stitch_parser = subparsers.add_parser("stitch", help="Stitch evolution.json data into SKILL.md")
    stitch_parser.add_argument("skill_dir", help="Target skill directory")

    args = parser.parse_args()

    if args.command == "align":
        skills_path = args.skills_dir
        if not skills_path:
            skills_path = align_all.find_skills_dir()
        
        if not skills_path:
            print("Error: Could not detect skills directory. Please provide it as an argument.")
            sys.exit(1)
            
        align_all.align_all(skills_path)

    elif args.command == "merge":
        merge_evolution.merge_evolution(args.skill_dir, args.json_data)

    elif args.command == "stitch":
        smart_stitch.stitch_skill(args.skill_dir)

    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
