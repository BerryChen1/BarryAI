const fs = require('fs');
let data = fs.readFileSync('src/types.ts', 'utf8');

data = data.replace(/gallery\?: string\[\];/, 'gallery?: string[];\n  customHtml?: string;');

fs.writeFileSync('src/types.ts', data);
