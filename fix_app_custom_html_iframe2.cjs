const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                {selectedProject.customHtml ? (
                  <div className="w-[calc(100%+3rem)] -ml-6 -mt-24 min-h-[100dvh]">
                    <iframe src={selectedProject.customHtml} className="w-full h-[100dvh] border-none bg-[#0a0b0f] block" title={selectedProject.title} />
                  </div>
                ) : selectedProject.id === 'brand-1' ? (`;

const newStr = `                {selectedProject.customHtml ? (
                  <div className="fixed inset-0 z-[160] bg-[#0a0b0f] w-screen h-[100dvh] overflow-hidden">
                    <iframe src={selectedProject.customHtml} className="w-full h-full border-none" title={selectedProject.title} />
                  </div>
                ) : selectedProject.id === 'brand-1' ? (`;

data = data.replace(targetStr, newStr);

fs.writeFileSync('src/App.tsx', data);
