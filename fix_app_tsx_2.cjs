const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

const targetBlock = `                {/* Render Personal Intro Details (Index 0) */}
                {selectedExperienceIndex === 0 && (
                  <div className="flex flex-col gap-12">
                    {/* Paragraphs */}
                    <div className="flex flex-col gap-6 text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                      {(language === 'zh' ? PORTFOLIO_DETAILS[0].paragraphs : PORTFOLIO_DETAILS[0].enParagraphs)?.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {/* Stats */}
                    {PORTFOLIO_DETAILS[0].stats && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/10 my-8">
                        {PORTFOLIO_DETAILS[0].stats.map((stat, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <span className="text-zinc-500 text-sm tracking-widest uppercase">{language === 'zh' ? stat.label : stat.enLabel}</span>
                            <span className="text-white text-xl font-medium">{language === 'zh' ? stat.value : stat.enValue}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievements Gallery (Moved Above Awards/Projects) */}
                    {PORTFOLIO_DETAILS[0].achievements && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-widest">
                          {language === 'zh' ? PORTFOLIO_DETAILS[0].achievementsTitle : PORTFOLIO_DETAILS[0].achievementsEnTitle}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          {PORTFOLIO_DETAILS[0].achievements.map((img, i) => (
                            <div key={i} className="aspect-square bg-zinc-900 rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: PORTFOLIO_DETAILS[0].achievements!, index: i})}>
                              <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            </div>
                          ))}
                        </div>
                        {PORTFOLIO_DETAILS[0].achievementsRow2 && (
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                            {PORTFOLIO_DETAILS[0].achievementsRow2.map((img, i) => (
                              <div key={i} className="aspect-square bg-zinc-900 rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: PORTFOLIO_DETAILS[0].achievementsRow2!, index: i})}>
                                <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                              </div>
                            ))}
                          </div>
                        )}
                        {PORTFOLIO_DETAILS[0].largeAchievementImage && (
                          <div className="w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: [PORTFOLIO_DETAILS[0].largeAchievementImage!], index: 0})}>
                             <img src={PORTFOLIO_DETAILS[0].largeAchievementImage} className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-700" />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Awards */}
                      {PORTFOLIO_DETAILS[0].awards && (
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            {language === 'zh' ? PORTFOLIO_DETAILS[0].section1Title : PORTFOLIO_DETAILS[0].section1EnTitle}
                          </h3>
                          <ul className="flex flex-col gap-4">
                            {(language === 'zh' ? PORTFOLIO_DETAILS[0].awards : PORTFOLIO_DETAILS[0].enAwards)?.map((award, i) => (
                              <li key={i} className="text-zinc-400 text-sm md:text-base flex items-start gap-3">
                                <span className="text-zinc-600 mt-1">/</span> {award}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Projects */}
                      {PORTFOLIO_DETAILS[0].projects && (
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            {language === 'zh' ? PORTFOLIO_DETAILS[0].section2Title : PORTFOLIO_DETAILS[0].section2EnTitle}
                          </h3>
                          <ul className="flex flex-col gap-4">
                            {(language === 'zh' ? PORTFOLIO_DETAILS[0].projects : PORTFOLIO_DETAILS[0].enProjects)?.map((proj, i) => (
                              <li key={i} className="text-zinc-400 text-sm md:text-base flex items-start gap-3">
                                <span className="text-zinc-600 mt-1">/</span> {proj}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}`;

// We need to replace from line 712 to 762 in the file with targetBlock
const lines = data.split('\n');
const startIdx = lines.findIndex(l => l.includes('{/* Render Personal Intro Details (Index 0) */}'));
const endIdx = lines.findIndex(l => l.includes('{/* Render the legacy detailed components */}'));

if (startIdx !== -1 && endIdx !== -1) {
    const newLines = [
        ...lines.slice(0, startIdx),
        targetBlock,
        ...lines.slice(endIdx)
    ];
    fs.writeFileSync('src/App.tsx', newLines.join('\n'));
} else {
    console.error('Could not find start/end indices');
}

