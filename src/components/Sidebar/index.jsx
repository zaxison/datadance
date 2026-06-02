import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { PanelLeftClose } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MENU_CONFIG, GLOBAL_MENU_PARENTS, GLOBAL_MENU_ROUTES, GLOBAL_ROUTE_MENUS } from '../../config/menu';

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(['数据生产']);
  const [currentLogo, setCurrentLogo] = useState(localStorage.getItem('app-logo') || 'new');

  useEffect(() => {
    // 监听 logo 变化以更新 favicon
    const updateFavicon = (logo) => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = logo === 'new' ? 'image/png' : 'image/svg+xml';
      link.rel = 'icon';
      link.href = logo === 'new' ? '/logo.png' : '/neeko.svg';
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    // 初始化设置
    updateFavicon(currentLogo);

    const handleLogoChange = (e) => {
      setCurrentLogo(e.detail);
      updateFavicon(e.detail);
    };
    
    window.addEventListener('logo-changed', handleLogoChange);
    return () => window.removeEventListener('logo-changed', handleLogoChange);
  }, [currentLogo]);

  const location = useLocation();
  const navigate = useNavigate();
  
  
  
  const activeMenu = GLOBAL_MENU_ROUTES[location.pathname] || '首页';

  // For initial expanded menus based on route
  useEffect(() => {
    
    const parentMenu = GLOBAL_MENU_PARENTS[activeMenu];
    if (parentMenu) {
      setExpandedMenus(prev => prev.includes(parentMenu) ? prev : [...prev, parentMenu]);
    }

  }, [activeMenu]);

  const toggleMenu = (menuName) => {
    if (!isExpanded) {
      setIsExpanded(true);
      setExpandedMenus([menuName]);
      return;
    }
    
    setExpandedMenus(prev => {
      // If the menu is already expanded, collapse it
      if (prev.includes(menuName)) {
        return [];
      }
      // Otherwise, expand only the clicked menu (accordion style)
      return [menuName];
    });
  };

  const handleMenuClick = (menuName) => {
    const path = GLOBAL_ROUTE_MENUS[menuName];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-full bg-sidebar transition-[width,padding] duration-300 ease-in-out flex flex-col z-10 flex-shrink-0 group/sidebar",
        isExpanded ? "w-[200px]" : "w-[72px]"
      )}
    >
      {/* Header Area */}
      <div className={cn(
        "flex items-center transition-all duration-300 ease-in-out flex-shrink-0 relative",
        isExpanded ? "h-[76px] w-[200px]" : "h-[76px] w-[72px]"
      )}>
        {/* Logo Container (Always present, only changes position/size) */}
        <div 
            className="flex items-center transition-all duration-300 ease-in-out absolute whitespace-nowrap h-[28px]"
            style={{ 
              left: isExpanded ? '16px' : '22px'
            }}
          >
          <div 
            className={cn(
              "rounded flex items-center justify-center flex-shrink-0 relative transition-all duration-300 ease-in-out cursor-pointer group",
              isExpanded ? "w-[22px] h-[22px] overflow-hidden" : "w-[28px] h-[28px]"
            )}
            onClick={() => !isExpanded && setIsExpanded(true)}
          >
            {currentLogo === 'new' ? (
              <img 
                src="/logo.png" 
                alt="logo" 
                className={cn(
                  "w-full h-full object-contain transition-opacity duration-200 absolute top-0 left-0",
                  !isExpanded ? "opacity-100 group-hover/sidebar:opacity-0" : "opacity-100"
                )}
              />
            ) : (
              <svg 
                viewBox="0 0 28 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0",
                  !isExpanded ? "opacity-100 group-hover/sidebar:opacity-0" : "opacity-100"
                )}
              >
                <path d="M23.296 5.36621L14 10.7464L19.5286 13.9454L26.124 10.1318V6.98181L23.296 5.36621Z" fill="var(--primary-light)"/>
                <path d="M26.1156 21.0049L26.1254 21L26.1156 21.0049Z" fill="var(--primary-color)"/>
                <path d="M20.5982 13.3266L20.5996 17.808L26.124 21V10.1318L20.5982 13.3266Z" fill="var(--primary-color)"/>
                <path d="M20.5996 17.808L8.4742 24.8094L14 28L26.124 21L20.5996 17.808Z" fill="var(--primary-dark)"/>
                <path d="M19.5426 3.2004L14 0L1.876 7L7.4018 10.1906L19.5426 3.2004Z" fill="var(--primary-light)"/>
                <path d="M7.4018 10.1906L1.876 7V21L4.6018 22.5736L7.4018 20.9426V10.1906Z" fill="var(--primary-color)"/>
                <path d="M14 17.1402L8.4714 13.9454L7.4018 14.5516V20.9426L14 17.1402Z" fill="var(--primary-dark)"/>
              </svg>
            )}
            {!isExpanded && (
              <>
                <img 
                  src="/expand-default.svg" 
                  alt="expand" 
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0",
                    "opacity-0 group-hover/sidebar:opacity-100"
                  )} 
                />
                <img 
                  src="/expand-hover.svg" 
                  alt="expand-hover" 
                  className="w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0 opacity-0 hover:opacity-100 z-10" 
                />
                {/* Expand Tooltip */}
                <div className="absolute left-[40px] top-1/2 -translate-y-1/2 bg-[#2B303A] text-[#FFFFFF] text-[13px] leading-[22px] px-[8px] py-[6px] rounded-[4px] whitespace-nowrap opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-50 shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] origin-left">
                  展开
                  {/* Tooltip arrow */}
                  <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#2B303A]"></div>
                </div>
              </>
            )}
          </div>
          <span 
              className={cn(
                "font-semibold text-gray-800 tracking-wide transition-all duration-300 ease-in-out overflow-hidden inline-flex items-center",
                isExpanded ? "opacity-100 max-w-[100px] ml-[8px]" : "opacity-0 max-w-0 ml-0"
              )}
              style={{ fontSize: '18px', height: '22px' }}
            >
            DataDance
          </span>
        </div>

        {/* Collapse Button */}
        <div className="absolute right-4 group flex items-center justify-center">
          <button 
            onClick={() => setIsExpanded(false)}
            className={cn(
              "flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-200/50 cursor-pointer transition-all duration-300 ease-in-out origin-right",
              isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
            )}
            style={{ width: '28px', height: '28px' }}
          >
            <PanelLeftClose size={18} />
          </button>
          
          {/* Collapse Tooltip */}
          {isExpanded && (
            <div className="absolute left-[40px] top-1/2 -translate-y-1/2 bg-[#2B303A] text-[#FFFFFF] text-[13px] leading-[22px] px-[8px] py-[6px] rounded-[4px] whitespace-nowrap opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-50 shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] origin-left">
              收起
              {/* Tooltip arrow pointing left */}
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#2B303A]"></div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
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

      {/* User Profile */}
      <div 
        className={cn(
          "mt-auto transition-[width,padding] duration-300 ease-in-out flex flex-col relative",
          isExpanded ? "pb-4 justify-center w-[200px]" : "px-[16px] pb-[24px] pt-4 justify-center w-[72px]"
        )}
      >
        <div 
          className={cn(
            "flex items-center rounded-lg cursor-pointer hover:bg-[var(--primary-bg-hover)] transition-[width,height,padding,background-color] duration-300 ease-in-out relative flex-shrink-0 mx-auto group/user",
            isExpanded ? "w-[164px] h-[56px] p-[8px]" : "w-[40px] h-[40px] justify-center"
          )}
          style={isExpanded ? { gap: '8px' } : {}}
          onMouseEnter={() => {
            if (window.userMenuTimeout) clearTimeout(window.userMenuTimeout);
            setIsUserMenuOpen(true);
          }}
          onMouseLeave={() => {
            window.userMenuTimeout = setTimeout(() => {
              setIsUserMenuOpen(false);
            }, 150);
          }}
        >
          <div className={cn(
            "rounded-full overflow-hidden flex-shrink-0 bg-[#f0f0f0] transition-[width,height] duration-300 ease-in-out",
            isExpanded ? "w-[32px] h-[32px]" : "w-[40px] h-[40px]"
          )}>
            <img 
              src="/avatar.png" 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn(
            "flex flex-col justify-center overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap",
            isExpanded ? "opacity-100 w-[108px]" : "opacity-0 w-0"
          )}>
            <div className="truncate" style={{ color: '#0B0B0F', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>zhouhongxiang</div>
            <div className="truncate" style={{ color: '#BBBDD8', fontSize: '12px', lineHeight: '20px' }}>Medical</div>
          </div>

          {/* User Settings Popup - Rendered inside the hover container but positioned via fixed */}
          {isUserMenuOpen && createPortal(
            <div 
              id="primary-user-menu"
              className="fixed flex flex-col items-start bg-white z-[99999]"
              style={{
                width: '196px',
                padding: '8px',
                gap: '8px',
                borderRadius: '8px',
                boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
                bottom: isExpanded ? '80px' : '72px', // Adjusted position relative to the new parent
                left: isExpanded ? '18px' : '16px', // Adjusted left position
              }}
              onMouseEnter={() => {
                if (window.userMenuTimeout) clearTimeout(window.userMenuTimeout);
                setIsUserMenuOpen(true);
              }}
              onMouseLeave={() => {
                window.userMenuTimeout = setTimeout(() => {
                  setIsUserMenuOpen(false);
                }, 150);
              }}
            >
                {/* Group 1 */}
                <div className="flex flex-col w-full" style={{ gap: '0px' }} onMouseLeave={() => {
                  // We handle mouse leave on individual items instead
                }}>
                  <UserSettingItem 
                    icon="/user-setting-change-icon.svg" 
                    label="更改图标 (dev)" 
                    hasArrow={true}
                  />
                  <UserSettingItem 
                    icon="/user-setting-theme.svg" 
                    label="主题配置 (dev)" 
                    hasArrow={true}
                  />
                  <UserSettingItem icon="/user-setting-profile.svg" label="个人信息" />
                  <UserSettingItem icon="/user-setting-permission.svg" label="权限申请" />
                </div>
                
                {/* Separator */}
                <div style={{ alignSelf: 'stretch', height: '1px', background: '#E2E5F1', margin: '0 -8px' }}></div>
                
                {/* Group 2 */}
                <div className="flex flex-col w-full" style={{ gap: '0px' }}>
                  <UserSettingItem 
                    icon="/user-setting-switch-tenant.svg" 
                    label="切换租户" 
                    hasArrow={true}
                  />
                  <UserSettingItem 
                    icon="/user-setting-language.svg" 
                    label="切换语言" 
                    hasArrow={true}
                  />
                  <UserSettingItem 
                    icon="/user-setting-timezone.svg" 
                    label="更换时区" 
                    hasArrow={true} 
                  />
                </div>
                
                {/* Separator */}
                <div style={{ alignSelf: 'stretch', height: '1px', background: '#E2E5F1', margin: '0 -8px' }}></div>
                
                {/* Group 3 */}
                <div className="flex flex-col w-full" style={{ gap: '0px' }}>
                  <UserSettingItem icon="/user-setting-clear-cache.svg" label="清除缓存" />
                  <UserSettingItem icon="/user-setting-logout.svg" label="退出登录" isDestructive />
                </div>
              </div>,
            document.body
          )}
        </div>
      </div>
    </div>
  );
}

function UserSettingItem({ icon, label, rightElement, isDestructive, hasArrow, onMenuHover, isCustomIcon = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0, left: 0 });
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('app-theme') || '#5372FF');
  const [currentLogo, setCurrentLogo] = useState(localStorage.getItem('app-logo') || 'new');

  useEffect(() => {
    const handleLogoChange = (e) => setCurrentLogo(e.detail);
    window.addEventListener('logo-changed', handleLogoChange);
    return () => window.removeEventListener('logo-changed', handleLogoChange);
  }, []);

  const color = isDestructive 
    ? '#F53F3F' 
    : (isHovered ? 'var(--primary-color)' : '#3F3F51');
  
  const backgroundColor = isDestructive && isHovered
    ? '#FFF5F6'
    : (isHovered ? 'var(--primary-bg-light)' : '#FFF');

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
    if (onMenuHover) onMenuHover(true);
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const primaryMenu = document.getElementById('primary-user-menu');
      
      let topPos = rect.top;
      
      if (primaryMenu && hasArrow && label === '切换租户') {
        const primaryRect = primaryMenu.getBoundingClientRect();
        setSubmenuPos({ 
          bottom: window.innerHeight - primaryRect.bottom, 
          left: rect.right + 8,
          isBottomAligned: true
        });
      } else if (label === '更换时区' && primaryMenu) {
        const primaryRect = primaryMenu.getBoundingClientRect();
        setSubmenuPos({
          top: primaryRect.top,
          left: rect.right + 8,
          height: primaryRect.height,
          isBottomAligned: false
        });
      } else {
        const viewportHeight = window.innerHeight;
        const estimatedMenuHeight = 100;
        
        if (topPos + estimatedMenuHeight > viewportHeight) {
          topPos = Math.max(16, viewportHeight - estimatedMenuHeight - 16);
        }
        setSubmenuPos({ top: topPos, left: rect.right + 8, isBottomAligned: false });
      }
    }
  };

  const handleMouseLeave = () => {
    // Only use debounce for menus that have a submenu (hasArrow) to prevent accidental closing
    // For regular items, close immediately
    if (hasArrow) {
      // Use a very short debounce for hover state to prevent flickering when moving to submenu
      // but long enough to clear other active states when moving vertically
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 50); // Reduced from 300ms to 50ms
    } else {
      setIsHovered(false);
    }
  };

  // We need to keep the submenu open when hovering it, 
  // but we can make the parent item's hover state independent or tied to it.
  const handleSubmenuMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
    // Keep parent menu open
    if (window.userMenuTimeout) clearTimeout(window.userMenuTimeout);
  };

  const handleSubmenuMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 50);
  };

  return (
    <div 
      ref={itemRef}
      className="flex items-center cursor-pointer transition-colors relative group/item"
      style={{
        display: isHovered ? 'inline-flex' : 'flex',
        padding: '12px',
        gap: '12px',
        alignSelf: 'stretch',
        borderRadius: '8px',
        background: backgroundColor
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span 
        className="flex-shrink-0 flex items-center justify-center"
        style={isCustomIcon ? {
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        } : {
          WebkitMask: `url(${icon}) no-repeat center`,
          WebkitMaskSize: 'contain',
          backgroundColor: color,
          width: '16px',
          height: '16px'
        }}
      >
        {isCustomIcon && (
          <img src={icon} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: isHovered ? 'brightness(0) saturate(100%) invert(39%) sepia(87%) saturate(5412%) hue-rotate(224deg) brightness(101%) contrast(105%)' : 'grayscale(100%) brightness(50%)' }} />
        )}
      </span>
      <span 
        className="flex-1 font-medium whitespace-nowrap no-underline"
        style={{ fontSize: '14px', lineHeight: '22px', color: color, fontWeight: isHovered ? 500 : 400 }}
      >
        {label}
      </span>
      {hasArrow && (
        <span 
          className="flex-shrink-0"
          style={{
            WebkitMask: `url(/up.svg) no-repeat center`,
            WebkitMaskSize: 'contain',
            backgroundColor: color,
            width: '16px',
            height: '16px',
            transform: 'rotate(90deg)'
          }}
        />
      )}
      {rightElement}
      
      {/* Language Submenu */}
      {hasArrow && label === '切换语言' && isHovered && createPortal(
        <div 
          className="fixed flex flex-col bg-white z-[999999]"
          style={{
            left: `${submenuPos.left}px`,
            top: `${submenuPos.top}px`,
            padding: '4px',
            gap: '4px',
            borderRadius: '8px',
            boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E5F1',
            width: '120px'
          }}
          onMouseEnter={handleSubmenuMouseEnter} 
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer bg-[var(--primary-bg-hover)] text-[var(--primary-color)] transition-colors rounded-md no-underline">中文</div>
          <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md">English</div>
        </div>,
        document.body
      )}
      {hasArrow && label === '更改图标 (dev)' && isHovered && createPortal(
        <div 
          className="fixed flex flex-col bg-white z-[999999]"
          style={{
            left: `${submenuPos.left}px`,
            top: `${submenuPos.top}px`,
            padding: '8px',
            gap: '4px',
            borderRadius: '8px',
            boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E5F1'
          }}
          onMouseEnter={handleSubmenuMouseEnter} 
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {[
            { id: 'old', name: 'LOGO 01', type: 'svg' },
            { id: 'new', name: 'LOGO 02', type: 'png' }
          ].map((logoItem) => {
            const isSelected = currentLogo === logoItem.id;
              
            return (
              <div 
                key={logoItem.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors",
                  isSelected ? "bg-[var(--primary-bg-hover)]" : "hover:bg-[#F2F3F8]"
                )}
                onClick={() => {
                  window.changeLogo(logoItem.id);
                  setCurrentLogo(logoItem.id);
                }}
              >
                {logoItem.type === 'svg' ? (
                  <svg 
                    viewBox="0 0 28 28" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 object-cover"
                  >
                    <path d="M23.296 5.36621L14 10.7464L19.5286 13.9454L26.124 10.1318V6.98181L23.296 5.36621Z" fill="var(--primary-light)"/>
                    <path d="M26.1156 21.0049L26.1254 21L26.1156 21.0049Z" fill="var(--primary-color)"/>
                    <path d="M20.5982 13.3266L20.5996 17.808L26.124 21V10.1318L20.5982 13.3266Z" fill="var(--primary-color)"/>
                    <path d="M20.5996 17.808L8.4742 24.8094L14 28L26.124 21L20.5996 17.808Z" fill="var(--primary-dark)"/>
                    <path d="M19.5426 3.2004L14 0L1.876 7L7.4018 10.1906L19.5426 3.2004Z" fill="var(--primary-light)"/>
                    <path d="M7.4018 10.1906L1.876 7V21L4.6018 22.5736L7.4018 20.9426V10.1906Z" fill="var(--primary-color)"/>
                    <path d="M14 17.1402L8.4714 13.9454L7.4018 14.5516V20.9426L14 17.1402Z" fill="var(--primary-dark)"/>
                  </svg>
                ) : (
                  <img src="/logo.png" alt="logo" className="w-5 h-5 object-contain" />
                )}
                <span 
                  className="text-[14px] font-['PingFang_SC'] font-normal leading-[22px] tracking-[0.042px] no-underline whitespace-nowrap"
                  style={{ color: isSelected ? 'var(--primary-color)' : '#0B0B0F' }}
                >
                  {logoItem.name}
                </span>
              </div>
            );
          })}
        </div>,
        document.body
      )}
      {hasArrow && label === '主题配置 (dev)' && isHovered && createPortal(
        <div 
          className="fixed flex flex-col bg-white z-[999999]"
          style={{
            left: `${submenuPos.left}px`,
            top: `${submenuPos.top}px`,
            padding: '8px',
            gap: '4px',
            borderRadius: '8px',
            boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E5F1'
          }}
          onMouseEnter={handleSubmenuMouseEnter} 
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {[
            { color: '#5372FF', name: '主题色01' },
            { color: '#2E2E2E', name: '主题色02' },
            { color: '#5364FF', name: '主题色03' },
            { color: '#FF7D00', name: '主题色04' },
            { color: '#00B42A', name: '主题色05' },
            { color: '#F53F3F', name: '主题色06' },
            { color: '#722ED1', name: '主题色07' },
            { color: '#2166FF', name: '主题色08' }
          ].map((themeItem) => {
            const isSelected = currentTheme === themeItem.color;
              
            return (
              <div 
                key={themeItem.color}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors",
                  isSelected ? "bg-[var(--primary-bg-hover)]" : "hover:bg-[#F2F3F8]"
                )}
                onClick={() => {
                  window.changeTheme(themeItem.color);
                  setCurrentTheme(themeItem.color);
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-[#E2E5F1] flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: themeItem.color }}
                >
                </div>
                <span 
                  className="text-[14px] font-['PingFang_SC'] font-normal leading-[22px] tracking-[0.042px] no-underline"
                  style={{ color: isSelected ? 'var(--primary-color)' : '#0B0B0F' }}
                >
                  {themeItem.name}
                </span>
              </div>
            );
          })}
        </div>,
        document.body
      )}
      {/* Timezone Submenu */}
      {hasArrow && label === '更换时区' && isHovered && createPortal(
        <div 
          className="fixed flex flex-col bg-white overflow-y-auto z-[999999]"
          ref={(el) => {
            if (el && !el.hasScrolled) {
              const activeEl = el.querySelector('.timezone-active');
              if (activeEl) {
                // Scroll the container so the active element is visible, centering it roughly
                el.scrollTop = activeEl.offsetTop - el.clientHeight / 2 + activeEl.clientHeight / 2;
              }
              el.hasScrolled = true;
            }
          }}
          style={{
            left: `${submenuPos.left}px`,
            top: `${submenuPos.top}px`,
            padding: '4px',
            gap: '4px',
            borderRadius: '8px',
            boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E5F1',
            width: '160px',
            height: submenuPos.height ? `${submenuPos.height}px` : 'auto',
            maxHeight: submenuPos.height ? `${submenuPos.height}px` : '300px'
          }}
          onMouseEnter={handleSubmenuMouseEnter} 
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const offset = i - 12; // -12 to +12
            const sign = offset >= 0 ? '+' : '-';
            const absOffset = Math.abs(offset);
            const padOffset = absOffset < 10 ? `0${absOffset}` : absOffset;
            const labelStr = `UTC${sign}${padOffset}:00`;
            const isActive = labelStr === 'UTC+08:00';
            
            return (
              <div 
                key={labelStr}
                className={cn(
                  "px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] transition-colors rounded-md no-underline",
                  isActive ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)] timezone-active" : "text-[#0B0B0F]"
                )}
              >
                {labelStr}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {/* Tenant Submenu */}
      {hasArrow && label === '切换租户' && isHovered && createPortal(
        <div 
          className="fixed flex flex-col bg-white overflow-y-auto z-[999999]"
          style={{
            left: `${submenuPos.left}px`,
            ...(submenuPos.isBottomAligned ? { bottom: `${submenuPos.bottom}px` } : { top: `${submenuPos.top}px` }),
            padding: '4px',
            gap: '4px',
            borderRadius: '8px',
            boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E5F1',
            width: '140px',
          }}
          onMouseEnter={handleSubmenuMouseEnter} 
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {['Medical', 'DMC', 'Xpert', 'AIDP coding', 'S', '通用', '体验用户'].map((tenant) => {
            const isActive = tenant === 'Medical';
            return (
              <div 
                key={tenant}
                className={cn(
                  "px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] transition-colors rounded-md no-underline",
                  isActive ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)]" : "text-[#0B0B0F]"
                )}
              >
                {tenant}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

function MenuItem({ icon, label, isExpanded, hasArrow, active, submenus, onSubmenuClick, isSubmenuExpanded }) {
  const isStringIcon = typeof icon === 'string';
  const IconComponent = !isStringIcon ? icon.type : null;
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isExpanded && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + rect.height / 2, // center of the container
        left: 76 // 72px sidebar + 4px gap
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 100); // Add a small delay to allow smooth transition to tooltip
    }
  };

  useEffect(() => {
    if (isExpanded) {
      setIsHovered(false);
    }
  }, [isExpanded]);

  return (
    <div 
      className="relative group/menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <div 
        className={cn(
          "flex items-center cursor-pointer transition-[width,height,padding,background-color] duration-300 ease-in-out group overflow-hidden flex-shrink-0 mx-auto",
          isExpanded 
            ? cn("w-[168px] h-[42px] rounded-[8px] hover:bg-[var(--primary-bg-hover)]", active && "bg-[var(--primary-bg-hover)]") 
            : cn("w-[40px] h-[40px] rounded-[8px] justify-center", active ? "bg-[var(--primary-bg-hover)]" : "hover:bg-[var(--primary-bg-hover)]")
        )}
        style={{ padding: isExpanded ? '10px 12px' : '10px' }}
      >
        <span className={cn(
            "flex-shrink-0 flex items-center justify-center transition-all duration-300",
            isStringIcon ? (active ? "bg-[var(--primary-color)]" : "bg-[#3F3F51] group-hover:bg-[var(--primary-color)]") : (active ? "text-[var(--primary-color)]" : "text-[#3F3F51] group-hover:text-[var(--primary-color)]")
          )}
        style={isStringIcon ? {
          WebkitMask: `url(${icon}) no-repeat center`,
          WebkitMaskSize: 'contain',
          width: '20px',
          height: '20px'
        } : {}}
        >
          {!isStringIcon && <IconComponent size={20} strokeWidth={2} />}
        </span>
        {isExpanded ? (
          <>
            <span 
              className={cn(
                "ml-[8px] font-medium whitespace-nowrap transition-all duration-300 ease-in-out",
                active ? "text-[var(--primary-color)]" : "text-[#555B65] group-hover:text-[var(--primary-color)]",
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              )}
              style={{ fontSize: '14px', lineHeight: '22px' }}
            >
              {label}
            </span>
            {hasArrow && (
              <span className={cn(
                  "ml-auto flex-shrink-0 transition-all duration-300 ease-in-out transform",
                  active ? "bg-[var(--primary-color)]" : "bg-[#3F3F51] group-hover:bg-[var(--primary-color)]",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                  isSubmenuExpanded ? "" : "rotate-180"
                )}
              style={{
                WebkitMask: `url(/up.svg) no-repeat center`,
                WebkitMaskSize: 'contain',
                width: '16px',
                height: '16px'
              }}
              />
            )}
          </>
        ) : null}
      </div>

      {/* Tooltip for collapsed state */}
      {!isExpanded && isHovered && createPortal(
        (!submenus || submenus.length === 0) ? (
          <div 
            className="fixed bg-[#2B303A] text-[#FFFFFF] text-[13px] leading-[22px] px-[8px] py-[6px] rounded-[4px] shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] whitespace-nowrap pointer-events-none z-[999999] animate-zoom-in-fade origin-left"
            style={{
              left: `${tooltipPos.left}px`,
              top: `${tooltipPos.top}px`,
              transform: 'translateY(-50%)'
            }}
          >
            {label}
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#2B303A]"></div>
          </div>
        ) : (
          <div 
            className="fixed bg-white rounded-lg shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] border border-[#E2E5F1] py-2 px-1 flex flex-col transition-opacity duration-200 pointer-events-auto opacity-100 z-[999999]"
            style={{
              left: `${tooltipPos.left}px`,
              top: `${tooltipPos.top}px`,
              transform: 'translateY(-50%)',
              minWidth: '120px'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {submenus.map((sub, idx) => (
              <div 
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSubmenuClick) {
                    onSubmenuClick(sub.id);
                    setIsHovered(false);
                  }
                }}
                className={cn(
                  "px-3 py-2 text-[14px] leading-[22px] font-medium cursor-pointer rounded-md mx-1 whitespace-nowrap transition-colors",
                  sub.active ? "text-[var(--primary-color)] bg-[var(--primary-bg-hover)]" : "text-[#555B65] hover:text-[var(--primary-color)] hover:bg-[var(--primary-bg-hover)]"
                )}
              >
                {sub.label}
              </div>
            ))}
          </div>
        ),
        document.body
      )}
    </div>
  );
}
