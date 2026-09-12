const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Replace 1
data = data.replace(
  'subtitle: "新零售视觉与IP孵化",', 
  'subtitle: "AIGC 驱动下的复合新零售视觉与 IP 孵化企划",'
);

// Replace 2
data = data.replace(
  'subtitle: "adidas × 国潮大圣 视觉企划",', 
  'subtitle: "adidas × 国潮大圣 限时快闪视觉企划",'
);

fs.writeFileSync('src/data.ts', data);
console.log("Subtitles updated again.");
