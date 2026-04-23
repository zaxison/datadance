import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Settings, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  LayoutGrid,
  PieChart,
  User,
  MessageSquare,
  Users,
  Star,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  CheckCircle2,
  MinusCircle,
  AlertCircle,
  Home,
  LayoutDashboard,
  BarChart2,
  Menu,
  Bell,
  Play,
  Circle,
  PauseCircle,
  Copy
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import TaskDetail from './TaskDetail';
import { UserHoverWrapper } from './UserHoverCard';

const themes = {
  '#5364FF': {
        '--primary-color': '#5364FF',
    '--primary-light': '#8491FF',
    '--primary-dark': '#3F4CC2',
    '--primary-bg-hover': '#EDEFFC',
    '--primary-bg-light': '#F5F7FF',
    '--primary-shadow': 'rgba(82, 82, 255, 0.30)',
    '--primary-border': '#8E96FF'
  },
  '#FF7D00': {
        '--primary-color': '#FF7D00',
    '--primary-light': '#FFAA5C',
    '--primary-dark': '#CC6400',
    '--primary-bg-hover': '#FFF2E8',
    '--primary-bg-light': '#FFF7F0',
    '--primary-shadow': 'rgba(255, 125, 0, 0.30)',
    '--primary-border': '#FFB066'
  },
  '#00B42A': {
        '--primary-color': '#00B42A',
    '--primary-light': '#4DE26F',
    '--primary-dark': '#008A20',
    '--primary-bg-hover': '#E8FFEA',
    '--primary-bg-light': '#F2FFEF',
    '--primary-shadow': 'rgba(0, 180, 42, 0.30)',
    '--primary-border': '#5EEA7B'
  },
  '#F53F3F': {
        '--primary-color': '#F53F3F',
    '--primary-light': '#FF7A7A',
    '--primary-dark': '#CB2626',
    '--primary-bg-hover': '#FFECE8',
    '--primary-bg-light': '#FFF5F2',
    '--primary-shadow': 'rgba(245, 63, 63, 0.30)',
    '--primary-border': '#FF968F'
  },
  '#722ED1': {
        '--primary-color': '#722ED1',
    '--primary-light': '#9D65F0',
    '--primary-dark': '#531DAB',
    '--primary-bg-hover': '#F3E8FF',
    '--primary-bg-light': '#F9F2FF',
    '--primary-shadow': 'rgba(114, 46, 209, 0.30)',
    '--primary-border': '#B37FEB'
  },
  '#2E2E2E': {
    '--primary-color': '#2E2E2E',
    '--primary-light': '#86909C',
    '--primary-dark': '#1D2129',
    '--primary-bg-hover': '#F2F3F5',
    '--primary-bg-light': '#F2F3F5',
    '--primary-shadow': 'rgba(46, 46, 46, 0.30)',
    '--primary-border': '#C9CDD4'
  },
  '#2166FF': {
    '--primary-color': '#2166FF',
    '--primary-light': '#73A5FF',
    '--primary-dark': '#0B3FBF',
    '--primary-bg-hover': '#EDF2FF',
    '--primary-bg-light': '#EDF2FF',
    '--primary-shadow': 'rgba(33, 102, 255, 0.30)',
    '--primary-border': '#A8C9FF'
  },
  '#5372FF': {
    '--primary-color': '#5372FF',
    '--primary-light': '#8DA0FF',
    '--primary-dark': '#2943CC',
    '--primary-bg-hover': '#EDF0FF',
    '--primary-bg-light': '#EDF0FF',
    '--primary-shadow': 'rgba(83, 114, 255, 0.30)',
    '--primary-border': '#B8C4FF'
  }
};

window.changeTheme = (color) => {
  const theme = themes[color];
  if (theme) {
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
    localStorage.setItem('app-theme', color);
    
    // Add specific class to body when black theme is active to handle underlines
    if (color === '#2E2E2E') {
      document.body.classList.add('theme-black-active');
    } else {
      document.body.classList.remove('theme-black-active');
    }
  }
};

// Initialize theme on load
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('app-theme') || '#5364FF';
  window.changeTheme(savedTheme);
}

// Helper for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// Icon Button Component for FilterArea
function FilterIconButton({ icon: Icon, disabled = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  let styles = {
    display: 'flex',
    width: '32px',
    height: '32px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '6px',
    border: '1px solid #E1E3EA',
    background: '#F3F4F7',
    boxShadow: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
  };

  let iconColor = '#3F3F51';

  if (disabled) {
    iconColor = '#C3C3DA';
  } else if (isActive) {
    styles.gap = '10px';
    styles.background = '#EDEEF2';
    // Remove default border and rely on box-shadow to prevent size shift
    styles.border = '1px solid transparent';
    styles.boxShadow = '0 0 0 1px rgba(17, 74, 185, 0.00)';
  } else if (isHovered) {
    styles.border = '1px solid #EBECF4';
    styles.background = '#F7F7F9';
  }

  return (
    <button
      style={styles}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setIsHovered(false);
          setIsActive(false);
        }
      }}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => {
        if (!disabled) {
          setIsActive(false);
        }
      }}
    >
      <Icon size={16} color={iconColor} style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }} />
    </button>
  );
}

function SparkIcon({ size = 16, color = "currentColor", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 0L9.43269 5.25301L14.6857 6.6857L9.43269 8.11838L8 13.3714L6.56731 8.11838L1.3143 6.6857L6.56731 5.25301L8 0Z" fill={color}/>
      <path d="M13.5 10.5L14.0733 12.6012L16.1745 13.1745L14.0733 13.7478L13.5 15.849L12.9267 13.7478L10.8255 13.1745L12.9267 12.6012L13.5 10.5Z" fill={color}/>
    </svg>
  );
}

function FormField({ label, required, placeholder = '请输入', type = 'input', state, value }) {
  const isGenerating = state === 'generating';
  const isGenerated = state === 'generated';
  const hasSpark = isGenerating || isGenerated;

  // 外层包裹（负责阴影和圆角等）
  let outerContainerClass = "flex items-start self-stretch rounded-[6px] shadow-[0_0_0_1px_#E2E5F1] relative transition-all";
  
  if (!isGenerating && !isGenerated) {
    outerContainerClass = "flex items-start self-stretch rounded-[6px] border border-[#E2E5F1] relative transition-all";
  }
  
  // 内层包裹（负责背景、内边距、圆角）
  let innerContainerClass = "flex px-[12px] py-[5px] items-center gap-[10px] flex-[1_0_0] rounded-[6px] transition-all relative overflow-hidden h-[36px]";

  if (isGenerating) {
    innerContainerClass = cn(innerContainerClass, "ai-generating-pulse");
  } else if (isGenerated) {
    innerContainerClass = cn(innerContainerClass, "bg-[var(--primary-bg-light)] shadow-[0_0_0_1px_#E2E5F1]");
  } else {
    innerContainerClass = cn(innerContainerClass, "bg-white");
  }

  // 文本样式
  const textClass = "display-[-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] flex-[1_0_0] overflow-hidden text-ellipsis font-['PingFang_SC'] text-[13px] font-normal leading-[22px] tracking-[0.039px] outline-none bg-transparent h-full";
  const textColorClass = isGenerating ? "text-[#C3C3DA]" : (isGenerated ? "text-[#0B0B0F]" : "text-[#1D2129]");

  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[13px] text-[#3F3F51] flex items-center gap-1 font-medium">
          {required && <span className="text-[#F53F3F]">*</span>}
          {label}
        </label>
        <div className={cn(outerContainerClass, "h-[120px] p-0")}>
          <div className={cn(innerContainerClass, "h-full px-[12px] py-[12px] items-start")}>
            <textarea 
              className={cn(textClass, textColorClass, "resize-none pb-6 !line-clamp-none")}
              placeholder={isGenerating ? '' : placeholder}
              value={value}
              readOnly
            />
            <div className="absolute right-[12px] bottom-[12px] flex items-center gap-1.5 bg-transparent z-10">
              {hasSpark && (
                <span style={{
                  WebkitMask: `url(/ai-spark.svg) no-repeat center`,
                  WebkitMaskSize: 'contain',
                  backgroundColor: 'var(--primary-border)',
                  width: '16px',
                  height: '16px'
                }} />
              )}
              <span className="text-[12px] text-[#9395AC]">{value ? value.length : 0}/1000</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[13px] text-[#3F3F51] flex items-center gap-1 font-medium">
        {required && <span className="text-[#F53F3F]">*</span>}
        {label}
      </label>
      <div className={cn(outerContainerClass, "h-[36px] p-0")}>
        <div className={cn(innerContainerClass, "h-full w-full")}>
          {type === 'select' ? (
            <div className="flex-[1_0_0] flex items-center gap-2 overflow-x-auto scrollbar-hide relative z-10 whitespace-nowrap h-full">
              {isGenerated ? (
                value.map(v => (
                  <div key={v} className="flex items-center gap-1 px-2 py-[2px] bg-white border border-[#E2E5F1] rounded text-[12px] shadow-sm text-[#1D2129] flex-shrink-0">
                    {v}
                    <X size={12} className="cursor-pointer text-[#9395AC] hover:text-[#3F3F51]" />
                  </div>
                ))
              ) : (
                <span className={cn(textClass, textColorClass, isGenerating ? 'opacity-0' : '')}>{placeholder}</span>
              )}
            </div>
          ) : (
            <input 
              className={cn(textClass, textColorClass, "relative z-10")}
              placeholder={isGenerating ? '' : placeholder}
              value={value}
              readOnly
            />
          )}
          
          <div className="flex items-center gap-[6px] flex-shrink-0 relative z-10">
            {hasSpark && (
              <span style={{
                WebkitMask: `url(/ai-spark.svg) no-repeat center`,
                WebkitMaskSize: 'contain',
                backgroundColor: 'var(--primary-border)',
                width: '16px',
                height: '16px',
                marginRight: type === 'select' ? '0' : '2px' // Adjust spacing when no chevron
              }} />
            )}
            {type === 'select' && <ChevronDown size={14} className="text-[#9395AC]" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIAssistant({ isOpen, setIsOpen }) {
  // Use window.innerWidth/Height if available, fallback to 1000/800
  const initialX = typeof window !== 'undefined' ? window.innerWidth - 96 : 904;
  const initialY = typeof window !== 'undefined' ? window.innerHeight - 136 : 664;
  
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFloatingAnimated, setIsFloatingAnimated] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: '你好！我是AIDP助手。你可以问我关于平台操作、数据处理、流程配置等任何问题。'
    }
  ]);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const draggedRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  // Randomly play animation for the floating button
  useEffect(() => {
    // Play for 3 seconds, every 12 seconds
    const interval = setInterval(() => {
      setIsFloatingAnimated(true);
      setTimeout(() => {
        setIsFloatingAnimated(false);
      }, 3000);
    }, 12000);

    // Initial play after 1 second
    const initialTimeout = setTimeout(() => {
      setIsFloatingAnimated(true);
      setTimeout(() => {
        setIsFloatingAnimated(false);
      }, 3000);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Mock AI reply
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: (
          <>
            抱歉现在我还只是个假AI😟，暂时回答不了你的问题，有疑问的话可以去找他 <span className="text-[var(--primary-color)] font-bold">@周鸿翔</span>
          </>
        )
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'ai',
        content: '你好！我是AIDP助手。你可以问我关于平台操作、数据处理、流程配置等任何问题。'
      }
    ]);
    setInputValue('');
  };

  // Handle floating button drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault(); // Prevent text selection
        
        if (!draggedRef.current) {
          const dx = e.clientX - dragStartPosRef.current.x;
          const dy = e.clientY - dragStartPosRef.current.y;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            draggedRef.current = true;
          }
        }
        
        if (draggedRef.current) {
          const newX = Math.max(0, Math.min(e.clientX - 28, window.innerWidth - 56));
          const newY = Math.max(0, Math.min(e.clientY - 28, window.innerHeight - 56));
          setPosition({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        
        if (draggedRef.current) {
          // Snap to nearest left or right edge
          let finalX = position.x;
          let finalY = position.y;
          
          const distLeft = position.x;
          const distRight = window.innerWidth - position.x - 56;
          
          if (distLeft < distRight) {
            finalX = 40;
          } else {
            finalX = window.innerWidth - 96;
          }
          
          setPosition({ x: finalX, y: finalY });
        }
        
        // Reset flag after a small delay to avoid firing onClick
        setTimeout(() => {
          draggedRef.current = false;
        }, 50);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection during drag
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, position.x, position.y]);

  // Handle sidebar resize
  useEffect(() => {
    const handleResizeMove = (e) => {
      if (isResizing) {
        e.preventDefault();
        const newWidth = Math.max(300, Math.min(window.innerWidth - e.clientX, 800));
        setSidebarWidth(newWidth);
      }
    };

    const handleResizeUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove, { passive: false });
      window.addEventListener('mouseup', handleResizeUp);
      document.body.style.userSelect = 'none'; // Prevent text selection during resize
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeUp);
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Update initial position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isOpen && !isDragging) {
        setPosition(prev => {
          const distRight = window.innerWidth - prev.x - 56;
          // Keep it on the right edge if it was there
          if (distRight <= 40) {
            return { ...prev, x: window.innerWidth - 96 };
          }
          return prev;
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, isDragging]);

  return (
    <>
      {/* Floating Button */}
      <div 
        ref={dragRef}
        className={cn(
          "fixed w-[56px] h-[56px] rounded-full cursor-grab z-50 shadow-lg select-none",
          isDragging ? "cursor-grabbing transition-none" : "transition-all duration-300 hover:scale-105",
          isOpen ? "hidden" : "block"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => {
          if (e.button === 0) {
            dragStartPosRef.current = { x: e.clientX, y: e.clientY };
            draggedRef.current = false;
            setIsDragging(true);
          }
        }}
        onClick={(e) => {
          if (!draggedRef.current && e.detail > 0) {
            setIsOpen(true);
          }
        }}
      >
        <img src={isFloatingAnimated ? "/ai-assistant-floating.png" : "/ai-assistant-floating.png"} alt="AI Assistant" className="w-full h-full object-cover pointer-events-none rounded-full" />
      </div>

      {/* Sidebar Panel */}
      <div 
        className={cn(
          "bg-white border-l border-[#E2E5F1] z-40 flex flex-col flex-shrink-0 relative",
          isOpen ? "opacity-100" : "w-0 opacity-0 overflow-hidden",
          !isResizing && "transition-all duration-300 ease-in-out"
        )}
        style={{
          width: isOpen ? `${sidebarWidth}px` : '0px'
        }}
      >
        {/* Resize Handle */}
        {isOpen && (
          <div 
            ref={resizeRef}
            className="absolute left-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-[var(--primary-color)] hover:opacity-50 transition-colors z-50"
            onMouseDown={(e) => {
              if (e.button === 0) {
                setIsResizing(true);
              }
            }}
          />
        )}
        
        <div className="flex items-center justify-between px-[20px] py-[16px] min-w-[300px] border-b border-[#E2E5F1]">
          <div className="flex items-center gap-[6px]">
            <img src="/ai-assistant-floating.png" alt="AIDP助手" className="w-[24px] h-[24px] object-cover rounded-full" />
            <h3 className="font-['PingFang_SC'] text-[16px] font-medium leading-[24px] text-[#020814]">AIDP助手</h3>
          </div>
          <div className="flex items-center gap-[12px]">
            <img src="/ai-icon-1.svg" alt="clear" className="w-[16px] h-[16px] cursor-pointer hover:opacity-80 transition-opacity" onClick={handleClearChat} title="清空对话" />
            <img src="/ai-icon-2.svg" alt="icon2" className="w-[16px] h-[16px] cursor-pointer" />
            <div className="w-[1px] h-[16px] bg-[#C7CCD6] rounded-[1px]"></div>
            <img src="/ai-icon-3.svg" alt="icon3" className="w-[61px] h-[22px] cursor-pointer" />
            <div className="w-[1px] h-[16px] bg-[#C7CCD6] rounded-[1px]"></div>
            <img src="/ai-icon-4.svg" alt="close" className="w-[16px] h-[16px] cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)} title="关闭" />
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white flex flex-col gap-6 mb-[84px] scrollbar-hide">
          {/* Chat Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
              {msg.role === 'user' ? (
                <div className="bg-[#EDF0FF] text-[#0B0B0F] p-[12px] rounded-[12px] rounded-tr-[2px] max-w-[85%]">
                  <p className="text-[14px] leading-relaxed break-words">{msg.content}</p>
                </div>
              ) : (
                <div className="text-[#1D2129] max-w-[90%]">
                  <p className="text-[14px] leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute bottom-[20px] left-[20px] right-[20px] flex flex-col items-start gap-[8px] w-[360px] h-[44px] bg-white z-10" style={{ width: 'calc(100% - 40px)' }}>
          <div className={cn(
            "flex px-[12px] py-[8px] justify-between items-center flex-[1_0_0] self-stretch rounded-[8px] border bg-white transition-all duration-200",
            isInputFocused 
              ? "border-[var(--primary-color)] shadow-[0_0_0_2px_var(--primary-bg-hover)]" 
              : "border-[#E2E5F1] hover:border-[#C7CCD6]"
          )}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="你可以就任何平台使用问题向我提问..." 
              className="flex-1 bg-transparent border-none outline-none font-['PingFang_SC'] text-[13px] font-normal leading-[22px] tracking-[0.039px] text-[#1D2129] placeholder-[#86909C]"
            />
            <div 
              onClick={handleSendMessage}
              className={cn(
                "w-[24px] h-[24px] flex items-center justify-center rounded cursor-pointer transition-colors",
                inputValue.trim() ? "bg-[var(--primary-color)]" : "bg-[#F2F3F8]"
              )}
            >
              <img 
                src="/ai-send.svg" 
                alt="send" 
                className={cn("w-[14px] h-[14px]", !inputValue.trim() && "opacity-50 grayscale")} 
                style={inputValue.trim() ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CreateProjectModal({ isOpen, onClose, onSuccess }) {
  const [modalState, setModalState] = React.useState('initial');

  React.useEffect(() => {
    if (isOpen) setModalState('initial');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAutoFill = () => {
    setModalState('generating');
    setTimeout(() => {
      setModalState('generated');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0F]/40" onClick={onClose}>
      <div className="bg-white rounded-xl w-[640px] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#020814]">创建任务</h2>
          <button onClick={onClose} className="text-[#86909C] hover:text-[#1D2129] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
          {/* AI Banner */}
          {modalState === 'initial' && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--primary-bg-light)]">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-bg-hover)] flex items-center justify-center flex-shrink-0">
                <SparkIcon size={16} color="var(--primary-color)" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="text-[14px] font-medium text-[var(--primary-color)] no-underline">发现相关信息</div>
                <div className="text-[13px] text-[var(--primary-color)] opacity-80 leading-relaxed no-underline">
                  我检测到您刚刚创建了《医疗数据标注方案》项目，需要我帮您自动提取信息并填充表单吗？
                </div>
              </div>
              <button 
                onClick={handleAutoFill}
                className="flex items-center gap-1.5 px-4 py-[6px] text-white rounded-md text-[13px] font-medium transition-colors flex-shrink-0 cursor-pointer relative overflow-hidden group"
                style={{ background: 'var(--primary-color)' }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <SparkIcon size={14} color="currentColor" className="relative z-10" />
                <span className="relative z-10">一键填入</span>
              </button>
            </div>
          )}

          {/* Form */}
          <div className="flex flex-col gap-4">
            <FormField 
              label="任务名称" 
              required 
              state={modalState} 
              value={modalState === 'generated' ? '医疗数据标注方案' : ''} 
            />
            <div className="flex gap-4">
              <FormField 
                label="任务经理" 
                required 
                type="select" 
                placeholder="请选择"
                state={modalState} 
                value={modalState === 'generated' ? ['zhouhongxiang'] : []} 
              />
              <FormField 
                label="内容类型" 
                required 
                type="input" 
                placeholder="请输入"
                state={modalState} 
                value={modalState === 'generated' ? '标注' : ''} 
              />
            </div>
            <div className="flex gap-4">
              <FormField 
                label="任务人员" 
                required 
                type="select" 
                placeholder="请选择"
                state={modalState} 
                value={modalState === 'generated' ? ['zhouhongxiang'] : []} 
              />
              <FormField 
                label="资源类型" 
                required 
                type="input" 
                placeholder="请输入"
                state={modalState} 
                value={modalState === 'generated' ? '标注' : ''} 
              />
            </div>
            <FormField 
              label="任务描述" 
              type="textarea" 
              state={modalState} 
              value={modalState === 'generated' ? '本项目为医疗数据标注方案，围绕医学影像、临床文本等多类型医疗数据，构建标准化标注体系。严格遵循医疗数据隐私合规要求，明确标注规范、分类维度与质控流程，通过多级质检保障标注精准度，为临床辅助诊断、医学 AI 模型训练提供高质量、高合规性的标注数据集支撑。' : ''} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E5F1] flex items-center justify-between bg-white rounded-b-xl">
          {modalState === 'initial' && (
            <>
              <div></div>
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="px-5 py-[6px] border border-[#E2E5F1] rounded-md text-[#3F3F51] text-[13px] hover:bg-gray-50 transition-colors cursor-pointer">取消</button>
                <button onClick={onSuccess} className="px-5 py-[6px] text-white rounded-md text-[13px] transition-colors cursor-pointer relative overflow-hidden group" style={{ background: 'var(--primary-color)' }}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative z-10">确定</span>
                </button>
              </div>
            </>
          )}
          {modalState === 'generating' && (
            <>
              <div className="text-[13px] text-[#86909C]">AI 正在为您生成...</div>
              <button onClick={() => setModalState('initial')} className="px-5 py-[6px] border border-[#E2E5F1] rounded-md text-[#3F3F51] text-[13px] hover:bg-gray-50 transition-colors cursor-pointer">停止</button>
            </>
          )}
          {modalState === 'generated' && (
            <>
              <div className="text-[13px] text-[#3F3F51]">
                AI 已自动填入 <span className="text-[var(--primary-color)]">6</span> 个关联字段，请核对是否正确
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setModalState('initial')} className="px-5 py-[6px] border border-[#E2E5F1] rounded-md text-[#3F3F51] text-[13px] hover:bg-gray-50 transition-colors cursor-pointer">清空重填</button>
                <button onClick={onSuccess} className="px-5 py-[6px] text-white rounded-md text-[13px] transition-colors cursor-pointer relative overflow-hidden group" style={{ background: 'var(--primary-color)' }}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative z-10">确认无误</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App component
export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden text-[#1d2129]">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/task" replace />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
      <AIAssistant isOpen={isAIAssistantOpen} setIsOpen={setIsAIAssistantOpen} />
    </div>
  );
}



function Sidebar({ isExpanded, setIsExpanded }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(['数据生成']);

  const location = useLocation();
  const navigate = useNavigate();
  
  const MENU_ROUTES = {
    '/project': '项目管理',
    '/task': '任务列表',
    '/mytask': '我的任务',
    '/template': '模板管理',
    '/group': '组别管理',
    '/user': '用户列表',
    '/tag': '标签管理',
    '/team': '团队管理',
    '/permission': '权限管理',
    '/auth': '角色管理',
    '/appeal': '申诉中心',
    '/tenant': '租户管理',
  };
  
  const ROUTE_MENUS = Object.fromEntries(Object.entries(MENU_ROUTES).map(([k, v]) => [v, k]));
  
  const activeMenu = MENU_ROUTES[location.pathname] || '任务列表';

  // For initial expanded menus based on route
  useEffect(() => {
    if (['任务列表', '我的任务', '模板管理', '组别管理'].includes(activeMenu)) {
      setExpandedMenus(prev => prev.includes('数据生成') ? prev : [...prev, '数据生成']);
    } else if (['用户列表', '标签管理', '团队管理', '权限管理', '角色管理'].includes(activeMenu)) {
      setExpandedMenus(prev => prev.includes('用户管理') ? prev : [...prev, '用户管理']);
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
    const path = ROUTE_MENUS[menuName];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-full bg-sidebar border-r border-border transition-[width,padding] duration-300 ease-in-out flex flex-col z-10 flex-shrink-0",
        isExpanded ? "w-[200px]" : "w-[72px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            <svg 
              viewBox="0 0 28 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0",
                !isExpanded ? "opacity-100 group-hover:opacity-0" : "opacity-100"
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
            {!isExpanded && (
              <>
                <img 
                  src="/expand-default.svg" 
                  alt="expand" 
                  className="w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0 opacity-0 group-hover:opacity-100" 
                />
                <img 
                  src="/expand-hover.svg" 
                  alt="expand-hover" 
                  className="w-full h-full object-cover transition-opacity duration-200 absolute top-0 left-0 opacity-0 hover:opacity-100 z-10" 
                />
                {/* Expand Tooltip */}
                <div className="absolute left-[36px] top-1/2 -translate-y-1/2 bg-white text-[#0B0B0F] text-[13px] leading-[20px] font-medium px-[12px] py-[12px] rounded-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] border border-[#E2E5F1]">
                  展开
                  {/* Tooltip arrow (white) */}
                  <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-white z-10"></div>
                  {/* Tooltip arrow border (matches border color) */}
                  <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#E2E5F1]"></div>
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
        <button 
          onClick={() => setIsExpanded(false)}
          className={cn(
            "flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-200/50 cursor-pointer absolute right-4 transition-all duration-300 ease-in-out origin-right",
            isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
          )}
          style={{ width: '28px', height: '28px' }}
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Menu Items */}
      <div className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide mt-2 transition-[width,padding] duration-300 ease-in-out flex flex-col",
        isExpanded ? "px-[16px] space-y-1 w-[200px] items-stretch" : "px-[16px] items-center w-[72px]"
      )} style={{ gap: isExpanded ? '0' : '8px' }}>
        <div onClick={() => handleMenuClick('项目管理')}>
          <MenuItem 
            icon="/menu-project-management.svg" 
            label="项目管理" 
            isExpanded={isExpanded} 
            active={activeMenu === '项目管理'}
            onSubmenuClick={handleMenuClick}
          />
        </div>
        
        {/* Active Menu with Submenu (Data Generation) */}
        <div className={cn(isExpanded ? "mb-1" : "mb-0")}>
          <div onClick={() => toggleMenu('数据生成')}>
            <MenuItem 
              icon="/menu-data-generation.svg" 
              label="数据生成" 
              isExpanded={isExpanded} 
              hasArrow 
              active={!isExpanded && ['任务列表', '我的任务', '模板管理', '组别管理'].includes(activeMenu)} 
              isSubmenuExpanded={expandedMenus.includes('数据生成')}
              submenus={[
                { label: '任务列表', active: activeMenu === '任务列表' },
                { label: '我的任务', active: activeMenu === '我的任务' },
                { label: '模板管理', active: activeMenu === '模板管理' },
                { label: '组别管理', active: activeMenu === '组别管理' }
              ]}
              onSubmenuClick={handleMenuClick}
            />
          </div>
          
          {/* Submenu Items */}
          <div className={cn(
            "space-y-1 overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out origin-top",
            isExpanded && expandedMenus.includes('数据生成') ? "mt-1 max-h-[500px] opacity-100" : "max-h-0 opacity-0 m-0"
          )}>
            {[
              '任务列表',
              '我的任务',
              '模板管理',
              '组别管理'
            ].map((subItem) => (
              <div 
                key={subItem}
                onClick={() => handleMenuClick(subItem)}
                className={cn(
                  "flex items-center rounded-[8px] cursor-pointer whitespace-nowrap transition-colors",
                  activeMenu === subItem 
                    ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)] font-medium" 
                    : "text-[#555B65] hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)]"
                )}
                style={{ padding: '10px 12px 10px 40px', fontSize: '14px', lineHeight: '22px' }}
              >
                {subItem}
              </div>
            ))}
          </div>
        </div>

        {/* Active Menu with Submenu (User Management) */}
        <div className={cn(isExpanded ? "mb-1" : "mb-0")}>
          <div onClick={() => toggleMenu('用户管理')}>
            <MenuItem 
              icon="/menu-user-management.svg" 
              label="用户管理" 
              isExpanded={isExpanded} 
              hasArrow 
              active={!isExpanded && ['用户列表', '标签管理', '团队管理', '权限管理', '角色管理'].includes(activeMenu)} 
              isSubmenuExpanded={expandedMenus.includes('用户管理')}
              submenus={[
                { label: '用户列表', active: activeMenu === '用户列表' },
                { label: '标签管理', active: activeMenu === '标签管理' },
                { label: '团队管理', active: activeMenu === '团队管理' },
                { label: '权限管理', active: activeMenu === '权限管理' },
                { label: '角色管理', active: activeMenu === '角色管理' }
              ]}
              onSubmenuClick={handleMenuClick}
            />
          </div>
          
          {/* Submenu Items */}
          <div className={cn(
            "space-y-1 overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out origin-top",
            isExpanded && expandedMenus.includes('用户管理') ? "mt-1 max-h-[500px] opacity-100" : "max-h-0 opacity-0 m-0"
          )}>
            {[
              '用户列表',
              '标签管理',
              '团队管理',
              '权限管理',
              '角色管理'
            ].map((subItem) => (
              <div 
                key={subItem}
                onClick={() => handleMenuClick(subItem)}
                className={cn(
                  "flex items-center rounded-[8px] cursor-pointer whitespace-nowrap transition-colors",
                  activeMenu === subItem 
                    ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)] font-medium" 
                    : "text-[#555B65] hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)]"
                )}
                style={{ padding: '10px 12px 10px 40px', fontSize: '14px', lineHeight: '22px' }}
              >
                {subItem}
              </div>
            ))}
          </div>
        </div>

        <div onClick={() => handleMenuClick('申诉中心')}>
          <MenuItem icon="/menu-appeal-center.svg" label="申诉中心" isExpanded={isExpanded} active={activeMenu === '申诉中心'} onSubmenuClick={handleMenuClick} />
        </div>
        <div onClick={() => handleMenuClick('租户管理')}>
          <MenuItem icon="/menu-tenant-management.svg" label="租户管理" isExpanded={isExpanded} active={activeMenu === '租户管理'} onSubmenuClick={handleMenuClick} />
        </div>
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
                    icon="/user-setting-theme.svg" 
                    label="主题配置" 
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

function UserSettingItem({ icon, label, rightElement, isDestructive, hasArrow, onMenuHover }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0, left: 0 });
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('app-theme') || '#5364FF');
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
        style={{
          WebkitMask: `url(${icon}) no-repeat center`,
          WebkitMaskSize: 'contain',
          backgroundColor: color,
          width: '16px',
          height: '16px'
        }}
      />
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
      {hasArrow && label === '主题配置' && isHovered && createPortal(
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
        left: 72 // Fixed distance to align exactly next to the 72px collapsed sidebar
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
                  "ml-auto flex-shrink-0 transition-all duration-300 ease-in-out",
                  active ? "bg-[var(--primary-color)]" : "bg-[#3F3F51] group-hover:bg-[var(--primary-color)]",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                  isSubmenuExpanded ? "rotate-180" : ""
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
        <div 
          className={cn(
            "fixed bg-white rounded-lg shadow-[0_15px_35px_-2px_rgba(0,0,0,0.05),0_5px_15px_0_rgba(0,0,0,0.05)] border border-[#E2E5F1] py-2 px-1 flex flex-col transition-opacity duration-200 pointer-events-auto opacity-100"
          )}
          style={{
            zIndex: 99999, // Ensure it's above everything including fixed modals
            left: `${tooltipPos.left}px`,
            top: `${tooltipPos.top}px`,
            transform: 'translateY(-50%)',
            minWidth: '120px'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {(!submenus || submenus.length === 0) ? (
            <div 
              className={cn(
                "px-3 py-2 text-[14px] leading-[22px] font-medium whitespace-nowrap cursor-pointer rounded-md mx-1 transition-colors",
                active ? "text-[var(--primary-color)] bg-[var(--primary-bg-hover)]" : "text-[#555B65] hover:text-[var(--primary-color)] hover:bg-[var(--primary-bg-hover)]"
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (onSubmenuClick) {
                  onSubmenuClick(label);
                  setIsHovered(false);
                }
              }}
            >
              {label}
            </div>
          ) : (
            submenus.map((sub, idx) => (
              <div 
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSubmenuClick) {
                    onSubmenuClick(sub.label);
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
            ))
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

function MainContent() {
  const location = useLocation();
  const MENU_ROUTES = {
    '/project': '项目管理',
    '/task': '任务列表',
    '/mytask': '我的任务',
    '/template': '模板管理',
    '/group': '组别管理',
    '/user': '用户列表',
    '/tag': '标签管理',
    '/team': '团队管理',
    '/permission': '权限管理',
    '/auth': '角色管理',
    '/appeal': '申诉中心',
    '/tenant': '租户管理',
  };
  const activeMenuTitle = MENU_ROUTES[location.pathname] || '任务列表';

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentView, setCurrentView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('全部任务');

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 5000); // Auto close after 5 seconds
    
    // Store timer in toastMessage state or handle it properly if we need to clear it
    const mockCreatedTask = { 
      id: '7438291048573629999', 
      name: '医疗数据标注方案', 
      status: '未开始', 
      tag: '试标', 
      progress: [0, 0], 
      avatar1: '/avatar.png', 
      avatar2: '/avatar.png', 
      isFavorite: false 
    };

    setToastMessage({ 
      type: 'success', 
      text: '成功创建任务', 
      highlightText: '医疗数据标注方案', 
      timer,
      onClick: () => {
        setToastMessage(null);
        clearTimeout(timer);
        handleTaskClick(mockCreatedTask);
      }
    });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentView('detail');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white m-0 pt-[20px] pr-[20px] pl-[20px] pb-0 h-screen relative">
      {currentView === 'list' ? (
        <div className="flex-1 flex flex-col gap-[16px] overflow-hidden">
          <TitleArea onCreateClick={() => setIsCreateModalOpen(true)} title={activeMenuTitle} />
          <TabArea activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterArea />
          <TableArea onTaskClick={handleTaskClick} activeTab={activeTab} />
        </div>
      ) : (
        <TaskDetail task={selectedTask} onBack={() => setCurrentView('list')} />
      )}
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess}
      />
      {toastMessage && (
        <Toast 
          type={toastMessage.type} 
          text={toastMessage.text} 
          highlightText={toastMessage.highlightText} 
          onClose={() => setToastMessage(null)} 
          onHighlightClick={toastMessage.onClick}
        />
      )}
    </div>
  );
}

function Toast({ type, text, highlightText, onClose, onHighlightClick }) {
  return (
    <div 
      className="fixed top-[20px] left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 animate-in fade-in slide-in-from-top-4"
      style={{
        display: 'inline-flex',
        padding: '8px 12px',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '6px',
        border: '0.5px solid #E2E5F1',
        background: '#FFF',
        boxShadow: '0 15px 35px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        whiteSpace: 'nowrap' // Prevent text from wrapping
      }}
    >
      <img src="/toast-check-circle-fill.svg" alt="success" style={{ width: '16px', height: '16px' }} />
      <div className="flex items-center gap-1" style={{ fontFamily: '"PingFang SC"', fontSize: '14px', lineHeight: '22px' }}>
        <span style={{ color: '#0B0B0F', fontWeight: 400 }}>{text}</span>
        {highlightText && (
          <span 
            className={onHighlightClick ? "cursor-pointer hover:underline transition-all" : ""}
            onClick={onHighlightClick}
            style={{ color: 'var(--primary-color)', fontWeight: 500 }}
          >
            {highlightText}
          </span>
        )}
      </div>
      <button 
        onClick={onClose}
        className="flex items-center justify-center text-[#86909C] hover:text-[#1D2129] transition-colors cursor-pointer"
        style={{ width: '16px', height: '16px', marginLeft: '4px' }}
      >
        <img src="/toast-x-close.svg" alt="close" style={{ width: '14px', height: '14px' }} />
      </button>
    </div>
  );
}

function TitleArea({ onCreateClick, title = "任务管理" }) {
  return (
    <div className="flex flex-col flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <h1 
          className="font-medium" 
          style={{ 
            color: '#020814', 
            fontFamily: '"PingFang SC", sans-serif', 
            fontSize: '16px', 
            fontWeight: 500, 
            lineHeight: '24px', 
            letterSpacing: '0.048px' 
          }}
        >
          {title}
        </h1>
        <button 
          onClick={onCreateClick}
          className="flex items-center justify-center text-white transition-colors cursor-pointer group relative overflow-hidden"
          style={{ 
            background: 'var(--primary-color)',
            padding: '5px 16px',
            gap: '8px',
            borderRadius: '6px'
          }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="text-lg leading-none relative -top-[1px] z-10">+</span> 
          <span className="z-10 relative" style={{ fontSize: '13px', lineHeight: '22px' }}>创建任务</span>
        </button>
      </div>
      <p 
        style={{ 
          color: '#737A87', 
          fontFamily: '"PingFang SC", sans-serif', 
          fontSize: '13px', 
          fontWeight: 400, 
          lineHeight: '22px', 
          letterSpacing: '0.039px',
          marginTop: '4px'
        }}
      >
        创建任务、查看/编辑所有可管理的任务、分配权限
      </p>
    </div>
  );
}

function TabArea({ activeTab, setActiveTab }) {
  return (
    <div className="flex-shrink-0 h-[32px] relative flex w-full">
      <div 
        className="flex w-full items-center"
        style={{ borderBottom: '1px solid #F0F2FA', gap: '6px' }}
      >
        {/* 全部任务 Tab */}
        <div 
          className="flex items-center cursor-pointer relative z-10 transition-colors group"
          onClick={() => setActiveTab('全部任务')}
          style={activeTab === '全部任务' ? { 
            padding: '5px 16px',
            gap: '8px',
            borderRadius: '4px 4px 0 0',
            borderRight: '1px solid #F0F2FA',
            borderLeft: '1px solid #F0F2FA',
            background: '#FFF',
            boxShadow: '0 2px 0 0 var(--primary-color) inset',
            height: '100%',
            marginBottom: '-1px'
          } : {
            padding: '5px 16px',
            gap: '8px',
            borderRadius: '4px 4px 0 0',
            border: '1px solid #F0F2FA',
            borderBottom: 'none',
            background: '#F6F7FA',
            height: '100%',
            marginBottom: '-1px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== '全部任务') {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = 'var(--primary-color)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== '全部任务') {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = '#86909c';
            }
          }}
        >
          <span 
            className="transition-colors" 
            style={{ 
              fontSize: '13px', 
              lineHeight: '22px', 
              color: activeTab === '全部任务' ? 'var(--primary-color)' : '#86909c', 
              fontWeight: activeTab === '全部任务' ? 'bold' : 'normal' 
            }}
          >
            全部任务
          </span>
        </div>
        
        {/* 我的收藏 Tab */}
        <div 
          className="flex items-center cursor-pointer transition-colors group relative z-10"
          onClick={() => setActiveTab('我的收藏')}
          style={activeTab === '我的收藏' ? { 
            padding: '5px 16px',
            gap: '8px',
            borderRadius: '4px 4px 0 0',
            borderRight: '1px solid #F0F2FA',
            borderLeft: '1px solid #F0F2FA',
            background: '#FFF',
            boxShadow: '0 2px 0 0 var(--primary-color) inset',
            height: '100%',
            marginBottom: '-1px'
          } : {
            padding: '5px 16px',
            gap: '8px',
            borderRadius: '4px 4px 0 0',
            border: '1px solid #F0F2FA',
            borderBottom: 'none',
            background: '#F6F7FA',
            height: '100%',
            marginBottom: '-1px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== '我的收藏') {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = 'var(--primary-color)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== '我的收藏') {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = '#86909c';
            }
          }}
        >
          <span 
            className="transition-colors" 
            style={{ 
              fontSize: '13px', 
              lineHeight: '22px', 
              color: activeTab === '我的收藏' ? 'var(--primary-color)' : '#86909c', 
              fontWeight: activeTab === '我的收藏' ? 'bold' : 'normal' 
            }}
          >
            我的收藏
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterArea() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [hoverFilter, setHoverFilter] = useState(null);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('全部');
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const typeMenuRef = useRef(null);
  const typeSelectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(event.target)) {
        setIsTypeMenuOpen(false);
        setActiveFilter((prev) => (prev === 'filter3' ? null : prev));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isTypeMenuOpen && typeSelectorRef.current) {
      setDropdownWidth(typeSelectorRef.current.offsetWidth);
    }
  }, [isTypeMenuOpen]);

  const getFilterInputStyle = (id) => {
    if (activeFilter === id) {
      return {
        borderRadius: '0 6px 6px 0',
        background: '#FFF',
        boxShadow: '0 0 0 3px var(--primary-shadow), 0 0 0 1px var(--primary-border)'
      };
    }
    if (hoverFilter === id) {
      return {
        borderRadius: '0 6px 6px 0',
        background: '#FFF',
        boxShadow: '0 0 0 1px var(--primary-color)'
      };
    }
    return {
      borderRadius: '0 6px 6px 0',
      background: '#FFF',
      boxShadow: '0 0 0 1px #E2E5F1'
    };
  };

  const getFilterLabelStyle = (id) => {
    return {
      borderRadius: '6px 0 0 6px',
      background: '#FFF',
      boxShadow: '0 0 0 1px #E2E5F1'
    };
  };

  return (
    <div className="flex items-center justify-between flex-shrink-0 w-full p-[2px]">
      {/* Left side filters */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        
        {/* Filter Item 1 */}
        <div 
          className="flex items-center transition-all relative"
          style={{ 
            width: '280px', 
            height: '32px', 
          }}
          onMouseEnter={() => setHoverFilter('filter1')}
          onMouseLeave={() => setHoverFilter(null)}
        >
          <div 
            className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10"
            style={getFilterLabelStyle('filter1')}
          >
            <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '13px', lineHeight: '22px' }}>任务名称</span>
          </div>
          <div 
            className="flex-1 flex items-center h-full px-3 transition-all relative z-20 -ml-[1px]"
            style={getFilterInputStyle('filter1')}
          >
            <input 
              type="text" 
              placeholder="搜索" 
              className="w-full outline-none bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
              style={{ fontSize: '13px', lineHeight: '22px' }}
              onFocus={() => setActiveFilter('filter1')}
              onBlur={() => setActiveFilter(null)}
            />
          </div>
        </div>

        {/* Filter Item 2 */}
        <div 
          className="flex items-center transition-all relative"
          style={{ 
            width: '280px', 
            height: '32px', 
          }}
          onMouseEnter={() => setHoverFilter('filter2')}
          onMouseLeave={() => setHoverFilter(null)}
        >
          <div 
            className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10"
            style={getFilterLabelStyle('filter2')}
          >
            <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '13px', lineHeight: '22px' }}>任务ID</span>
          </div>
          <div 
            className="flex-1 flex items-center h-full px-3 transition-all relative z-20 -ml-[1px]"
            style={getFilterInputStyle('filter2')}
          >
            <input 
              type="text" 
              placeholder="回车分隔" 
              className="w-full outline-none bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
              style={{ fontSize: '13px', lineHeight: '22px' }}
              onFocus={() => setActiveFilter('filter2')}
              onBlur={() => setActiveFilter(null)}
            />
          </div>
        </div>

        {/* Filter Item 3 (Select) */}
        <div 
          ref={typeMenuRef}
          className="flex items-center cursor-pointer transition-all relative"
          style={{ 
            width: '280px', 
            height: '32px', 
          }}
          onMouseEnter={() => setHoverFilter('filter3')}
          onMouseLeave={() => setHoverFilter(null)}
          onClick={() => {
            setActiveFilter(activeFilter === 'filter3' ? null : 'filter3');
            setIsTypeMenuOpen(!isTypeMenuOpen);
          }}
        >
          <div 
            className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10"
            style={getFilterLabelStyle('filter3')}
          >
            <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '13px', lineHeight: '22px' }}>试标/正式</span>
          </div>
          <div 
            ref={typeSelectorRef}
            className="flex-1 flex items-center justify-between h-full px-3 transition-all relative z-20 -ml-[1px]"
            style={getFilterInputStyle('filter3')}
          >
            <span className="text-[#0B0B0F]" style={{ fontSize: '13px', lineHeight: '22px' }}>{selectedType}</span>
            <ChevronDown size={14} className={cn("text-gray-400 ml-2 flex-shrink-0 transition-transform duration-200", isTypeMenuOpen && "rotate-180")} />
          </div>

          {/* Custom Dropdown Menu */}
          {isTypeMenuOpen && (
            <div 
              className="absolute z-[9999] flex flex-col items-start bg-[#FFF] border border-[#ECEEF9]"
              style={{
                width: `${dropdownWidth}px`, // Exactly matching the selector part
                padding: '6px',
                gap: '4px',
                right: 0, // Align to the right edge
                top: 'calc(100% + 4px)',
                borderRadius: '8px',
                boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {['全部', '试标', '正式'].map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-[6px] self-stretch cursor-pointer transition-colors text-[#0B0B0F]"
                  style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '14px', lineHeight: '22px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F1F2F9';
                    e.currentTarget.style.borderRadius = '4px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFF';
                    e.currentTarget.style.borderRadius = '6px';
                  }}
                  onClick={() => {
                    setSelectedType(type);
                    setIsTypeMenuOpen(false);
                    setActiveFilter(null);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center" style={{ gap: '12px' }}>
        <FilterIconButton icon={Filter} />
        <FilterIconButton icon={Settings} />
      </div>
    </div>
  );
}

function TableArea({ onTaskClick, activeTab }) {
  const namesPool = ["周鸿翔", "吴雅迪", "杨雪妮", "陈庆安", "郑强", "王孟玉", "陈奕安", "王孟玉", "姜格", "熊磊", "易永康", "林双", "张嘉莹", "徐小博", "宋润斐"];
  let nameIndex = 0;
  const getName = () => {
    if (nameIndex < namesPool.length) {
      return namesPool[nameIndex++];
    }
    return "zhouhongxiang";
  };

  const rawData = [
    { id: '7438291048573629104', name: 'GroundingBOX考试队列', status: '进行中', tag: '试标', progress: [72, 45], avatar1: '/avatar.png', avatar2: '/cat2.jpg', isFavorite: false },
    { id: '7438291048573629105', name: '多模态通用筛图-RL药盒筛图队列-多任务通用队列-国产文字不清药盒-2026.03.14', status: '已结束', tag: '正式', progress: [100, 100], avatar1: '/cat3.jpg', avatar2: '/avatar.png', isFavorite: false },
    { id: '7438291048573629106', name: '基模RL-报告-正式队列-筛图-多任务通用队列-客厅桌子整理-2026.03.18', status: '未开始', tag: '试标', progress: [100, 100], avatar1: '/cat5.jpg', avatar2: '/cat6.jpg', isFavorite: false },
    { id: '7438291048573629107', name: 'VQA-报告-复杂', status: '暂停中', tag: '试标', progress: [0, 0], avatar1: '/avatar.png', avatar2: '/cat4.jpg', isFavorite: false },
    { id: '7438291048573629108', name: 'VQA-报告-简单', status: '进行中', tag: '试标', progress: [0, 0], avatar1: '/cat2.jpg', avatar2: '/cat1.jpg', isFavorite: false },
    { id: '7438291048573629109', name: 'VQA-物品标注', status: '进行中', tag: '正式', progress: [83, 73], avatar1: '/cat4.jpg', avatar2: '/avatar.png', isFavorite: false },
    { id: '7438291048573629110', name: 'VQA-患处标注', status: '进行中', tag: '正式', progress: [83, 73], avatar1: '/avatar.png', avatar2: '/cat5.jpg', isFavorite: false },
    { id: '7438291048573629111', name: 'RL影像作业队列3', status: '进行中', tag: '正式', progress: [83, 73], avatar1: '/cat1.jpg', avatar2: '/cat7.jpg', isFavorite: false },
    { id: '7438291048573629112', name: 'RL影像作业队列2', status: '进行中', tag: '正式', progress: [100, 100], avatar1: '/avatar.png', avatar2: '/cat3.jpg', isFavorite: false },
    { id: '7438291048573629113', name: 'RL影像作业队列1', status: '进行中', tag: '正式', progress: [100, 100], avatar1: '/cat6.jpg', avatar2: '/avatar.png', isFavorite: false },
    { id: '7438291048573629114', name: 'VQA-物品标注补充', status: '进行中', tag: '试标', progress: [50, 20], avatar1: '/cat1.jpg', avatar2: '/cat4.jpg', isFavorite: false },
    { id: '7438291048573629115', name: '多模态筛图补充', status: '未开始', tag: '正式', progress: [0, 0], avatar1: '/avatar.png', avatar2: '/cat5.jpg', isFavorite: false },
    { id: '7438291048573629116', name: 'RL影像作业队列4', status: '暂停中', tag: '试标', progress: [30, 10], avatar1: '/cat7.jpg', avatar2: '/cat2.jpg', isFavorite: false },
    { id: '7438291048573629117', name: 'GroundingBOX二期', status: '进行中', tag: '正式', progress: [10, 5], avatar1: '/cat3.jpg', avatar2: '/avatar.png', isFavorite: false },
    { id: '7438291048573629118', name: 'VQA-复杂场景测试', status: '已结束', tag: '试标', progress: [100, 100], avatar1: '/cat5.jpg', avatar2: '/cat1.jpg', isFavorite: false },
  ];

  const data = rawData.map(item => ({
    ...item,
    creatorName: getName(),
    modifierName: getName()
  }));

  // Hidden favorites from "other pages"
  const rawHiddenFavorites = [
    { id: '7438291048573629201', name: '大模型预训练-多模态通用评测-第三期', status: '进行中', tag: '正式', progress: [45, 30], avatar1: '/cat1.jpg', avatar2: '/cat2.jpg', isFavorite: true },
    { id: '7438291048573629202', name: 'LLM-数学推理逻辑校验队列-补充包', status: '进行中', tag: '正式', progress: [80, 75], avatar1: '/cat3.jpg', avatar2: '/cat4.jpg', isFavorite: true },
    { id: '7438291048573629203', name: 'VQA-多轮对话-金融领域专业术语-2026.04', status: '已结束', tag: '试标', progress: [100, 100], avatar1: '/cat5.jpg', avatar2: '/cat6.jpg', isFavorite: true },
    { id: '7438291048573629204', name: '医疗报告OCR识别与信息提取优化', status: '暂停中', tag: '试标', progress: [12, 0], avatar1: '/cat7.jpg', avatar2: '/avatar.png', isFavorite: true },
    { id: '7438291048573629205', name: '自动驾驶-3D点云行人车辆标注队列', status: '进行中', tag: '正式', progress: [95, 90], avatar1: '/avatar.png', avatar2: '/cat1.jpg', isFavorite: true },
  ];

  const hiddenFavorites = rawHiddenFavorites.map(item => ({
    ...item,
    creatorName: getName(),
    modifierName: getName()
  }));

  const displayData = activeTab === '我的收藏' ? hiddenFavorites : data;

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 0);
  };

  const columns = (
    <colgroup>
      <col style={{ width: '38px', minWidth: '38px' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: '100px', minWidth: '100px' }} />
      <col style={{ width: '15%', minWidth: '168px' }} />
      <col style={{ width: '15%', minWidth: '168px' }} />
      <col style={{ width: '138px', minWidth: '138px' }} />
      <col style={{ width: '142px', minWidth: '142px' }} />
    </colgroup>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full h-full pb-4">
      <div 
        className="flex-1 flex flex-col bg-white overflow-hidden"
        style={{
          borderRadius: '8px',
          border: '1px solid #EAEDF1',
          marginBottom: '16px'
        }}
      >
        {/* Table Header (Fixed) */}
        <div 
          className="flex-shrink-0 transition-shadow duration-200 z-10"
          style={{ 
            background: '#F6F7FA',
            boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
            overflowY: 'scroll', // Match scrollbar width to body
            scrollbarGutter: 'stable',
            scrollbarWidth: 'none' // Hide visually but keep spacing
          }}
        >
          <table className="w-full text-left border-collapse min-w-[1000px] m-0" style={{ tableLayout: 'fixed' }}>
            {columns}
            <thead>
              <tr style={{ height: '40px' }}>
                <th style={{ padding: '5px 10px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}></th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}>任务名称</th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}>任务状态</th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}>任务创建</th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}>任务修改</th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1' }}>
                  标注/完成进度 <span className="inline-block ml-1 w-3 h-3 rounded-full border border-gray-400 text-[10px] leading-[10px] text-center text-gray-400 font-bold" style={{ fontWeight: 'normal' }}>i</span>
                </th>
                <th style={{ padding: '5px 16px', color: '#42464E', fontSize: '13px', lineHeight: '22px', fontWeight: 'bold', borderBottom: '1px solid #EAEDF1', position: 'sticky', right: 0, background: '#F6F7FA', zIndex: 2 }}>操作</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body (Scrollable) */}
        <div 
          className="flex-1 overflow-auto overscroll-none"
          onScroll={handleScroll}
          style={{ scrollbarGutter: 'stable' }}
        >
          <table className="w-full text-left border-collapse min-w-[1000px] m-0 h-full" style={{ tableLayout: 'fixed' }}>
            {columns}
            <tbody className="align-middle">
              {displayData.map((row, idx) => (
                <TableRow key={row.id} data={row} isLast={idx === displayData.length - 1} onTaskClick={() => onTaskClick(row)} />
              ))}
              {/* Empty space filler to push rows to top if they don't fill the height */}
              <tr style={{ height: 'auto' }}>
                <td colSpan="7" style={{ border: 'none', padding: 0 }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end items-center flex-shrink-0">
        <Pagination />
      </div>
    </div>
  );
}

function TableRow({ data, isLast, onTaskClick }) {
  const [tooltipPos, setTooltipPos] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [actionMenuPos, setActionMenuPos] = useState(null);
  const timeoutRef = React.useRef(null);
  const actionTimeoutRef = React.useRef(null);

  const handleMouseEnter = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top,
      left: rect.left,
    });
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipPos(null);
    }, 150);
  };

  const handleCopy = async (id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(id.toString());
      } else {
        // Fallback for non-HTTPS (e.g. local network IP)
        const textArea = document.createElement("textarea");
        textArea.value = id.toString();
        // Move outside of viewport
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleActionMouseEnter = (e) => {
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setActionMenuPos({
      top: rect.bottom,
      left: rect.left,
    });
  };

  const handleActionMouseLeave = () => {
    actionTimeoutRef.current = setTimeout(() => {
      setActionMenuPos(null);
    }, 150);
  };

  // Status config
  const statusMap = {
    '进行中': { 
      color: '#2C2C77', 
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="var(--primary-color)"/>
          <path d="M7 3.5V7L9.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    '已结束': { 
      color: '#2E5F57', 
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#00AA2A"/>
          <path d="M4 7.5L6 9.5L10 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    '未开始': { 
      color: '#3F3F51', 
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#C4C6CC"/>
          <path d="M4 7H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    '暂停中': { 
      color: '#6D4019', 
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#FF7D00"/>
          <path d="M7 3.5V7.5M7 10.5H7.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };
  const st = statusMap[data.status];

  // Tag config
  const isTrial = data.tag === '试标';
  const tagStyle = isTrial 
    ? { bg: '#E1F6E6', color: '#237040' } 
    : { bg: 'var(--primary-bg-hover, #EBF1FF)', color: 'var(--primary-color)' };

  return (
    <tr 
      className={cn("transition-colors group")}
      style={{ 
        height: '56px', 
        borderBottom: !isLast ? '1px solid #EAEDF1' : 'none',
        background: '#FFF'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#FFF'; }}
    >
      <td style={{ padding: '10px 10px' }}>
        <Star 
          size={16} 
          color={data.isFavorite ? "#FAC515" : "#A7ADB9"}
          fill={data.isFavorite ? "#FAC515" : "none"}
          className="cursor-pointer transition-colors"
          onMouseEnter={(e) => { 
            e.currentTarget.style.color = '#FAC515'; 
            if (!data.isFavorite) {
              e.currentTarget.setAttribute('fill', 'none'); // keep fill none on hover if not favorite, just outline yellow, or you can make it solid yellow. Let's make it yellow.
            }
          }}
          onMouseLeave={(e) => { 
            if (!data.isFavorite) {
              e.currentTarget.style.color = '#A7ADB9'; 
            }
          }}
        />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <div className="flex" style={{ gap: '8px' }}>
          <span 
            style={{ 
              background: tagStyle.bg, 
              color: tagStyle.color,
              fontSize: '12px',
              lineHeight: '22px', // Match text line-height for vertical alignment
              height: '22px', // Match text line-height
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 6px',
              borderRadius: '4px',
              fontWeight: 'bold',
              flexShrink: 0 // Prevent tag from squishing
            }}
          >
            {data.tag}
          </span>
          <div 
            className="text-[var(--primary-color)] hover:underline cursor-pointer pr-4 line-clamp-2 inline-block" 
            style={{ fontSize: '13px', lineHeight: '22px', fontWeight: 'normal' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onTaskClick}
          >
            {data.name}
          </div>
        </div>
        {tooltipPos && (
          <div
            className="fixed z-[100] flex flex-col items-start bg-white"
            style={{
              top: `${tooltipPos.top - 8}px`,
              left: `${tooltipPos.left}px`,
              transform: 'translateY(-100%)',
              padding: '12px',
              gap: '4px',
              borderRadius: '8px',
              boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid #E2E5F1',
              width: 'max-content',
              maxWidth: '300px',
              pointerEvents: 'auto'
            }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ color: '#0B0B0F', fontSize: '13px', lineHeight: '20px', fontWeight: 500, whiteSpace: 'normal', wordBreak: 'break-all' }}>
              {data.name}
            </div>
            <div className="flex items-center gap-2" style={{ color: '#86909C', fontSize: '12px', lineHeight: '20px' }}>
              <span>任务 ID：{data.id}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(data.id);
                }}
                className="flex items-center justify-center text-[#86909C] hover:text-[var(--primary-color)] transition-colors cursor-pointer"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        )}
        {showToast && createPortal(
          <div className="fixed top-[20px] left-1/2 z-[999999]" style={{ marginLeft: '-40px' }}>
            <Toast
              type="success"
              text="已复制"
              onClose={() => setShowToast(false)}
            />
          </div>,
          document.body
        )}
      </td>
      <td style={{ padding: '10px 16px' }}>
        <div className="flex items-center" style={{ gap: '4px' }}>
          {st.icon}
          <span style={{ fontSize: '12px', lineHeight: '20px', color: st.color }}>{data.status}</span>
        </div>
      </td>
      <td style={{ padding: '10px 16px' }}>
        <UserInfo avatar={data.avatar1} name={data.creatorName} />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <UserInfo avatar={data.avatar2} name={data.modifierName} />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <div className="flex flex-col justify-center space-y-1.5">
          {/* Top Bar (Annotation) */}
          <div className="flex items-center" style={{ gap: '6px' }}>
            <div style={{ width: '48px', height: '6px', backgroundColor: '#E5E8EF', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${data.progress[0]}%`, height: '100%', backgroundColor: data.progress[0] === 100 ? '#00AA2A' : 'var(--primary-color)', borderRadius: '3px' }}></div>
            </div>
            <span style={{ fontSize: '12px', color: '#86909c' }}>{data.progress[0]}%</span>
          </div>
          {/* Bottom Bar (Completion) */}
          <div className="flex items-center" style={{ gap: '6px' }}>
            <div style={{ width: '48px', height: '6px', backgroundColor: '#E5E8EF', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${data.progress[1]}%`, height: '100%', backgroundColor: data.progress[1] === 100 ? '#00AA2A' : 'var(--primary-color)', borderRadius: '3px' }}></div>
            </div>
            <span style={{ fontSize: '12px', color: '#86909c' }}>{data.progress[1]}%</span>
          </div>
        </div>
      </td>
      <td style={{ padding: '10px 16px', position: 'sticky', right: 0, background: 'inherit', zIndex: 1, boxShadow: '-1px 0 0 0 #EAEDF1' }}>
        <div className="flex items-center relative" style={{ gap: '16px' }}>
          {data.status === '未开始' ? (
            <>
              <button className="text-[var(--primary-color)] hover:underline table-action-btn" style={{ fontSize: '13px' }}>启动</button>
              <button className="text-[var(--primary-color)] hover:underline table-action-btn" style={{ fontSize: '13px' }}>复制</button>
            </>
          ) : (
            <>
              <button className="text-[var(--primary-color)] hover:underline table-action-btn" style={{ fontSize: '13px' }}>编辑</button>
              <button className="text-[var(--primary-color)] hover:underline table-action-btn" style={{ fontSize: '13px' }}>复制</button>
            </>
          )}
          <div 
            className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded" 
            style={{ width: '24px', height: '24px' }}
            onMouseEnter={handleActionMouseEnter}
            onMouseLeave={handleActionMouseLeave}
          >
            <MoreHorizontal size={16} color="#3F3F51" />
          </div>
          {actionMenuPos && createPortal(
            <div
              className="fixed z-[99999] flex flex-col bg-white"
              style={{
                top: `${actionMenuPos.top + 4}px`,
                left: `${actionMenuPos.left}px`,
                transform: 'translateX(-50%)',
                padding: '4px',
                gap: '4px',
                borderRadius: '8px',
                boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
                border: '1px solid #E2E5F1',
                width: 'max-content',
                minWidth: '80px',
                pointerEvents: 'auto'
              }}
              onMouseEnter={() => {
                if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
              }}
              onMouseLeave={handleActionMouseLeave}
            >
              {data.status === '未开始' && <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">编辑</div>}
              {data.status !== '未开始' && <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">启动</div>}
              <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">暂停</div>
              <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">结束</div>
              <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">删除</div>
            </div>,
            document.body
          )}
        </div>
      </td>
    </tr>
  );
}

function UserInfo({ avatar, name = "zhouhongxiang" }) {
  return (
    <UserHoverWrapper name={name} avatar={avatar}>
      <div className="flex items-center cursor-pointer" style={{ gap: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f0f0f0', flexShrink: 0 }}>
          <img 
            src={avatar || "/avatar.png"} 
            alt="avatar" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div style={{ color: '#3F3F51', fontSize: '13px', lineHeight: '22px' }}>{name}</div>
          <div style={{ color: '#9395AC', fontSize: '12px', lineHeight: '20px' }}>2026.03.12 12:24</div>
        </div>
      </div>
    </UserHoverWrapper>
  );
}

function PaginationButton({ children, active, disabled, isIcon }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  let styles = {
    display: 'flex',
    width: '24px',
    height: '24px',
    padding: active ? '2px 9px' : '1px 8px',
    flexDirection: 'column',
    alignItems: active ? 'flex-start' : 'center',
    borderRadius: '6px',
    border: `1px solid ${active ? '#ACB4FF' : '#E2E5F1'}`,
    background: active ? 'var(--primary-bg-light)' : '#FFF',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    fontSize: '13px',
    lineHeight: '20px'
  };

  let contentColor = active ? 'var(--theme-color)' : '#0B0B0F';

  if (!disabled && !active) {
    if (isActive) {
      styles.padding = '2px 9px';
      styles.alignItems = 'flex-start';
      styles.border = '1px solid #ACB4FF';
      styles.background = 'var(--primary-bg-light)';
      contentColor = 'var(--theme-color)';
    } else if (isHovered) {
      styles.border = '1px solid #ACB4FF';
    }
  }

  return (
    <button
      style={styles}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setIsHovered(false);
          setIsActive(false);
        }
      }}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => {
        if (!disabled) {
          setIsActive(false);
        }
      }}
    >
      {isIcon ? (
        <div style={{ color: contentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          {children}
        </div>
      ) : (
        <span style={{ color: contentColor, fontWeight: active ? 'bold' : 'normal' }}>{children}</span>
      )}
    </button>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-end bg-white">
      <div className="flex items-center" style={{ gap: '6px' }}>
        <PaginationButton disabled isIcon>
          <ChevronLeft size={16} />
        </PaginationButton>
        <PaginationButton active>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton>4</PaginationButton>
        <PaginationButton>5</PaginationButton>
        <span className="px-1 text-gray-400" style={{ fontSize: '13px', lineHeight: '20px' }}>...</span>
        <PaginationButton>19</PaginationButton>
        <PaginationButton isIcon>
          <ChevronRight size={16} />
        </PaginationButton>
      </div>
    </div>
  );
}
