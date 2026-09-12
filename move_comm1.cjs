const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Find comm-1
const comm1Start = data.indexOf('      {\n        id: "comm-1",');
const comm2Start = data.indexOf('      {\n        id: "comm-2",');

if (comm1Start === -1 || comm2Start === -1) {
  console.log("Could not find comm-1 or comm-2");
  process.exit(1);
}

// Extract comm-1 block (including the leading spaces and the trailing comma if it exists)
let comm1Block = data.substring(comm1Start, comm2Start);

// Remove comm-1 from its original place
data = data.substring(0, comm1Start) + data.substring(comm2Start);

// Find the insertion point in the "other" category.
// We want to insert it after the 2nd item in "other".
// "other" starts here:
const otherStart = data.indexOf('id: "other"');
const otherProjectsStart = data.indexOf('projects: [', otherStart);

// Item 1: brand-xuanye
const item1Start = data.indexOf('      {\n        id: "brand-xuanye",', otherProjectsStart);
// Item 2: oth-2
const item2Start = data.indexOf('      {\n        id: "oth-2",', item1Start);
// Item 3: brand-wukong (this is where we should insert before)
const item3Start = data.indexOf('      {\n        id: "brand-wukong",', item2Start);

if (item3Start === -1) {
  console.log("Could not find item 3 insertion point");
  process.exit(1);
}

// Insert comm1Block before item3Start
data = data.substring(0, item3Start) + comm1Block + data.substring(item3Start);

fs.writeFileSync('src/data.ts', data);
console.log("Moved successfully.");

