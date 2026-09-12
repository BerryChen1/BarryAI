const fs = require('fs');
let data = fs.readFileSync('src/components/Vid13Detail.tsx', 'utf8');

// Replace "动态场景视频生成" -> "片段展示"
data = data.replace(/第一部分：动态场景视频生成/g, '第一部分：片段展示');
data = data.replace(/动态场景视频生成/g, '片段展示');

// Find indices
const block1Start = data.indexOf('      {/* 自媒体收获 / MEDIA ACHIEVEMENTS */}');
const block2Start = data.indexOf('      {/* 第一部分：片段展示 */}');
const block3Start = data.indexOf('      {/* 第二部分：角色资产升维与场景锚定 */}');

if (block1Start !== -1 && block2Start !== -1 && block3Start !== -1) {
  let block1 = data.substring(block1Start, block2Start);
  let block2 = data.substring(block2Start, block3Start);
  
  // They might have extra padding or trailing spaces. Let's just swap them perfectly.
  const before = data.substring(0, block1Start);
  const after = data.substring(block3Start);
  
  // Wait, right now block2 starts with "      {/* 第一部分：片段展示 */}" and has some spacing.
  // block1 starts with "      {/* 自媒体收获..."
  // If we just do before + block2 + block1 + after, it will swap them.
  const newData = before + block2 + block1 + after;
  fs.writeFileSync('src/components/Vid13Detail.tsx', newData);
  console.log("Vid13Detail updated");
} else {
  console.log("Could not find block boundaries in Vid13Detail.tsx");
}

