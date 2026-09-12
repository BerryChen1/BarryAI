const fs = require('fs');
let data = fs.readFileSync('public/xuanye.html', 'utf8');

// 1. "Through light comes clarity, through darkness comes divining." 到下一行
data = data.replace(
  'Through <b>light</b> comes clarity, through <b>darkness</b> comes divining.<br>\n      阴阳交生，引渡魂灵越幽冥而归澄明。',
  'Through <b>light</b> comes clarity,<br>through <b>darkness</b> comes divining.<br>\n      阴阳交生，引渡魂灵越幽冥而归澄明。'
);

// 2. Position B · Mood Portrait 增加图片
const posBRegex = /<div class="ph-block reveal">\s*<div class="ph-label">Position B · Mood Portrait<\/div>\s*<img src="https:\/\/cdn\.jsdelivr\.net\/gh\/BerryChen1\/img-bed\/images\/20260912184325915\.webp" alt="图3" style="width:100%;max-width:420px;display:block;border:1px solid rgba\(200,164,92,\.18\)">\s*<\/div>/;

const newPosB = `<div class="ph-block reveal">
      <div class="ph-label">Position B · Mood Portrait</div>
      <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912190045556.webp" alt="新增顶图" style="width:100%;display:block;border:1px solid rgba(200,164,92,.18);margin-bottom:20px;">
      <div style="display:flex; gap:20px;">
        <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184325915.webp" alt="图3" style="width:100%;flex:1;object-fit:cover;display:block;border:1px solid rgba(200,164,92,.18)">
        <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184337215.webp" alt="图4新加" style="width:100%;flex:1;object-fit:cover;display:block;border:1px solid rgba(200,164,92,.18)">
      </div>
    </div>`;

data = data.replace(posBRegex, newPosB);

// 3. 删掉 Position D 
const posDRegex = /<div class="ph-block reveal">\s*<div class="ph-label">Position D · Composition Reference<\/div>\s*<img src="https:\/\/cdn\.jsdelivr\.net\/gh\/BerryChen1\/img-bed\/images\/20260912184313786\.webp"[^>]*>\s*<\/div>/;
data = data.replace(posDRegex, '');

// 4. 删掉 Position E
const posERegex = /<div class="ph-block reveal">\s*<div class="ph-label">Position E · Poster Variation<\/div>\s*<img src="https:\/\/cdn\.jsdelivr\.net\/gh\/BerryChen1\/img-bed\/images\/20260912184337215\.webp"[^>]*>\s*<\/div>/;
data = data.replace(posERegex, '');

fs.writeFileSync('public/xuanye.html', data);
