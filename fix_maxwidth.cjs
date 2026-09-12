const fs = require('fs');
let data = fs.readFileSync('public/xuanye.html', 'utf8');

// The class .title-en has max-width: 44ch, which forces text to wrap.
// Let's change it to max-width: none or something wider like 100% or 80ch.
data = data.replace('max-width:44ch;', 'max-width:100%; white-space:nowrap;');

fs.writeFileSync('public/xuanye.html', data);
