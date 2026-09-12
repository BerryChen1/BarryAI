const fs = require('fs');

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

if (!appTsx.includes('LazyVideo')) {
  // Find the last import
  const lastImportIndex = appTsx.lastIndexOf('import ');
  const endOfLastImport = appTsx.indexOf('\n', lastImportIndex);
  
  appTsx = appTsx.slice(0, endOfLastImport + 1) + 
           "import { LazyVideo } from './components/LazyVideo';\n" + 
           appTsx.slice(endOfLastImport + 1);
}

appTsx = appTsx.replaceAll(
  '<video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/1.mp4"',
  '<LazyVideo src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/1.mp4"'
);
appTsx = appTsx.replaceAll(
  '<video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/2.mp4"',
  '<LazyVideo src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/2.mp4"'
);
appTsx = appTsx.replaceAll(
  '<video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/3.mp4"',
  '<LazyVideo src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/3.mp4"'
);
appTsx = appTsx.replaceAll(
  '<video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/4.mp4"',
  '<LazyVideo src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/4.mp4"'
);
appTsx = appTsx.replaceAll(
  '<video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/5.mp4"',
  '<LazyVideo src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/shouye/5.mp4"'
);

fs.writeFileSync('src/App.tsx', appTsx);
console.log("Updated App.tsx to use LazyVideo.");
