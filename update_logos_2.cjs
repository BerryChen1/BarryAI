const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replaceAll(
  'logo: "/images/20260912221058080.webp"',
  'logo: "/images/20260912222402001.webp"'
);

data = data.replaceAll(
  'logo: "/images/20260912221110123.webp"',
  'logo: "/images/20260912222413550.webp"'
);

fs.writeFileSync('src/data.ts', data);
console.log("Updated data.ts to use new local images.");
