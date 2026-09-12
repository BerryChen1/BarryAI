const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf-8');

// We need to extract:
// 1. PORTFOLIO_DETAILS
// 2. CATALOG_PORTFOLIO_DATA (and CatalogCategory interface if possible, or just copy it)

const portfolioMatch = content.match(/const PORTFOLIO_DETAILS = \[([\s\S]*?)\];\n/);
const catalogMatch = content.match(/export const CATALOG_PORTFOLIO_DATA: CatalogCategory\[\] = \[([\s\S]*?)\];\n/);

if (!portfolioMatch || !catalogMatch) {
  console.error('Could not find data arrays');
} else {
  let dataFile = `
export const PORTFOLIO_DETAILS = [${portfolioMatch[1]}];

export const CATALOG_PORTFOLIO_DATA = [${catalogMatch[1]}];
`;
  fs.writeFileSync('src/data.ts', dataFile);
  console.log('Extracted to src/data.ts');
}
