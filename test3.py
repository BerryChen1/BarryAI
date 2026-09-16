with open('src/components/Vid1Detail.tsx', 'r') as f:
    text = f.read()

lines = text.split('\n')
lines.insert(355, '      </div>')

with open('src/components/Vid1Detail.tsx', 'w') as f:
    f.write('\n'.join(lines))
