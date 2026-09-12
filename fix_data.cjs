const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(
  'title: "字节跳动·TikTok-Design(北京)",',
  'logo: "/images/20260912213722812.webp",\n    title: "字节跳动·TikTok-Design(北京)",'
);

data = data.replace(
  'title: "字节跳动·TikTok Shop(上海)",',
  'logo: "/images/20260912213722812.webp",\n    title: "字节跳动·TikTok Shop(上海)",'
);

data = data.replace(
  'title: "腾讯·IEG国内发行线(深圳)",',
  'logo: "/images/20260912213746387.webp",\n    title: "腾讯·IEG国内发行线(深圳)",'
);

fs.writeFileSync('src/data.ts', data);
console.log("Updated data.ts");
