const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

c = c.replace('const GLOBAL_MENU_PARENTS = {}; // Map submenu id to parent id', 
`const GLOBAL_MENU_PARENTS = {}; // Map submenu id to parent id
const GLOBAL_MENU_LABELS = {};`);

c = c.replace('GLOBAL_MENU_ROUTES[item.path] = item.id;',
`GLOBAL_MENU_ROUTES[item.path] = item.id;
    GLOBAL_MENU_LABELS[item.path] = item.label || item.id;`);

c = c.replace('GLOBAL_MENU_ROUTES[sub.path] = sub.id;',
`GLOBAL_MENU_ROUTES[sub.path] = sub.id;
      GLOBAL_MENU_LABELS[sub.path] = sub.label || sub.id;`);

c = c.replace("const activeMenuTitle = GLOBAL_MENU_ROUTES[location.pathname] || '首页';",
"const activeMenuTitle = GLOBAL_MENU_LABELS[location.pathname] || '首页';");

fs.writeFileSync('src/App.jsx', c);
