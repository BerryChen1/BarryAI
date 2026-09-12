const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// 1. 赛博朋克AIGC动画短片 -> “死亡不是我们的终点，遗忘才是”
data = data.replace(/subtitle: "赛博朋克AIGC动画短片"/g, 'subtitle: "“死亡不是我们的终点，遗忘才是”"');

// 2. AIGC全流程3D动画短片 -> “走，我们一起打回英灵殿！”
data = data.replace(/subtitle: "AIGC全流程3D动画短片"/g, 'subtitle: "“走，我们一起打回英灵殿！”"');

// 3. AIGC散文影像集 -> “原子不会湮灭，我们终将再次相遇”
data = data.replace(/subtitle: "AIGC散文影像集"/g, 'subtitle: "“原子不会湮灭，我们终将再次相遇”"');

// 4. AIGC未来叙事短片 -> “你会温和的走入那一夜吗?"
data = data.replace(/subtitle: "AIGC未来叙事短片"/g, 'subtitle: "“你会温和的走入那一夜吗?”"'); // Used fullwidth question mark for consistency or just what user typed

// 5. ODDITY CLUB 2037 ...
data = data.replace(/subtitle: "ODDITY CLUB 2037 怪奇研究所：AIGC 驱动下的复合新零售视觉与 IP 孵化企划"/g, 'subtitle: "新零售视觉与IP孵化"');

// 6. 《地下城与勇士：起源》马年春节主题视觉 (comm-1) subtitle
data = data.replace(/subtitle: "千万级流量新媒体平台的 AIGC 视觉体系升级与资产设计"/g, 'subtitle: "“唐纹承岁，侠启新春”"');

// 7. WUKONG'S 24H
data = data.replace(/subtitle: "WUKONG'S 24H：adidas × 国潮大圣 限时快闪视觉企划"/g, 'subtitle: "adidas × 国潮大圣 视觉企划"');

// 8. LIVE FREELY 2033
data = data.replace(/subtitle: "LIVE FREELY 2033 地球慵懒节：AIGC 情绪营销 Campaign 视觉企划"/g, 'subtitle: "“给地球放个假吧！”"');

// 9. 青岛珍稀手艺贝雕
data = data.replace(/subtitle: "青岛珍稀手艺贝雕与国风刺绣的现代化平面重组全案"/g, 'subtitle: "“守护流浪猫的明天”"');

// 10. 极高质量微观金属
data = data.replace(/subtitle: "极高质量微观金属、玻璃材质演替渲染"/g, 'subtitle: "山东工艺美术学院研究生学会AIGC卡通IP形象“究究”"');

// 11. 潮流沙龙三维动态招贴
data = data.replace(/subtitle: "潮流沙龙三维动态招贴、偏光字体与网页前端视觉"/g, 'subtitle: "“一城豫园古韵，一盒梨膏留香”"');

// 12. 基于即梦三维
data = data.replace(/subtitle: "基于即梦三维重组算法的硬核国风机甲大片"/g, 'subtitle: "“五音共振·傩韵新声”"');

// 13. 线上艺术主题展演主KV
data = data.replace(/subtitle: "线上艺术主题展演主KV及全案动态预热视觉"/g, 'subtitle: "“六星齐聚，戏说南斗；星行有道，凡心可通。”"');

// 14. 汉服美学与几何超现实
data = data.replace(/subtitle: "汉服美学与几何超现实流体时装画卷"/g, 'subtitle: "“集合！决战安图恩”"');

// 15. 多色温高强反差
data = data.replace(/subtitle: "多色温高强反差大色块情感构成画集"/g, 'subtitle: "“开吃啦！野餐日”复古橡胶软管卡通插画"');

fs.writeFileSync('src/data.ts', data);
console.log("Subtitles updated");
