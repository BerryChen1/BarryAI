with open('src/components/Vid1Detail.tsx', 'r') as f:
    text = f.read()

divs = text.count('<div')
enddivs = text.count('</div')
print("divs:", divs, "enddivs:", enddivs)
