const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the Features block completely
const featuresRegex = /\s*\{\/\* Features \*\/\}\s*\{PORTFOLIO_DETAILS\[0\]\.features && \([\s\S]*?\}\)\}\s*/;
data = data.replace(featuresRegex, '\n');

// 2. Extract Achievements block
const achievementsRegex = /\s*\{\/\* Achievements Gallery \*\/\}\s*\{PORTFOLIO_DETAILS\[0\]\.achievements && \([\s\S]*?\}\)\}\s*(?=<\/div>\s*\}\)\s*\{\/\* Render the legacy detailed components \*\/)/;
const match = data.match(achievementsRegex);
if (match) {
  const achievementsBlock = match[0];
  // Remove from old place
  data = data.replace(achievementsRegex, '\n');
  
  // Find where to insert (after Stats block)
  const statsRegex = /(\{\/\* Stats \*\/\}\s*\{PORTFOLIO_DETAILS\[0\]\.stats && \([\s\S]*?\}\)\})/;
  
  // In the achievements block, remove "mt-16" so it doesn't have a huge top margin, since it's replacing features, maybe keep "mb-12" or similar. Actually let's just insert it and keep mt-16 or change to mb-16. Let's keep it as is first.
  data = data.replace(statsRegex, `$1\n\n${achievementsBlock}\n\n`);
}

fs.writeFileSync('src/App.tsx', data);
