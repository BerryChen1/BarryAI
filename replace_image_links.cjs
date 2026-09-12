const fs = require('fs');

// Replace in xuanye.html
let html = fs.readFileSync('public/xuanye.html', 'utf8');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/gh\/BerryChen1\/img-bed\/images\//g, '/images/');
fs.writeFileSync('public/xuanye.html', html);

// Replace in TencentIEGDetail.tsx
let tsx = fs.readFileSync('src/components/TencentIEGDetail.tsx', 'utf8');
tsx = tsx.replace(
  '"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"',
  '"/images/tencent_anton.jpg"'
);
tsx = tsx.replace(
  '"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600"',
  '"/images/tencent_volcano.jpg"'
);
fs.writeFileSync('src/components/TencentIEGDetail.tsx', tsx);
console.log("Updated links to use local images.");
