with open('src/components/Vid1Detail.tsx', 'r') as f:
    text = f.read()

def check_tags(text):
    stack = []
    lines = text.split('\n')
    for i, line in enumerate(lines):
        for part in line.split('<'):
            if part.startswith('/'):
                tag = part[1:].split('>')[0].strip()
                if not stack:
                    print(f"Error at line {i+1}: Closing tag {tag} without opening tag")
                elif stack[-1] == tag:
                    stack.pop()
                elif tag in ['div', 'span', 'p', 'h2', 'h3']:
                    print(f"Error at line {i+1}: Expected {stack[-1]}, found {tag}")
                    stack.pop()
            elif '>' in part:
                tag = part.split()[0].split('>')[0].strip()
                if not tag.endswith('/') and tag not in ['img', 'br', 'hr', 'input', 'meta', 'link', 'CustomVideoPlayer', '']:
                    stack.append(tag)

check_tags(text)
