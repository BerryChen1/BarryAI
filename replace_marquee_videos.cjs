const fs = require('fs');

let tsx = fs.readFileSync('src/App.tsx', 'utf8');

// The replacement logic:
// We know these specific line sections (roughly 199-310) contain the marquee videos.
// We will replace them in order by doing a careful regex or split.

const oldUrls = [
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/1.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/3.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/7.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/4.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/5.mp4"
];

const newUrls = [
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/1.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/3.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/6.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/4.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/5.mp4"
];

// In App.tsx, the videos are duplicated in two groups for the infinite scroll.
// We must replace only the ones in the marquee context (using the `<video src="` pattern).
// Let's locate the block for the first marquee strip
let lines = tsx.split('\n');
let replacedCount = 0;

for (let i = 0; i < lines.length; i++) {
    // Only target the <video> tags in the specific lines (190 to 320)
    if (i >= 190 && i <= 320) {
        if (lines[i].includes('<video src="')) {
            // Find which old URL is in this line
            for (let j = 0; j < oldUrls.length; j++) {
                if (lines[i].includes(oldUrls[j])) {
                    lines[i] = lines[i].replace(oldUrls[j], newUrls[j]);
                    replacedCount++;
                    break;
                }
            }
        }
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log(`Replaced ${replacedCount} video URLs in marquee.`);
