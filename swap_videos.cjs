const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf8');

// Replace 5.mp4 with a temporary placeholder
data = data.replace(/openProjectById\('comm-3'\)\}>\s*<video src="https:\/\/pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev\/shouye\/5.mp4"/g, 'openProjectById(\'__TEMP__\')}>\n            <video src="__TEMP__.mp4"');

// Replace 7.mp4 with 5.mp4 and comm-3
data = data.replace(/openProjectById\('brand-xuanye'\)\}>\s*<video src="https:\/\/pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev\/shouye\/7.mp4"/g, 'openProjectById(\'comm-3\')}>\n            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/5.mp4"');

// Replace placeholder with 7.mp4 and brand-xuanye
data = data.replace(/openProjectById\('__TEMP__'\)\}>\s*<video src="__TEMP__.mp4"/g, 'openProjectById(\'brand-xuanye\')}>\n            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/7.mp4"');

fs.writeFileSync('src/App.tsx', data);
