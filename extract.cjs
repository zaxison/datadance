const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const startIndex = appContent.indexOf('const MENU_CONFIG = [');
const endIndexStr = '});\n\nconst markdownComponents';
const endIndex = appContent.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  const block = appContent.substring(startIndex, endIndex + 3);
  
  let exportCode = block;
  exportCode = exportCode.replace('const MENU_CONFIG', 'export const MENU_CONFIG');
  exportCode = exportCode.replace('const GLOBAL_MENU_ROUTES', 'export const GLOBAL_MENU_ROUTES');
  exportCode = exportCode.replace('const GLOBAL_ROUTE_MENUS', 'export const GLOBAL_ROUTE_MENUS');
  exportCode = exportCode.replace('const GLOBAL_MENU_PARENTS', 'export const GLOBAL_MENU_PARENTS');
  exportCode = exportCode.replace('const GLOBAL_MENU_LABELS', 'export const GLOBAL_MENU_LABELS');
  
  if (!fs.existsSync('src/config')) {
    fs.mkdirSync('src/config');
  }
  fs.writeFileSync('src/config/menu.js', exportCode);
  
  appContent = appContent.substring(0, startIndex) + appContent.substring(endIndex + 4);
  appContent = `import { MENU_CONFIG, GLOBAL_MENU_ROUTES, GLOBAL_ROUTE_MENUS, GLOBAL_MENU_PARENTS, GLOBAL_MENU_LABELS } from './config/menu';\n` + appContent;
  
  fs.writeFileSync('src/App.jsx', appContent);
  console.log('Successfully extracted MENU_CONFIG');
} else {
  console.log('Could not find bounds');
}
