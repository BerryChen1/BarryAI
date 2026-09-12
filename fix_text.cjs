const fs = require('fs');
let data = fs.readFileSync('public/xuanye.html', 'utf8');

const target = 'Through <b>light</b> comes clarity,<br>through <b>darkness</b> comes divining.<br>';
const replacement = 'Through <b>light</b> comes clarity, through <b>darkness</b> comes divining.<br>';

if (data.includes(target)) {
  data = data.replace(target, replacement);
  fs.writeFileSync('public/xuanye.html', data);
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found.');
}
