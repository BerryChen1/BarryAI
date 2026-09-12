const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// 1. Rename the label in the "other" category
data = data.replace(
  'name: "品牌运营作品",\n    englishName: "BRAND & OPERATIONS",',
  'name: "商业视觉作品",\n    englishName: "COMMERCIAL VISUALS",'
);

// We need to parse CATALOG_PORTFOLIO_DATA or manually split
// Using a simple split by "id: " is risky. Let's use ast or carefully slice it by regex

// Since it's a JS object, we can actually require typescript and transpile, 
// OR just find the indices using indexOf.

const idxVideo = data.indexOf('  {\n    id: "video"');
const idxIllustration = data.indexOf('  {\n    id: "illustration"');
const idxOther = data.indexOf('  {\n    id: "other"');
const idxEnd = data.lastIndexOf('];');

if (idxVideo !== -1 && idxIllustration !== -1 && idxOther !== -1 && idxEnd !== -1) {
  const beforeVideo = data.substring(0, idxIllustration);
  let strIllustration = data.substring(idxIllustration, idxOther);
  let strOther = data.substring(idxOther, idxEnd);
  const afterEnd = data.substring(idxEnd);

  // We also need to swap their index fields so they appear correctly?
  // User just asked to swap positions. Usually index: "02" vs index: "03" is what renders the number.
  // Let's swap the "index: "02"" and "index: "03"" inside the strings.
  
  strIllustration = strIllustration.replace('index: "02"', 'index: "03"');
  strOther = strOther.replace('index: "03"', 'index: "02"');

  // Since strOther has no comma at the end, and strIllustration has a comma, we need to handle that.
  // strIllustration ends with "    ]\n  },\n"
  // strOther ends with "    ]\n  }\n"
  
  // Make strOther end with comma
  strOther = strOther.trimEnd() + ",\n";
  
  // Remove comma from strIllustration
  if (strIllustration.trimEnd().endsWith(',')) {
    strIllustration = strIllustration.trimEnd().slice(0, -1) + "\n";
  }

  const newData = beforeVideo + strOther + strIllustration + afterEnd;
  fs.writeFileSync('src/data.ts', newData);
  console.log("Success");
} else {
  console.log("Could not find indices");
}

