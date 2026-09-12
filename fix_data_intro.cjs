const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Remove innerBgImage from the first object
data = data.replace('innerBgImage: "/images/20260623220043652.webp",', '');

// Remove the features array
data = data.replace(/features:\s*\[[\s\S]*?\]\s*,/g, '');

fs.writeFileSync('src/data.ts', data);
