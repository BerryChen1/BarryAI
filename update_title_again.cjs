const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const targetStr = `        id: "brand-xuanye",
        title: "《玄夜·引渡》东方视觉",
        subtitle: "玄夜·引渡：东方异志概念视觉",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184251573.webp",`;

const newStr = `        id: "brand-xuanye",
        title: "玄夜·引渡:东方异志概念视觉",
        subtitle: "阴阳交生，引渡魂灵越幽冥而归澄明。",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184251573.webp",`;

data = data.replace(targetStr, newStr);

fs.writeFileSync('src/data.ts', data);
console.log("Success");
