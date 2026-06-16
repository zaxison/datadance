import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Check, Plus, Star, Copy } from 'lucide-react';
import { cn } from './lib/utils';
import { UserHoverWrapper } from './UserHoverCard';

const AI_RECOMMENDED_TEMPLATES = [
  { id: 'a1', title: '音频cot', desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复', uses: 1200, tags: ['语音', '对话与交互'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80', isAi: true },
  { id: 'a2', title: '机器人操作轨迹', desc: '针对视频中机器人的操作轨迹进行标记，包括关键片段的起止时间，任务', uses: 856, tags: ['视频', '连续帧追踪'], image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80', isAi: true },
  { id: 'a3', title: '同传换翻译模板', desc: '还没有相关描述哦，请预览模板', uses: 342, tags: ['文本', '转写'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80', isAi: true },
  { id: 'a4', title: '视频抽帧图片打标', desc: '将视频分解为序列帧，在帧上添加标签，指明用户在当前帧进行的图形界', uses: 2100, tags: ['视频', '图片', '画框标注'], image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&q=80', isAi: true },
  { id: 'a5', title: '3D数据评分', desc: '针对 3d 资产在几何、复杂度、结构、贴图等维度进行打分，筛选出高质量', uses: 150, tags: ['3D', '评估'], image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500&q=80', isAi: true },
];

const MY_TEMPLATES = [
  { id: 'm1', title: '基础文本分类模板', templateId: 'TPL-202605-001', desc: '用于基础的文本情感分析和主题分类', type: 'Neeko', creator: { name: '张三', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }, createTime: '2026-05-20 14:30', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&q=80' },
  { id: 'm2', title: '多模态对齐校验', templateId: 'TPL-202605-002', desc: '图文对齐打分与人工校对专用模板', type: 'Vibecoding', creator: { name: '李四', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' }, createTime: '2026-05-25 09:15', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80' },
];

const TAG_CATEGORIES = {
  '格式': ['多模态', '文本', '图片', '语音', '视频', '3D'],
  '场景': ['分类与打标', '信息抽取', '撰写与生成', '评估', '排序', '画框标注', '连续帧追踪', '区域分割', '转写', '对话与交互', '校划与审核']
};

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('AI 推荐');
  const [favorites, setFavorites] = useState(new Set());
  
  // Filters for AI Tab
  const [aiSearch, setAiSearch] = useState('');
  const [aiSort, setAiSort] = useState('按热度排序');
  const [isAiSortOpen, setIsAiSortOpen] = useState(false);
  const [aiTags, setAiTags] = useState(new Set());
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);

  // Filters for My/Favorites Tab
  const [myType, setMyType] = useState('全部');
  const [isMyTypeOpen, setIsMyTypeOpen] = useState(false);
  const [mySearch, setMySearch] = useState('');
  const [mySort, setMySort] = useState('时间由近到远');
  const [isMySortOpen, setIsMySortOpen] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [previewTpl, setPreviewTpl] = useState(null);

  // Click outside handlers
  const aiSortRef = useRef(null);
  const tagFilterRef = useRef(null);
  const myTypeRef = useRef(null);
  const mySortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiSortRef.current && !aiSortRef.current.contains(event.target)) setIsAiSortOpen(false);
      if (tagFilterRef.current && !tagFilterRef.current.contains(event.target)) setIsTagFilterOpen(false);
      if (myTypeRef.current && !myTypeRef.current.contains(event.target)) setIsMyTypeOpen(false);
      if (mySortRef.current && !mySortRef.current.contains(event.target)) setIsMySortOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) newFavs.delete(id);
      else newFavs.add(id);
      return newFavs;
    });
  };

  const toggleTag = (tag) => {
    setAiTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) newTags.delete(tag);
      else newTags.add(tag);
      return newTags;
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-[20px] bg-white text-[#020814]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center">
          <button onClick={() => navigate('/template')} className="mr-4 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-medium">创建任务</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center space-x-2">
          <StepItem num="1" label="基础信息" state="completed" />
          <div className="w-10 h-[1px] bg-[var(--primary-color)]"></div>
          <StepItem num="2" label="作业页面" state="active" />
          <div className="w-10 h-[1px] bg-gray-200"></div>
          <StepItem num="3" label="作业流程" state="pending" />
        </div>

        <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors">
          切换到旧版本
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-100 mb-4 flex-shrink-0">
        {['AI 推荐', '我的模板', '我的收藏'].map(tab => (
          <div
            key={tab}
            className={cn(
              "px-4 py-3 cursor-pointer text-sm font-medium relative transition-colors",
              activeTab === tab ? "text-[var(--primary-color)]" : "text-gray-500 hover:text-gray-800"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-color)] rounded-t-md"></div>
            )}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex justify-end items-center mb-6 flex-shrink-0 gap-3">
        {activeTab === 'AI 推荐' ? (
          <>
            {/* Search */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="搜索模板名称"
                value={aiSearch}
                onChange={(e) => setAiSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-[6px] bg-gray-50 border border-transparent rounded-md text-sm focus:bg-white focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Sort */}
            <div className="relative" ref={aiSortRef}>
              <button 
                onClick={() => setIsAiSortOpen(!isAiSortOpen)}
                className="flex items-center justify-between px-3 py-[6px] border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50 min-w-[120px]"
              >
                <span>{aiSort}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </button>
              {isAiSortOpen && (
                <div className="absolute top-full mt-1 right-0 w-full bg-white border border-gray-100 rounded-md shadow-lg z-50 py-1">
                  {['按热度排序', '按更新时间排序'].map(opt => (
                    <div 
                      key={opt} 
                      className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      onClick={() => { setAiSort(opt); setIsAiSortOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="relative" ref={tagFilterRef}>
              <button 
                onClick={() => setIsTagFilterOpen(!isTagFilterOpen)}
                className="flex items-center justify-between px-3 py-[6px] border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50"
              >
                <span>标签筛选 {aiTags.size > 0 && `(${aiTags.size})`}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </button>
              {isTagFilterOpen && (
                <div className="absolute top-full mt-1 right-0 w-[400px] bg-white border border-gray-100 rounded-md shadow-lg z-50 p-4">
                  {Object.entries(TAG_CATEGORIES).map(([cat, tags]) => (
                    <div key={cat} className="mb-4 last:mb-0">
                      <div className="text-xs text-gray-400 mb-2">{cat}</div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <div 
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "px-3 py-1 text-xs rounded-full cursor-pointer transition-colors border",
                              aiTags.has(tag) 
                                ? "bg-[var(--primary-bg-hover)] text-[var(--primary-color)] border-[var(--primary-color)]" 
                                : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
                            )}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => setAiTags(new Set())}
                      className="text-xs text-gray-500 hover:text-gray-800 mr-4"
                    >
                      清空
                    </button>
                    <button 
                      onClick={() => setIsTagFilterOpen(false)}
                      className="px-4 py-1.5 bg-[var(--primary-color)] text-white text-xs rounded-md hover:opacity-90"
                    >
                      确定
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Search */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="搜索模板名称"
                value={mySearch}
                onChange={(e) => setMySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-[6px] bg-gray-50 border border-transparent rounded-md text-sm focus:bg-white focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Type Filter */}
            <div className="relative" ref={myTypeRef}>
              <button 
                onClick={() => setIsMyTypeOpen(!isMyTypeOpen)}
                className="flex items-center justify-between px-3 py-[6px] border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50 min-w-[120px]"
              >
                <span>{myType}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </button>
              {isMyTypeOpen && (
                <div className="absolute top-full mt-1 right-0 w-full bg-white border border-gray-100 rounded-md shadow-lg z-50 py-1">
                  {['全部', 'Neeko', 'Vibecoding'].map(opt => (
                    <div 
                      key={opt} 
                      className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      onClick={() => { setMyType(opt); setIsMyTypeOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="relative" ref={mySortRef}>
              <button 
                onClick={() => setIsMySortOpen(!isMySortOpen)}
                className="flex items-center justify-between px-3 py-[6px] border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50 min-w-[140px]"
              >
                <span>{mySort}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </button>
              {isMySortOpen && (
                <div className="absolute top-full mt-1 right-0 w-full bg-white border border-gray-100 rounded-md shadow-lg z-50 py-1">
                  {['时间由近到远', '时间由远到近'].map(opt => (
                    <div 
                      key={opt} 
                      className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      onClick={() => { setMySort(opt); setIsMySortOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Cards Area */}
      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        {/* Local Toast for Copy ID */}
        {showToast && (
          <div className="fixed top-[20px] left-1/2 -translate-x-1/2 z-[999999] transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-[#E2E5F1] shadow-[0_4px_16px_rgb(0,0,0,0.08)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#1CC468" />
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[14px] text-[#020814] font-medium leading-[22px]">已复制模板ID</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 2xl:grid-cols-5 gap-5">
          {activeTab === 'AI 推荐' && (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 flex flex-col items-center justify-center cursor-pointer min-h-[280px] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <span className="text-[15px] font-medium text-gray-700">新建空白模板</span>
            </div>
          )}

          {activeTab === 'AI 推荐' && AI_RECOMMENDED_TEMPLATES.map(tpl => (
            <TemplateCard key={tpl.id} tpl={tpl} isFavorite={favorites.has(tpl.id)} onToggleFavorite={() => toggleFavorite(tpl.id)} type="ai" onPreview={setPreviewTpl} />
          ))}

          {activeTab === '我的模板' && MY_TEMPLATES.map(tpl => (
            <TemplateCard key={tpl.id} tpl={tpl} isFavorite={favorites.has(tpl.id)} onToggleFavorite={() => toggleFavorite(tpl.id)} type="my" onPreview={setPreviewTpl} onCopyId={() => {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }} />
          ))}

          {activeTab === '我的收藏' && (() => {
            const favItems = [...AI_RECOMMENDED_TEMPLATES, ...MY_TEMPLATES].filter(t => favorites.has(t.id));
            if (favItems.length === 0) {
              return (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Star className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-[15px] font-medium text-gray-500">暂无收藏的模板</p>
                  <p className="text-[13px] mt-1 text-gray-400">去“AI 推荐”或“我的模板”中收藏几个吧</p>
                </div>
              );
            }
            return favItems.map(tpl => (
              <TemplateCard key={tpl.id} tpl={tpl} isFavorite={true} onToggleFavorite={() => toggleFavorite(tpl.id)} type={tpl.isAi ? 'ai' : 'my'} onPreview={setPreviewTpl} onCopyId={() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              }} />
            ));
          })()}
        </div>
      </div>

      {/* Preview Modal */}
      {previewTpl && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-[800px] max-w-[90vw] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-medium text-gray-900">{previewTpl.title}</h2>
              <button 
                onClick={() => setPreviewTpl(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img src={previewTpl.image} alt={previewTpl.title} className="w-full h-auto object-contain max-h-[60vh] bg-gray-100" />
              </div>
              <div className="mt-4">
                <p className="text-[14px] text-gray-600 leading-relaxed">{previewTpl.desc}</p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end space-x-3 flex-shrink-0 bg-white">
              <button 
                onClick={() => setPreviewTpl(null)}
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setPreviewTpl(null);
                  // handle use template logic here
                }}
                className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-md hover:opacity-90 transition-opacity"
              >
                使用此模板
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepItem({ num, label, state }) {
  const isCompleted = state === 'completed';
  const isActive = state === 'active';
  
  return (
    <div className="flex items-center space-x-2">
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
        isCompleted ? "bg-[var(--primary-color)] text-white" : 
        isActive ? "bg-[var(--primary-color)] text-white ring-4 ring-[var(--primary-bg-hover)]" : 
        "bg-gray-100 text-gray-400"
      )}>
        {isCompleted ? <Check className="w-3 h-3" /> : num}
      </div>
      <span className={cn(
        "text-sm font-medium",
        isCompleted || isActive ? "text-[#020814]" : "text-gray-400"
      )}>{label}</span>
    </div>
  );
}

function TemplateCard({ tpl, isFavorite, onToggleFavorite, type, onCopyId, onPreview }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-[280px]">
      {/* Image Area */}
      <div className="relative h-[140px] flex-shrink-0 w-full overflow-hidden">
        <img src={tpl.image} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Overlay with buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onPreview && onPreview(tpl); }}
            className="px-4 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            预览
          </button>
          <button className="px-4 py-1.5 bg-[var(--primary-color)] text-white text-sm font-medium rounded-md hover:opacity-90">
            使用
          </button>
        </div>

        {/* Badges */}
        {type === 'ai' && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white text-[11px] font-medium rounded-[4px] shadow-sm z-0">
            AI 推荐
          </div>
        )}
        
        {/* Favorite */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-colors z-20",
            isFavorite ? "bg-white/90 text-[#F5A623]" : "bg-black/20 text-white hover:bg-black/40"
          )}
        >
          <Star className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col min-h-0 relative">
        <div className="flex items-center justify-between mb-1 group/title">
          <h3 className="font-medium text-[15px] text-gray-900 truncate pr-2">{tpl.title}</h3>
          {type === 'my' && (
            <div className="flex items-center opacity-0 group-hover/title:opacity-100 transition-opacity flex-shrink-0">
              <span className="text-xs text-gray-400 mr-1.5">{tpl.templateId}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onCopyId && onCopyId(tpl.templateId); }}
                className="text-gray-400 hover:text-[var(--primary-color)] p-1 rounded transition-colors"
                title="复制ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {tpl.desc}
        </p>

        {/* Footer info based on type */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between flex-shrink-0">
          {type === 'ai' ? (
            <>
              <div className="flex gap-1.5 overflow-hidden pr-2">
                {tpl.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[11px] rounded whitespace-nowrap">
                    {tag}
                  </span>
                ))}
                {tpl.tags.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[11px] rounded">+{tpl.tags.length - 2}</span>
                )}
              </div>
              <div className="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">
                使用 {tpl.uses} 次
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-1.5 overflow-hidden">
                <img src={tpl.creator.avatar} alt="avatar" className="w-5 h-5 rounded-full bg-gray-100 flex-shrink-0" />
                <UserHoverWrapper name={tpl.creator.name} avatar={tpl.creator.avatar} trigger={<span className="text-xs text-gray-600 truncate cursor-pointer hover:text-[var(--primary-color)]">{tpl.creator.name}</span>} />
              </div>
              <div className="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">
                {tpl.createTime}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
