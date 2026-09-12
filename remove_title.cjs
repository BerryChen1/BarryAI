const fs = require('fs');
let data = fs.readFileSync('src/components/Vid13Detail.tsx', 'utf8');

data = data.replace(/      \{\/\* Title Header \*\/\}\n      <div className="flex items-center gap-2\.5 border-b border-white\/10 pb-3">\n        <span className="w-2\.5 h-2\.5 rounded-full bg-sky-300 animate-pulse" \/>\n        <h2 className="text-base sm:text-lg md:text-xl uppercase tracking-\[0\.2em\] font-bold text-zinc-100">\n          AIGC 3D写实动画短片\n        <\/h2>\n      <\/div>\n/g, '');

fs.writeFileSync('src/components/Vid13Detail.tsx', data);
console.log("Title removed");
