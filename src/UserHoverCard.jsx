import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const signatures = [
  "vibe coding, logic building",
  "需求按优先级处理，感谢理解",
  "Agent限流给你支招👉",
  "专注于AIDP机标节点渗透率提升！",
  "OOO回学校改论文 有事可以留言～"
];

const UserHoverCard = ({ name, avatar, onMouseLeave, onMouseEnter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Memoize signature so it doesn't change on re-render
  const signature = React.useMemo(() => {
    return signatures[Math.floor(Math.random() * signatures.length)];
  }, []);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 50);
  };

  return (
    <div 
      className="w-[320px] bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E2E5F1] overflow-hidden flex flex-col relative font-['PingFang_SC'] z-[999999]"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* Compact Sticky Header (Visible on scroll) */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-[52px] bg-white z-20 flex items-center justify-between px-4 transition-opacity duration-200 border-b border-[#E2E5F1]",
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2.5">
          <img src={avatar || '/avatar.png'} alt={name} className="w-[28px] h-[28px] rounded-full object-cover border border-[#E2E5F1]"/>
          <span className="font-bold text-[#1D2129] text-[15px]">{name}</span>
        </div>
        <MoreHorizontal size={20} className="text-[#4E5969] cursor-pointer hover:text-[#1D2129]"/>
      </div>

      {/* Scrollable Content */}
      <div 
        className="overflow-y-auto max-h-[460px] scrollbar-hide relative"
        onScroll={handleScroll}
      >
        {/* Background Area (Gradient placeholder for the image) */}
        <div className="h-[140px] relative overflow-hidden">
            <img src="/user-card-bg.png" alt="background" className="w-full h-full object-cover absolute inset-0" />
            {/* Top right icon */}
            <div className="absolute top-4 right-4 z-10 cursor-pointer text-white/90 hover:text-white mix-blend-overlay">
              <MoreHorizontal size={22} />
            </div>
        </div>

        {/* Avatar & Status Tag */}
        <div className="px-5 relative -mt-[44px] flex justify-between items-end">
          <div className="relative">
            <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center border border-[#E2E5F1] shadow-sm overflow-hidden">
                <img 
                src={avatar || '/avatar.png'} 
                alt={name} 
                className="w-[80px] h-[80px] rounded-full object-cover"
                />
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E5F1] rounded-full px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-2 z-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <Calendar size={14} className="text-[#2166FF]" />
            <span className="text-[13px] text-[#1D2129] font-medium">会议中</span>
          </div>
        </div>

        {/* Basic Info */}
        <div className="px-5 mt-3">
          <h2 className="text-[24px] font-bold text-[#1D2129] leading-snug">{name}</h2>
          <div className="text-[14px] text-[#4E5969] mt-1.5">
            {signature}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 mt-5 flex gap-2">
          <button className="flex-1 bg-[#F2F3F8] hover:bg-[#E5E6EB] transition-colors rounded-[8px] h-[42px] flex flex-col items-center justify-center gap-0.5">
            <img src="/user-card-msg.svg" alt="msg" className="w-[16px] h-[16px]" />
            <span className="text-[10px] text-[#1D2129] leading-none">消息</span>
          </button>
          <button className="flex-1 bg-[#F2F3F8] hover:bg-[#E5E6EB] transition-colors rounded-[8px] h-[42px] flex flex-col items-center justify-center gap-0.5">
            <img src="/user-card-audio.svg" alt="audio" className="w-[16px] h-[16px]" />
            <span className="text-[10px] text-[#1D2129] leading-none">语音</span>
          </button>
          <button className="flex-1 bg-[#F2F3F8] hover:bg-[#E5E6EB] transition-colors rounded-[8px] h-[42px] flex flex-col items-center justify-center gap-0.5">
            <img src="/user-card-video.svg" alt="video" className="w-[16px] h-[16px]" />
            <span className="text-[10px] text-[#1D2129] leading-none">视频</span>
          </button>
        </div>

        {/* Details List */}
        <div className="px-5 mt-6 pb-6 flex flex-col gap-[16px] text-[14px] leading-[22px]">
          <div className="flex gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">所属部门</span>
            <span className="text-[#1D2129]">AI数据与安全-数据工程与平台-平台产品-数据标注-基础平台</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">直属上级</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">宋兆斌</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">人员类型</span>
            <span className="text-[#1D2129]">正式</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">OKR</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">查看详情</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">邮箱</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">wuyadi@bytedance.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">随时反馈</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">给 Ta 反馈</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">日历</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">查看日程</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">城市</span>
            <span className="text-[#1D2129]">北京</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">备注与描述</span>
            <span className="text-[#86909C]">编辑内容</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[72px] text-[#86909C] flex-shrink-0">People</span>
            <span className="text-[#2166FF] cursor-pointer hover:underline">查看详情</span>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div className="border-t border-[#E2E5F1] py-3.5 flex justify-center bg-white z-10">
        <button className="text-[#2166FF] text-[14px] font-medium hover:text-[#1952CC] transition-colors">
          查看更多信息
        </button>
      </div>
    </div>
  );
};

export const UserHoverWrapper = ({ name, avatar, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const rect = wrapperRef.current.getBoundingClientRect();
    
    // Calculate position
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const cardHeight = 480; // estimated max height
    const cardWidth = 320;
    
    // Default to show below
    let top = rect.bottom + 8;
    // If not enough space below, but enough above, show above
    if (spaceBelow < cardHeight && spaceAbove > cardHeight) {
      top = rect.top - cardHeight - 8;
    }
    
    // Ensure it doesn't go off the right edge
    let left = rect.left;
    if (left + cardWidth > window.innerWidth) {
      left = window.innerWidth - cardWidth - 16;
    }

    setPos({ top, left });
    
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 300); // Delay before showing
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay before hiding, allows moving mouse into the card
  };

  return (
    <div 
      className="inline-flex"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isOpen && createPortal(
        <div 
          className="fixed z-[999999] animate-in fade-in zoom-in-95 duration-200"
          style={{ top: pos.top, left: pos.left }}
        >
          <UserHoverCard 
            name={name} 
            avatar={avatar} 
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          />
        </div>,
        document.body
      )}
    </div>
  );
};
