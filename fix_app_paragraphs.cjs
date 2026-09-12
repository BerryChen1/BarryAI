const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* Paragraphs \*\/\}[\s\S]*?<\/div>/;

data = data.replace(regex, `{/* Paragraphs */}
                    {PORTFOLIO_DETAILS[0].paragraphs && PORTFOLIO_DETAILS[0].paragraphs.length > 0 && (
                      <div className="flex flex-col gap-6 text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                        {(language === 'zh' ? PORTFOLIO_DETAILS[0].paragraphs : PORTFOLIO_DETAILS[0].enParagraphs)?.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}`);

fs.writeFileSync('src/App.tsx', data);
