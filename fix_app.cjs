const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = '<img src={exp.detail.coverImage} alt={exp.detail.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />';

const newStr = `{/* @ts-ignore */}
                  {exp.detail.logo ? (
                    <img src={(exp.detail as any).logo} alt={exp.detail.title} className="w-14 h-14 object-contain opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
                  ) : (
                    <img src={exp.detail.coverImage} alt={exp.detail.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                  )}`;

app = app.replace(targetStr, newStr);

// Also remove border if it's a logo
app = app.replace(
  'className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5 group-hover:border-white/20 transition-colors mt-1"',
  'className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-colors mt-1 flex items-center justify-center ${' + "(!('logo' in exp.detail) ? 'border border-white/5 group-hover:border-white/20' : 'bg-white/5 group-hover:bg-white/10')}" + '`}'
);

fs.writeFileSync('src/App.tsx', app);
console.log("Updated App.tsx");
