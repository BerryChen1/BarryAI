const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replaceAll(
  'logo: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912221058080.webp"',
  'logo: "/images/20260912221058080.webp"'
);

data = data.replaceAll(
  'logo: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912221110123.webp"',
  'logo: "/images/20260912221110123.webp"'
);

fs.writeFileSync('src/data.ts', data);
console.log("Updated data.ts to use local images.");
