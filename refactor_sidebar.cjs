const fs = require('fs');

const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');

const menuLines = lines.slice(123, 173);
let menuCode = menuLines.join('\n');
menuCode = menuCode.replace('const MENU_CONFIG', 'export const MENU_CONFIG')
                   .replace('const GLOBAL_MENU_ROUTES', 'export const GLOBAL_MENU_ROUTES')
                   .replace('const GLOBAL_ROUTE_MENUS', 'export const GLOBAL_ROUTE_MENUS')
                   .replace('const GLOBAL_MENU_PARENTS', 'export const GLOBAL_MENU_PARENTS')
                   .replace('const GLOBAL_MENU_LABELS', 'export const GLOBAL_MENU_LABELS');

if (!fs.existsSync('src/config')) {
  fs.mkdirSync('src/config', { recursive: true });
}
fs.writeFileSync('src/config/menu.js', menuCode);

const sidebarLines = lines.slice(1461, 1825);
const userSettingLines = lines.slice(1826, 2201);
const menuItemLines = lines.slice(2202, 2347);

let sidebarCode = `import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MENU_CONFIG, GLOBAL_MENU_PARENTS } from '../../config/menu';

${sidebarLines.join('\n').replace('function Sidebar', 'export default function Sidebar')}

${userSettingLines.join('\n')}

${menuItemLines.join('\n')}
`;

if (!fs.existsSync('src/components/Sidebar')) {
  fs.mkdirSync('src/components/Sidebar', { recursive: true });
}
fs.writeFileSync('src/components/Sidebar/index.jsx', sidebarCode);

const newAppLines = [];
let i = 0;
while (i < lines.length) {
  if (i >= 123 && i < 173) {
    if (i === 123) {
      newAppLines.push(`import { MENU_CONFIG, GLOBAL_MENU_ROUTES, GLOBAL_ROUTE_MENUS, GLOBAL_MENU_PARENTS, GLOBAL_MENU_LABELS } from './config/menu';`);
      newAppLines.push(`import Sidebar from './components/Sidebar';`);
    }
    i++;
    continue;
  }
  
  if ((i >= 1461 && i < 1825) || (i >= 1826 && i < 2201) || (i >= 2202 && i < 2347)) {
    i++;
    continue;
  }
  
  newAppLines.push(lines[i]);
  i++;
}

fs.writeFileSync('src/App.jsx', newAppLines.join('\n'));
console.log('Refactor complete.');
