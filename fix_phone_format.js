const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:/studiofitindia/studiofitindia/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Fix spacing: +91 9310666287 -> +91 93106 66287
  content = content.replace(/\+91 9310666287/g, '+91 93106 66287');
  
  // Fix dashes: +91-9310666287 -> +91 93106 66287
  content = content.replace(/\+91-9310666287/g, '+91 93106 66287');
  
  // Fix old dashes: +91-9310666287 -> +91 93106 66287
  content = content.replace(/\+91-9310666287/g, '+91 93106 66287');
  
  // Fix other cases of spaces or dashes
  content = content.replace(/\+91 \- 9310666287/g, '+91 93106 66287');
  content = content.replace(/\+91 93106 66287/g, '+91 93106 66287');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed formatting in: ' + file);
  }
});
