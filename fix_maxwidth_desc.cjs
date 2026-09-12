const fs = require('fs');
let data = fs.readFileSync('public/xuanye.html', 'utf8');

// 修改 .sec-desc 的 max-width 限制
data = data.replace('max-width:60ch;', 'max-width:100%;');

fs.writeFileSync('public/xuanye.html', data);
