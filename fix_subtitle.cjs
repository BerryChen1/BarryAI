const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(
  'subtitle: "阴阳交生，引渡魂灵越幽冥而归澄明。"',
  'subtitle: "阴阳交生，引渡魂灵越幽冥而归澄明"'
);

fs.writeFileSync('src/data.ts', data);
