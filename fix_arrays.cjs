const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(/works:\s*\[[\s,]*\]/g, 'works: []');

fs.writeFileSync('src/data.ts', data);
