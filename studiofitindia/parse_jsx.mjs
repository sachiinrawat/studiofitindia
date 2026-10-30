import fs from 'fs';
import prettier from 'prettier';

const jsxPath = 'src/pages/Transformations.jsx';
const code = fs.readFileSync(jsxPath, 'utf8');

// 1. Extract CSS
const styleMatch = code.match(/<style>\{`([\s\S]*?)`\}<\/style>/);
let css = styleMatch ? styleMatch[1].trim() : '';

// Also need the base CSS from dummy/styles.css (if there's any we want to keep, but the user said "in raw html and css" so I'll just write it all).
// Actually, I'll just write the extracted CSS.
fs.writeFileSync('../dummy/styles.css', css);

console.log("CSS Extracted.");
