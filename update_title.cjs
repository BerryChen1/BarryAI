const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(
  'title: "玄夜引渡 · 主视觉设计",\n        subtitle: "Key Visual Design Specification",',
  'title: "《玄夜·引渡》东方视觉",\n        subtitle: "玄夜·引渡：东方异志概念视觉",'
);

fs.writeFileSync('src/data.ts', data);
console.log("Success");
