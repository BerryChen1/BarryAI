const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const newProject = `      {
        id: "brand-1",
        title: "玄夜引渡 · 主视觉设计",
        subtitle: "Key Visual Design Specification",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260912184251573.webp",
        tags: ["主视觉设计", "东方玄幻", "暗黑国风"],
        tools: ["HTML5", "CSS3", "Design Specification"],
        client: "玄夜引渡",
        role: "创意视觉主指导",
        description: "“阴阳交生，引渡魂灵越幽冥而归澄明。”",
        story: [
          "整幅画面以「引渡」为叙事内核——一位持鎏金香球的国风女子隐于玄夜之中，以香为媒，沟通幽明两界。设计上刻意压暗环境、聚光于面部与双手，营造出一种近乎宗教仪式的凝视感。",
          "色彩以玄黑为底奠定深邃与神秘，朱砂点睛承载生命与祭祀之意，鎏金铺陈华贵与器物质感，青碧幽焰作为超自然的灵性符号，四色互为阴阳、彼此制衡。"
        ],
        customHtml: "/xuanye.html"
      },
`;

// Insert the new project at the beginning of the "品牌运营作品" (BRAND & OPERATIONS) projects array
const insertMarker = 'englishName: "BRAND & OPERATIONS",\n    desc: "探索性创意产品实验，打造差异化品牌 IP创意设计与视觉识别体系，实现商业运营与持续价值增长。",\n    enDesc: "Exploratory creative product experiments crafting unique brand IP & visual identities for business operations & sustainable growth.",\n    projects: [\n';

if (data.includes(insertMarker)) {
  data = data.replace(insertMarker, insertMarker + newProject);
  fs.writeFileSync('src/data.ts', data);
  console.log('Success');
} else {
  console.error('Marker not found');
}
