const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar/index.jsx', 'utf8');

// We need to keep imports, cn, Sidebar, UserSettingItem, MenuItem
// Let's remove functions: FilterIconButton, SparkIcon, FormField, AIAssistant, CreateProjectModal, App, MainContent, Toast, TitleArea, TabArea, FilterArea, TableArea, TableRow, UserInfo, PaginationButton, Pagination

const funcsToRemove = [
  'FilterIconButton', 'SparkIcon', 'FormField', 'AIAssistant', 'CreateProjectModal', 'App', 'MainContent', 'Toast', 'TitleArea', 'TabArea', 'FilterArea', 'TableArea', 'TableRow', 'UserInfo', 'PaginationButton', 'Pagination'
];

for (const fn of funcsToRemove) {
  // Simple regex to remove the function block. This assumes standard brace matching or simple regex since we know the file.
  // Actually, regex to remove top-level functions:
  // function Name(args) { ... }
  // Since it's nested, regex is tricky. Let's use a simple brace matching logic.
}

// Since writing a parser here is hard, let's use a quick script to find "function XXX" and remove till the matching brace.
function removeFunction(code, funcName) {
  const keyword = `function ${funcName}(`;
  let start = code.indexOf(keyword);
  if (start === -1) {
    const keyword2 = `export default function ${funcName}(`;
    start = code.indexOf(keyword2);
    if (start === -1) return code;
  }
  
  // Find the first '{' after start
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

for (const fn of funcsToRemove) {
  content = removeFunction(content, fn);
}

// Export Sidebar
content = content.replace('function Sidebar', 'export default function Sidebar');

fs.writeFileSync('src/components/Sidebar/index.jsx', content);
