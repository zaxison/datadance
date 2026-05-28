const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');
const assetsRegex = /const assets = \[[\s\S]*?\];/m;
const newAssets = `const assets = [
  ...MENU_CONFIG.map(m => m.icon),
  '/expand-default.svg',
  '/expand-hover.svg',
  '/up.svg',
  '/avatar.png',
  '/user-setting-change-icon.svg',
  '/user-setting-theme.svg',
  '/user-setting-profile.svg',
  '/user-setting-permission.svg',
  '/user-setting-switch-tenant.svg',
  '/user-setting-clear-cache.svg',
  '/user-setting-language.svg',
  '/user-setting-timezone.svg',
  '/user-setting-logout.svg',
  '/ai-icon-1.svg',
  '/ai-icon-2.svg',
  '/ai-icon-3.svg',
  '/ai-icon-4.svg',
  '/ai-send.svg',
  '/ai-spark.svg',
  '/favicon.svg',
  '/neeko.svg',
  '/toast-check-circle-fill.svg',
  '/toast-x-close.svg',
  '/toolbar-fit.svg',
  '/toolbar-fullscreen.svg',
  '/toolbar-zoom-in.svg',
  '/toolbar-zoom-out.svg',
  '/user-card-audio.svg',
  '/user-card-msg.svg',
  '/user-card-video.svg'
];`;
c = c.replace(assetsRegex, newAssets);
fs.writeFileSync('src/App.jsx', c);
