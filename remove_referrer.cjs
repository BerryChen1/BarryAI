const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

data = data.replace(/referrerPolicy="no-referrer"/g, '');

fs.writeFileSync('src/App.tsx', data);
