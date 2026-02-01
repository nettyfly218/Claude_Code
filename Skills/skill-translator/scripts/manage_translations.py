import os
import re
import sys
import json
import argparse

def is_chinese(string):
    """Check if a string contains Chinese characters."""
    if not string:
        return False
    for char in string:
        if '\u4e00' <= char <= '\u9fa5':
            return True
    return False

def parse_front_matter(file_path):
    """Parse the YAML front matter of a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return None

    # Match YAML front matter between ---
    match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return None

    yaml_content = match.group(1)
    data = {}

    # Simple line-based parser
    for line in yaml_content.split('\n'):
        line = line.strip()
        if ':' in line:
            key, value = line.split(':', 1)
            data[key.strip()] = value.strip()

    return {'data': data, 'content': content, 'file_path': file_path}

def scan_skills(dirs):
    skills = []
    for d in dirs:
        if not os.path.exists(d):
            continue

        for root, _, files in os.walk(d):
            if 'SKILL.md' in files:
                file_path = os.path.join(root, 'SKILL.md')
                info = parse_front_matter(file_path)
                if info and 'name' in info['data']:
                    name = info['data'].get('name', '')
                    description = info['data'].get('description', '')

                    # Check if translation is needed
                    needs_translation = not (is_chinese(name) and is_chinese(description))

                    skills.append({
                        'file_path': file_path,
                        'name': name,
                        'description': description,
                        'needs_translation': needs_translation
                    })
    return skills

def update_skill(file_path, new_name, new_description):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to replace name and description in YAML front matter
        # We need to be careful to only replace inside the first --- block

        # Split by the second ---
        parts = re.split(r'^---$', content, maxsplit=2, flags=re.MULTILINE)
        if len(parts) < 3:
            return False, "Invalid Front Matter format"

        front_matter = parts[1]
        body = parts[2]

        # Replace name
        if new_name:
            front_matter = re.sub(r'(^|\n)name:.*', f'\\1name: {new_name}', front_matter)

        # Replace description
        if new_description:
            front_matter = re.sub(r'(^|\n)description:.*', f'\\1description: {new_description}', front_matter)

        new_content = f"---{front_matter}---{body}"

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, "Success"
    except Exception as e:
        return False, str(e)

def main():
    parser = argparse.ArgumentParser(description='Manage Skill translations')
    subparsers = parser.add_subparsers(dest='command')

    # List command
    list_parser = subparsers.add_parser('list')
    list_parser.add_argument('--dirs', nargs='+', default=['Skills', os.path.expanduser('~/.claude/skills')])

    # Update command
    update_parser = subparsers.add_parser('update')
    update_parser.add_argument('file_path', help='Path to SKILL.md')
    update_parser.add_argument('--name', help='New name with Chinese')
    update_parser.add_argument('--description', help='New Chinese description')

    args = parser.parse_args()

    if args.command == 'list':
        # Expand user path manually if needed (though shell usually does it, python needs help if passed as string literal in list default)
        dirs = [os.path.expanduser(d) for d in args.dirs]
        skills = scan_skills(dirs)
        print(json.dumps(skills, ensure_ascii=False, indent=2))

    elif args.command == 'update':
        if not os.path.exists(args.file_path):
            print(f"Error: File not found {args.file_path}")
            sys.exit(1)

        success, msg = update_skill(args.file_path, args.name, args.description)
        if success:
            print(f"Successfully updated {args.file_path}")
        else:
            print(f"Failed to update {args.file_path}: {msg}")
            sys.exit(1)

if __name__ == "__main__":
    main()
