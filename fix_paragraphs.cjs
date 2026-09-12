const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(/paragraphs:\s*\[[\s\S]*?\],\s*enParagraphs:\s*\[[\s\S]*?\],/, 'paragraphs: [],\n    enParagraphs: [],');

fs.writeFileSync('src/data.ts', data);
