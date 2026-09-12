const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

// There are two identical blocks, one starts around line 246 and one around 309.
// They both look like:
// <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('comm-4')}>
// <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/6.mp4" ...

data = data.replace(
  /<div className="w-full h-full relative overflow-hidden group\/vid bg-\[#0A0A0A\] cursor-pointer" onClick=\{\(\) => openProjectById\('comm-4'\)\}>\s*<video src="https:\/\/pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev\/shouye\/6.mp4"/g,
  '<div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById(\'brand-xuanye\')}>\n            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/7.mp4"'
);

fs.writeFileSync('src/App.tsx', data);
