const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                {selectedProject.id === 'brand-1' ? (
                  <ChillaxCampaignDetail language={language} t={t} setLightboxState={(state) => setLightboxState(state)} gallery={selectedProject.gallery || []} />`;

const newStr = `                {selectedProject.customHtml ? (
                  <div className="w-full bg-black min-h-screen -mt-24 -mx-6 px-6 sm:-mx-0 sm:px-0">
                    <iframe src={selectedProject.customHtml} className="w-full h-screen border-none bg-black" title={selectedProject.title} style={{ minHeight: '100vh' }} />
                  </div>
                ) : selectedProject.id === 'brand-1' ? (
                  <ChillaxCampaignDetail language={language} t={t} setLightboxState={(state) => setLightboxState(state)} gallery={selectedProject.gallery || []} />`;

data = data.replace(targetStr, newStr);

fs.writeFileSync('src/App.tsx', data);
