const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

function removeFunction(code, funcName) {
  const keyword = `function ${funcName}(`;
  let start = code.indexOf(keyword);
  if (start === -1) {
    const keyword2 = `export default function ${funcName}(`;
    start = code.indexOf(keyword2);
    if (start === -1) return code;
  }
  
  let braceIndex = code.indexOf('{', start);
  if (braceIndex === -1) return code;
  
  let braceCount = 1;
  let i = braceIndex + 1;
  while (i < code.length && braceCount > 0) {
    if (code[i] === '{') braceCount++;
    if (code[i] === '}') braceCount--;
    i++;
  }
  
  return code.substring(0, start) + code.substring(i);
}

content = removeFunction(content, 'Sidebar');
content = removeFunction(content, 'UserSettingItem');
content = removeFunction(content, 'MenuItem');

// Add import
content = `import Sidebar from './components/Sidebar';\n` + content;

fs.writeFileSync('src/App.jsx', content);
