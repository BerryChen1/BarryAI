const fs = require('fs');
let data = fs.readFileSync('public/xuanye.html', 'utf8');

const regex = /<div class="ph-block reveal">\s*<div class="ph-label">Position B · Mood Portrait<\/div>[\s\S]*?<\/div>\s*<\/div>/;

const newBlock = `<div class="ph-block reveal">
      <div class="ph-label">Position B · Mood Portrait</div>
      <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912190045556.webp" alt="新增顶图" style="width:100%;display:block;border:1px solid rgba(200,164,92,.18);margin-bottom:20px;">
      <div style="display:flex; justify-content:center; gap:20px;">
        <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184325915.webp" alt="图3" style="width:100%;max-width:420px;object-fit:cover;display:block;border:1px solid rgba(200,164,92,.18)">
        <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184337215.webp" alt="图4新加" style="width:100%;max-width:420px;object-fit:cover;display:block;border:1px solid rgba(200,164,92,.18)">
      </div>
    </div>`;

if (data.match(regex)) {
  data = data.replace(regex, newBlock);
  fs.writeFileSync('public/xuanye.html', data);
  console.log("Replaced successfully.");
} else {
  console.log("Regex did not match.");
}
