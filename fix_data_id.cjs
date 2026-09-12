const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// The newly inserted project has id: "brand-1", but the chillax one also has id: "brand-1"
// Let's change the newly inserted one to "brand-xuanye"
const oldId = 'id: "brand-1",\n        title: "玄夜引渡 · 主视觉设计",';
const newId = 'id: "brand-xuanye",\n        title: "玄夜引渡 · 主视觉设计",';

data = data.replace(oldId, newId);

fs.writeFileSync('src/data.ts', data);
