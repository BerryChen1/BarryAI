const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(
  'coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184251573.webp",',
  'coverImage: "/images/20260912184251573.webp",'
);

fs.writeFileSync('src/data.ts', data);
