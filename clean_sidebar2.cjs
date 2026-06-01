const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar/index.jsx', 'utf8');

function removeFunction(code, funcName) {
  const keyword = `const ${funcName} = `;
  let start = code.indexOf(keyword);
  if (start === -1) return code;
  
  let braceIndex = code.indexOf('{', start);
  if (braceIndex === -1) return code;
  
  let braceCount = 1;
  let i = braceIndex + 1;
  while (i < code.length && braceCount > 0) {
    if (code[i] === '{') braceCount++;
    if (code[i] === '}') braceCount--;
    i++;
  }
  
  // also skip the trailing `};`
  if (code.substring(i, i+1) === ';') i++;
  
  return code.substring(0, start) + code.substring(i);
}

content = removeFunction(content, 'MessageItem');

fs.writeFileSync('src/components/Sidebar/index.jsx', content);
