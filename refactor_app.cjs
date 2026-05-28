const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Remove old MENU_ROUTES in Sidebar
const sidebarRoutesRegex = /const MENU_ROUTES = \{[\s\S]*?const ROUTE_MENUS = Object\.fromEntries\(Object\.entries\(MENU_ROUTES\)\.map\(\(\[k, v\]\) => \[v, k\]\)\);/m;
content = content.replace(sidebarRoutesRegex, '');

// Remove old MENU_ROUTES in MainContent
const mainContentRoutesRegex = /const MENU_ROUTES = \{[\s\S]*?\};\s*const activeMenuTitle = MENU_ROUTES\[location\.pathname\] \|\| '首页';/m;
content = content.replace(mainContentRoutesRegex, 'const activeMenuTitle = GLOBAL_MENU_ROUTES[location.pathname] || \'首页\';');

// Update Sidebar location handling
content = content.replace(/const activeMenu = MENU_ROUTES\[location\.pathname\] \|\| '首页';/g, 'const activeMenu = GLOBAL_MENU_ROUTES[location.pathname] || \'首页\';');
content = content.replace(/const path = ROUTE_MENUS\[menuName\];/g, 'const path = GLOBAL_ROUTE_MENUS[menuName];');

// Update activeMenu check logic for auto expanding
content = content.replace(/if \(\['首页', '任务列表', '我的任务', '组别管理'\]\.includes\(activeMenu\)\) \{[\s\S]*?\} else if \(\['用户列表', '标签管理', '团队管理', '权限管理', '角色管理'\]\.includes\(activeMenu\)\) \{[\s\S]*?\}/g, `
    const parentMenu = GLOBAL_MENU_PARENTS[activeMenu];
    if (parentMenu) {
      setExpandedMenus(prev => prev.includes(parentMenu) ? prev : [...prev, parentMenu]);
    }
`);

// Now replace the entire Sidebar menu rendering section.
const menuItemsRegex = /\{\/\* Menu Items \*\/\}([\s\S]*?)\{\/\* User Profile \*\/\}/m;

const newMenuItems = `{/* Menu Items */}
      <div className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide mt-2 transition-[width,padding] duration-300 ease-in-out flex flex-col",
        isExpanded ? "px-[16px] space-y-1 w-[200px] items-stretch" : "px-[16px] items-center w-[72px]"
      )} style={{ gap: isExpanded ? '0' : '8px' }}>
        {MENU_CONFIG.map(item => {
          if (!item.submenus) {
            return (
              <div key={item.id} onClick={() => handleMenuClick(item.id)}>
                <MenuItem 
                  icon={item.icon} 
                  label={item.id} 
                  isExpanded={isExpanded} 
                  active={activeMenu === item.id}
                  onSubmenuClick={handleMenuClick}
                />
              </div>
            );
          } else {
            const isAnySubActive = item.submenus.some(sub => sub.id === activeMenu);
            return (
              <div key={item.id} className={cn(isExpanded ? "mb-1" : "mb-0")}>
                <div onClick={() => toggleMenu(item.id)}>
                  <MenuItem 
                    icon={item.icon} 
                    label={item.id} 
                    isExpanded={isExpanded} 
                    hasArrow 
                    active={!isExpanded && isAnySubActive} 
                    isSubmenuExpanded={expandedMenus.includes(item.id)}
                    submenus={item.submenus.map(sub => ({ id: sub.id, label: sub.label, active: activeMenu === sub.id }))}
                    onSubmenuClick={handleMenuClick}
                  />
                </div>
                
                {/* Submenu Items */}
                <div className={cn(
                  "space-y-1 overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out origin-top",
                  isExpanded && expandedMenus.includes(item.id) ? "mt-1 max-h-[500px] opacity-100" : "max-h-0 opacity-0 m-0"
                )}>
                  {item.submenus.map((subItem) => (
                    <div 
                      key={subItem.id}
                      onClick={() => handleMenuClick(subItem.id)}
                      className={cn(
                        "flex items-center rounded-[8px] cursor-pointer whitespace-nowrap transition-colors",
                        activeMenu === subItem.id 
                          ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)] font-medium" 
                          : "text-[#555B65] hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)]"
                      )}
                      style={{ padding: '10px 12px 10px 40px', fontSize: '14px', lineHeight: '22px' }}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* User Profile */}`;

content = content.replace(menuItemsRegex, newMenuItems);

// Also we need to fix MenuItem component: onSubmenuClick(sub.label) -> onSubmenuClick(sub.id)
content = content.replace(/onSubmenuClick\(sub\.label\);/g, 'onSubmenuClick(sub.id);');

// And in Preload array:
const preloadRegex = /const PRELOAD_ICONS = \[[\s\S]*?\];/m;
const newPreload = `const PRELOAD_ICONS = [
  ...MENU_CONFIG.map(m => m.icon),
  '/ai-icon-1.svg',
  '/ai-icon-2.svg',
  '/ai-icon-3.svg',
  '/ai-icon-4.svg',
  '/ai-send.svg',
  '/ai-spark.svg',
  '/expand-default.svg',
  '/expand-hover.svg',
  '/favicon.svg',
  '/neeko.svg',
  '/toast-check-circle-fill.svg',
  '/toast-x-close.svg',
  '/toolbar-fit.svg',
  '/toolbar-fullscreen.svg',
  '/toolbar-zoom-in.svg',
  '/toolbar-zoom-out.svg',
  '/up.svg',
  '/user-card-audio.svg',
  '/user-card-msg.svg',
  '/user-card-video.svg',
  '/user-setting-change-icon.svg',
  '/user-setting-clear-cache.svg',
  '/user-setting-language.svg',
  '/user-setting-logout.svg',
  '/user-setting-permission.svg',
  '/user-setting-profile.svg',
  '/user-setting-switch-tenant.svg',
  '/user-setting-theme.svg',
  '/user-setting-timezone.svg'
];`;
content = content.replace(preloadRegex, newPreload);

fs.writeFileSync('src/App.jsx', content);
