import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Filter, Settings, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Copy } from 'lucide-react';
import { cn } from './lib/utils';
import { UserHoverWrapper } from './UserHoverCard';

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

function TitleArea({ title = "我的任务" }) {
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
          <span className="z-10 relative" style={{ fontSize: '13px', lineHeight: '22px' }}>新建任务</span>
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
        查看和处理分配给我的各类数据标注与处理任务
      </p>
    </div>
  );
}

function FilterArea() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [hoverFilter, setHoverFilter] = useState(null);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('全部类型');
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
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Filter 1: 任务名称 */}
        <div 
          className="flex items-center transition-all relative"
          style={{ width: '280px', height: '32px' }}
          onMouseEnter={() => setHoverFilter('filter1')}
          onMouseLeave={() => setHoverFilter(null)}
        >
          <div className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10" style={getFilterLabelStyle('filter1')}>
            <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '13px', lineHeight: '22px' }}>任务名称</span>
          </div>
          <div className="flex-1 flex items-center h-full px-3 transition-all relative z-20 -ml-[1px]" style={getFilterInputStyle('filter1')}>
            <input 
              type="text" 
              placeholder="请输入任务名称搜索" 
              className="w-full outline-none bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
              style={{ fontSize: '13px', lineHeight: '22px' }}
              onFocus={() => setActiveFilter('filter1')}
              onBlur={() => setActiveFilter(null)}
            />
          </div>
        </div>

        {/* Filter 2: 任务类型下拉 */}
        <div 
          ref={typeMenuRef}
          className="flex items-center cursor-pointer transition-all relative"
          style={{ width: '240px', height: '32px' }}
          onMouseEnter={() => setHoverFilter('filter3')}
          onMouseLeave={() => setHoverFilter(null)}
          onClick={() => {
            setActiveFilter(activeFilter === 'filter3' ? null : 'filter3');
            setIsTypeMenuOpen(!isTypeMenuOpen);
          }}
        >
          <div className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10" style={getFilterLabelStyle('filter3')}>
            <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '13px', lineHeight: '22px' }}>任务类型</span>
          </div>
          <div 
            ref={typeSelectorRef}
            className="flex-1 flex items-center justify-between h-full px-3 transition-all relative z-20 -ml-[1px]"
            style={getFilterInputStyle('filter3')}
          >
            <span className="text-[#0B0B0F]" style={{ fontSize: '13px', lineHeight: '22px' }}>{selectedType}</span>
            <ChevronDown size={14} className={cn("text-gray-400 ml-2 flex-shrink-0 transition-transform duration-200", isTypeMenuOpen && "rotate-180")} />
          </div>

          {isTypeMenuOpen && (
            <div 
              className="absolute z-[9999] flex flex-col items-start bg-[#FFF] border border-[#ECEEF9]"
              style={{
                width: `${dropdownWidth}px`,
                padding: '6px',
                gap: '4px',
                right: 0,
                top: 'calc(100% + 4px)',
                borderRadius: '8px',
                boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {['全部类型', '数据清洗', '语料标注', '图像分割', 'OCR校对'].map((type) => (
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

      <div className="flex items-center" style={{ gap: '12px' }}>
        <FilterIconButton icon={Filter} />
        <FilterIconButton icon={Settings} />
      </div>
    </div>
  );
}

function UserInfo({ avatar, name }) {
  return (
    <UserHoverWrapper name={name} avatar={avatar}>
      <div className="flex items-center cursor-pointer" style={{ gap: '8px' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f0f0f0', flexShrink: 0 }}>
          <img 
            src={avatar || "/avatar.png"} 
            alt="avatar" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ color: '#3F3F51', fontSize: '13px', lineHeight: '22px' }}>{name}</div>
      </div>
    </UserHoverWrapper>
  );
}

function TableArea() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => setIsScrolled(e.target.scrollTop > 0);

  const rawData = [
    {
      id: 'TK-20260401',
      name: '医疗数据清洗与脱敏',
      type: '数据清洗',
      priority: '高',
      status: '进行中',
      project: '医疗数据平台',
      assignerName: '周鸿翔',
      assignerAvatar: '/avatar.png',
      deadline: '2026.04.15',
      progress: 45
    },
    {
      id: 'TK-20260402',
      name: 'LLM 逻辑推理语料标注',
      type: '语料标注',
      priority: '中',
      status: '未开始',
      project: '大模型训练',
      assignerName: '吴雅迪',
      assignerAvatar: '/cat2.jpg',
      deadline: '2026.04.20',
      progress: 0
    },
    {
      id: 'TK-20260403',
      name: '医学影像细胞分割校对',
      type: '图像分割',
      priority: '紧急',
      status: '进行中',
      project: 'Xpert AI',
      assignerName: '杨雪妮',
      assignerAvatar: '/cat3.jpg',
      deadline: '2026.04.10',
      progress: 85
    },
    {
      id: 'TK-20260404',
      name: '历史病历OCR识别修复',
      type: 'OCR校对',
      priority: '低',
      status: '已结束',
      project: 'DMC系统',
      assignerName: '陈庆安',
      assignerAvatar: '/cat4.jpg',
      deadline: '2026.03.30',
      progress: 100
    },
    {
      id: 'TK-20260405',
      name: '自动驾驶街景框选标注',
      type: '图像框选',
      priority: '中',
      status: '暂停中',
      project: '通用平台',
      assignerName: '郑强',
      assignerAvatar: '/cat5.jpg',
      deadline: '2026.05.01',
      progress: 30
    }
  ];

  const columns = (
    <colgroup>
      <col style={{ width: '100px', minWidth: '100px' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: '100px', minWidth: '100px' }} />
      <col style={{ width: '80px', minWidth: '80px' }} />
      <col style={{ width: '100px', minWidth: '100px' }} />
      <col style={{ width: '120px', minWidth: '120px' }} />
      <col style={{ width: '120px', minWidth: '120px' }} />
      <col style={{ width: '100px', minWidth: '100px' }} />
      <col style={{ width: '140px', minWidth: '140px' }} />
      <col style={{ width: '120px', minWidth: '120px' }} />
    </colgroup>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full h-full pb-4 mt-2">
      <div 
        className="flex-1 flex flex-col bg-white overflow-hidden"
        style={{ borderRadius: '8px', border: '1px solid #EAEDF1', marginBottom: '16px' }}
      >
        <div 
          className="flex-shrink-0 transition-shadow duration-200 z-10"
          style={{ 
            background: '#F6F7FA',
            boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
            overflowY: 'scroll', scrollbarGutter: 'stable', scrollbarWidth: 'none'
          }}
        >
          <table className="w-full text-left border-collapse min-w-[1100px] m-0" style={{ tableLayout: 'fixed' }}>
            {columns}
            <thead>
              <tr style={{ height: '40px' }}>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">任务ID</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">任务名称</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">任务类型</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">优先级</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">任务状态</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">所属项目</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">分配人</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">截止日期</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1]">完成进度</th>
                <th className="px-4 py-2 text-[#42464E] text-[13px] font-bold border-b border-[#EAEDF1] sticky right-0 bg-[#F6F7FA] z-[2] shadow-[-1px_0_0_0_#EAEDF1]">操作</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="flex-1 overflow-auto overscroll-none" onScroll={handleScroll} style={{ scrollbarGutter: 'stable' }}>
          <table className="w-full text-left border-collapse min-w-[1100px] m-0 h-full" style={{ tableLayout: 'fixed' }}>
            {columns}
            <tbody className="align-middle">
              {rawData.map((row, idx) => (
                <TableRow key={row.id} data={row} isLast={idx === rawData.length - 1} />
              ))}
              <tr style={{ height: 'auto' }}>
                <td colSpan="10" style={{ border: 'none', padding: 0 }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination />
    </div>
  );
}

function TableRow({ data, isLast }) {
  const statusMap = {
    '进行中': { color: '#2C2C77', iconColor: 'var(--primary-color)' },
    '已结束': { color: '#2E5F57', iconColor: '#00AA2A' },
    '未开始': { color: '#3F3F51', iconColor: '#C4C6CC' },
    '暂停中': { color: '#6D4019', iconColor: '#FF7D00' }
  };
  const st = statusMap[data.status] || statusMap['未开始'];

  const priorityMap = {
    '紧急': { color: '#F53F3F', bg: '#FFECE8' },
    '高': { color: '#FF7D00', bg: '#FFF2E8' },
    '中': { color: '#2166FF', bg: '#E8F0FF' },
    '低': { color: '#00B42A', bg: '#E8FFEA' }
  };
  const pr = priorityMap[data.priority] || priorityMap['中'];

  return (
    <tr 
      className="transition-colors group bg-white hover:bg-[#FAFBFC]"
      style={{ height: '56px', borderBottom: !isLast ? '1px solid #EAEDF1' : 'none' }}
    >
      {/* 1. 任务ID */}
      <td className="px-4 py-3">
        <span className="text-[#86909C] text-[13px] font-mono">{data.id}</span>
      </td>
      {/* 2. 任务名称 */}
      <td className="px-4 py-3">
        <div className="text-[var(--primary-color)] hover:underline cursor-pointer line-clamp-2 inline-block text-[13px] leading-[22px]">
          {data.name}
        </div>
      </td>
      {/* 3. 任务类型 */}
      <td className="px-4 py-3">
        <span className="text-[#3F3F51] text-[13px]">{data.type}</span>
      </td>
      {/* 4. 优先级 */}
      <td className="px-4 py-3">
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[12px] font-medium" style={{ background: pr.bg, color: pr.color }}>
          {data.priority}
        </span>
      </td>
      {/* 5. 任务状态 */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: st.iconColor }}></div>
          <span style={{ fontSize: '13px', color: st.color }}>{data.status}</span>
        </div>
      </td>
      {/* 6. 所属项目 */}
      <td className="px-4 py-3">
        <span className="text-[#3F3F51] text-[13px]">{data.project}</span>
      </td>
      {/* 7. 分配人 */}
      <td className="px-4 py-3">
        <UserInfo avatar={data.assignerAvatar} name={data.assignerName} />
      </td>
      {/* 8. 截止日期 */}
      <td className="px-4 py-3">
        <span className="text-[#86909C] text-[13px]">{data.deadline}</span>
      </td>
      {/* 9. 完成进度 */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 w-full pr-2">
          <div className="flex-1 h-1.5 bg-[#E5E8EF] rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${data.progress}%`, backgroundColor: data.progress === 100 ? '#00AA2A' : 'var(--primary-color)' }}
            />
          </div>
          <span className="text-[12px] text-[#86909C] w-[28px] text-right">{data.progress}%</span>
        </div>
      </td>
      {/* 10. 操作 */}
      <td className="px-4 py-3 sticky right-0 bg-inherit z-[1] shadow-[-1px_0_0_0_#EAEDF1]">
        <div className="flex items-center gap-3">
          <button className="text-[var(--primary-color)] hover:underline text-[13px]">处理</button>
          <button className="text-[var(--primary-color)] hover:underline text-[13px]">详情</button>
        </div>
      </td>
    </tr>
  );
}

function PaginationButton({ children, active, disabled, isIcon }) {
  const [isHovered, setIsHovered] = useState(false);

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

  if (!disabled && !active && isHovered) {
    styles.border = '1px solid #ACB4FF';
  }

  return (
    <button
      style={styles}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
    <div className="flex items-center justify-end bg-white pt-2">
      <div className="flex items-center" style={{ gap: '6px' }}>
        <PaginationButton disabled isIcon><ChevronLeft size={16} /></PaginationButton>
        <PaginationButton active>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <span className="px-1 text-gray-400 text-[13px]">...</span>
        <PaginationButton>8</PaginationButton>
        <PaginationButton isIcon><ChevronRight size={16} /></PaginationButton>
      </div>
    </div>
  );
}

export default function MyTask() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white m-0 pt-[20px] pr-[20px] pl-[20px] pb-0 h-full relative overflow-hidden">
      <div className="flex-1 flex flex-col gap-[16px] overflow-hidden">
        <TitleArea title="我的任务" />
        <FilterArea />
        <TableArea />
      </div>
    </div>
  );
}
