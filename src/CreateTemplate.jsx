import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Flame, Plus, Search, Star, X } from 'lucide-react';
import { cn } from './lib/utils';

const TABS = ['AI 推荐', '我的模板', '我的收藏'];
const HOVER_SELECT_ICON_OPACITY = 60;

const AI_TEMPLATES = [
  {
    id: 'ai-audio-cot',
    title: '音频cot',
    desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复',
    uses: 2368,
    tags: ['语音', '对话与交互'],
    updatedAt: '2026.05.30',
    hot: 98,
    isAi: true,
  },
  {
    id: 'ai-robot-trace',
    title: '机器人操作轨迹',
    desc: '针对视频中机器人的操作轨迹进行标记，包括关键片段的起止时间、任务',
    uses: 2368,
    tags: ['视频', '连续帧追踪'],
    updatedAt: '2026.05.28',
    hot: 88,
    isAi: true,
  },
  {
    id: 'ai-translate',
    title: '同传换翻译模板',
    desc: '还没有相关描述哦，请预览模板',
    uses: 2368,
    tags: ['文本', '转写'],
    updatedAt: '2026.05.22',
    hot: 72,
    isAi: true,
  },
  {
    id: 'ai-video-frame',
    title: '视频抽帧图片打标',
    desc: '将视频分解为序列帧，在帧上添加标签，指明用户在当前帧进行的图形界',
    uses: 2368,
    tags: ['视频', '图片'],
    updatedAt: '2026.05.18',
    hot: 65,
    isAi: true,
  },
];

const MY_TEMPLATES = [
  {
    id: 'my-audio-cot',
    title: '【急】基础文本分类模板之月底就要交付必看的超长模板名称',
    desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复，该标注模板主要用于验证',
    templateId: '7652323801179197199',
    type: 'Neeko',
    creators: [
      { name: 'zhouhongxiang', avatar: '/avatar.png' },
      { name: 'fangxiaotong', avatar: '/cat2.jpg' },
      { name: 'cuiyonglei', avatar: '/cat3.jpg' },
    ],
    updatedAt: '2026.05.30 18:24',
  },
  {
    id: 'my-basic-text',
    title: '音频cot',
    desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复',
    templateId: '7652323801179197102',
    type: 'Neeko',
    creators: [{ name: 'zhouhongxiang', avatar: '/avatar.png' }],
    updatedAt: '2026.05.30 18:00',
  },
  {
    id: 'my-quality-check',
    title: '【急】基础文本分类模板之月底就要交付必看的长文案模板',
    desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复',
    templateId: '7652323801179197116',
    type: 'Vibe Coding',
    creators: [
      { name: 'zhouhongxiang', avatar: '/avatar.png' },
      { name: 'liuyuming', avatar: '/cat4.jpg' },
    ],
    updatedAt: '2026.05.29 11:36',
  },
  {
    id: 'my-visual-task',
    title: '音频cot',
    desc: '语音对话场景中，分析用户和bot的对话音频，针对模型输出的cot和回复',
    templateId: '7652323801179197120',
    type: 'Neeko',
    creators: [{ name: 'zhouhongxiang', avatar: '/avatar.png' }],
    updatedAt: '2026.05.28 09:12',
  },
];

const TAG_CATEGORIES = {
  '格式': ['多模态', '文本', '图片', '语音', '视频', '3D'],
  '场景': ['分类与打标', '信息抽取', '撰写与生成', '评估', '排序', '画框标注', '连续帧追踪', '区域分割', '转写', '对话与交互', '校对与审核'],
};

const textClamp = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('AI 推荐');
  const [favorites, setFavorites] = useState(() => new Set());
  const [selectedMyTemplateId, setSelectedMyTemplateId] = useState(null);
  const [toast, setToast] = useState('');
  const [previewTpl, setPreviewTpl] = useState(null);

  const [aiSearch, setAiSearch] = useState('');
  const [aiSort, setAiSort] = useState('默认排序');
  const [selectedTags, setSelectedTags] = useState(() => new Set());
  const [mySearch, setMySearch] = useState('');
  const [mySort, setMySort] = useState('时间倒序');
  const [myType, setMyType] = useState('全部类型');

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 1800);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyTemplateId = async (templateId) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(templateId);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = templateId;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
    } finally {
      showToast('已复制模板 ID');
    }
  };

  const aiItems = useMemo(() => {
    const keyword = aiSearch.trim().toLowerCase();
    const selected = Array.from(selectedTags);
    return AI_TEMPLATES
      .filter((item) => !keyword || item.title.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword))
      .filter((item) => selected.length === 0 || selected.some((tag) => item.tags.includes(tag)))
      .sort((a, b) => {
        if (aiSort === '按热度排序') return b.hot - a.hot;
        if (aiSort === '按更新时间排序') return b.updatedAt.localeCompare(a.updatedAt);
        return 0;
      });
  }, [aiSearch, aiSort, selectedTags]);

  const myItems = useMemo(() => {
    const keyword = mySearch.trim().toLowerCase();
    const source = MY_TEMPLATES
      .filter((item) => myType === '全部类型' || item.type === myType)
      .filter((item) => !keyword || item.title.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword) || item.templateId.includes(keyword));
    return [...source].sort((a, b) => (mySort === '时间倒序' ? b.updatedAt.localeCompare(a.updatedAt) : a.updatedAt.localeCompare(b.updatedAt)));
  }, [mySearch, mySort, myType]);

  const favoriteItems = useMemo(() => {
    const all = [...AI_TEMPLATES, ...MY_TEMPLATES];
    return all.filter((item) => favorites.has(item.id));
  }, [favorites]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white text-[#1D2129]">
      <TemplateHeader onBack={() => navigate('/template')} />

      <div className="relative flex h-[32px] shrink-0 items-end border-b border-[#E5E6EB] px-[20px]">
        <div className="flex items-end">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative mr-[6px] h-[32px] min-w-[76px] rounded-t-[4px] border border-b-0 px-[16px] text-[14px] leading-[22px] transition-colors',
                activeTab === tab
                  ? 'border-[#EAEDF1] bg-white font-medium text-[#006EFF] shadow-[inset_0_2px_0_#006EFF] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-white after:content-[""]'
                  : 'border-[#E5E6EB] bg-[#F7F8FA] text-[#4E5969] hover:text-[#1D2129]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-[72px] shrink-0 items-center justify-between px-[20px]">
        <SearchBox
          value={activeTab === 'AI 推荐' ? aiSearch : mySearch}
          onChange={activeTab === 'AI 推荐' ? setAiSearch : setMySearch}
        />
        <div className="flex items-center gap-[14px]">
          {activeTab === 'AI 推荐' ? (
            <>
              <SelectMenu value={aiSort} options={['默认排序', '按热度排序', '按更新时间排序']} onChange={setAiSort} width={146} />
              <TagFilter selectedTags={selectedTags} onChange={setSelectedTags} />
            </>
          ) : (
            <>
              <SelectMenu value={mySort} options={['时间倒序', '时间正序']} onChange={setMySort} width={146} />
              {activeTab === '我的模板' && (
                <SelectMenu value={myType} options={['全部类型', 'Neeko', 'Vibe Coding']} onChange={setMyType} width={122} />
              )}
            </>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[20px] pb-[32px]">
        {toast && <Toast message={toast} />}

        {activeTab === 'AI 推荐' && (
          <CardGrid>
            <BlankTemplateCard />
            {aiItems.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                tpl={tpl}
                variant="ai"
                isFavorite={favorites.has(tpl.id)}
                onFavorite={() => toggleFavorite(tpl.id)}
                onPreview={() => setPreviewTpl(tpl)}
              />
            ))}
          </CardGrid>
        )}

        {activeTab === '我的模板' && (
          <CardGrid>
            {myItems.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                tpl={tpl}
                variant="my"
                isFavorite={favorites.has(tpl.id)}
                isSelected={selectedMyTemplateId === tpl.id}
                onFavorite={() => toggleFavorite(tpl.id)}
                onPreview={() => setPreviewTpl(tpl)}
                onCopyId={() => copyTemplateId(tpl.templateId)}
                onSelect={() => setSelectedMyTemplateId((current) => (current === tpl.id ? null : tpl.id))}
              />
            ))}
          </CardGrid>
        )}

        {activeTab === '我的收藏' && (
          favoriteItems.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <CardGrid>
              {favoriteItems.map((tpl) => (
                <TemplateCard
                  key={tpl.id}
                  tpl={tpl}
                  variant={tpl.isAi ? 'ai' : 'my'}
                  isFavorite
                  onFavorite={() => toggleFavorite(tpl.id)}
                  onPreview={() => setPreviewTpl(tpl)}
                  onCopyId={tpl.isAi ? undefined : () => copyTemplateId(tpl.templateId)}
                />
              ))}
            </CardGrid>
          )
        )}
      </div>

      {previewTpl && <PreviewModal template={previewTpl} onClose={() => setPreviewTpl(null)} />}
    </div>
  );
}

function TemplateHeader({ onBack }) {
  return (
    <div className="relative flex h-[68px] shrink-0 items-center justify-between px-[20px]">
      <div className="flex items-center">
        <button type="button" onClick={onBack} className="mr-[14px] flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[#4E5969] hover:bg-[#F2F3F5]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[16px] font-semibold leading-[24px] text-[#020814]">创建任务</span>
      </div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
        <StepItem state="done" label="基础信息" />
        <StepLine active />
        <StepItem state="active" label="作业页面" index="2" />
        <StepLine />
        <StepItem state="todo" label="作业流程" index="3" />
      </div>

      <button type="button" className="h-[32px] rounded-[4px] border border-[#DDE2EA] bg-[#F7F9FC] px-[16px] text-[14px] leading-[22px] text-[#1D2129] hover:bg-[#F2F3F5]">
        切换到旧版本
      </button>
    </div>
  );
}

function StepItem({ state, label, index }) {
  const isDone = state === 'done';
  const isActive = state === 'active';

  return (
    <div className="flex items-center gap-[8px]">
      <div
        className={cn(
          'flex h-[24px] w-[24px] items-center justify-center rounded-full border text-[13px] font-medium',
          isDone && 'border-[#4E8DFF] bg-[#F2F6FF] text-[#0D6EFD]',
          isActive && 'border-[#2F74FF] bg-[#2F74FF] text-white',
          !isDone && !isActive && 'border-[#DDE2EA] bg-white text-[#86909C]'
        )}
      >
        {isDone ? <Check size={16} strokeWidth={2.4} /> : index}
      </div>
      <span className={cn('text-[14px] font-medium leading-[22px]', isDone || isActive ? 'text-[#020814]' : 'text-[#4E5969]')}>{label}</span>
    </div>
  );
}

function StepLine({ active }) {
  return <div className={cn('mx-[8px] h-[1px] w-[122px]', active ? 'bg-[#7AA6FF]' : 'bg-[#DDE2EA]')} />;
}

function SearchBox({ value, onChange }) {
  return (
    <div className="relative h-[34px] w-[362px]">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="搜索模板名称"
        className="h-full w-full rounded-[4px] border border-[#DDE2EA] bg-white pl-[12px] pr-[40px] text-[14px] leading-[22px] text-[#1D2129] outline-none placeholder:text-[#86909C] focus:border-[#0D6EFD] focus:shadow-[0_0_0_2px_rgba(13,110,253,0.08)]"
      />
      <Search className="absolute right-[12px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#6B778A]" strokeWidth={1.8} />
    </div>
  );
}

function SelectMenu({ value, options, onChange, width }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ width }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex h-[34px] w-full items-center justify-between rounded-[4px] border bg-white px-[14px] text-[14px] leading-[22px] text-[#1D2129] shadow-none transition-colors',
          open ? 'border-[#0D6EFD] shadow-[0_0_0_2px_rgba(13,110,253,0.08)]' : 'border-[#DDE2EA] hover:border-[#C7D0DE]'
        )}
      >
        <span>{value}</span>
        <ChevronDown className={cn('h-[16px] w-[16px] text-[#6B778A] transition-transform', open && 'rotate-180')} strokeWidth={1.8} />
      </button>
      {open && (
        <div className="absolute right-0 top-[40px] z-50 min-w-full rounded-[4px] border border-[#E5E6EB] bg-white p-[4px] shadow-[0_8px_24px_rgba(29,33,41,0.12)]">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                'block h-[36px] w-full rounded-[2px] px-[12px] text-left text-[14px] leading-[22px]',
                value === option ? 'bg-[#F2F6FF] font-medium text-[#0D6EFD]' : 'text-[#1D2129] hover:bg-[#F7F8FA]'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TagFilter({ selectedTags, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selectedCount = selectedTags.size;

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const toggle = (tag) => {
    onChange((current) => {
      const next = new Set(current);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  return (
    <div ref={ref} className="relative w-[122px]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex h-[34px] w-full items-center justify-between rounded-[4px] border bg-white px-[14px] text-[14px] leading-[22px] text-[#1D2129]',
          open ? 'border-[#0D6EFD] shadow-[0_0_0_2px_rgba(13,110,253,0.08)]' : 'border-[#DDE2EA] hover:border-[#C7D0DE]'
        )}
      >
        <span>{selectedCount > 0 ? `已筛选（${selectedCount}）` : '全部标签'}</span>
        <ChevronDown className={cn('h-[16px] w-[16px] text-[#6B778A] transition-transform', open && 'rotate-180')} strokeWidth={1.8} />
      </button>

      {open && (
        <div className="absolute right-0 top-[40px] z-50 w-[402px] rounded-[8px] border border-[#E5E6EB] bg-white p-[16px] shadow-[0_8px_24px_rgba(29,33,41,0.12)]">
          <div className="mb-[16px] flex items-center justify-between">
            <div className="text-[14px] font-semibold leading-[22px] text-[#020814]">筛选标签</div>
            {selectedCount > 0 && (
              <button type="button" onClick={() => onChange(new Set())} className="text-[13px] leading-[20px] text-[#0D6EFD] hover:opacity-80">
                清空已选
              </button>
            )}
          </div>

          {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
            <div key={category} className="mb-[18px] last:mb-0">
              <div className="mb-[8px] text-[13px] leading-[20px] text-[#86909C]">{category}</div>
              <div className="flex flex-wrap gap-[8px]">
                {tags.map((tag) => {
                  const active = selectedTags.has(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggle(tag)}
                      className={cn(
                        'h-[30px] rounded-[4px] border px-[10px] text-[13px] leading-[20px] transition-colors',
                        active
                          ? 'border-[#7AA6FF] bg-[#F2F6FF] font-medium text-[#0D6EFD]'
                          : 'border-[#E5E6EB] bg-[#F7F8FA] text-[#6B778A] hover:border-[#B8C2D2]'
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CardGrid({ children }) {
  return <div className="grid grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-x-[20px] gap-y-[20px]">{children}</div>;
}

function BlankTemplateCard() {
  return (
    <button
      type="button"
      className="group flex h-[318px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[#C7D0DE] bg-[#FAFBFD] text-[#4E5969] transition-all hover:border-[#0D6EFD] hover:bg-[#F7FAFF] hover:text-[#0D6EFD]"
    >
      <span className="mb-[12px] flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#E5E6EB] bg-white transition-transform group-hover:scale-105">
        <Plus size={24} strokeWidth={1.9} />
      </span>
      <span className="text-[15px] font-medium leading-[22px]">新建空白模板</span>
    </button>
  );
}

function TemplateCard({ tpl, variant, isFavorite, isSelected = false, onFavorite, onPreview, onCopyId, onSelect }) {
  const isAi = variant === 'ai';
  const isSelectable = Boolean(onSelect);

  return (
    <div
      onClick={isSelectable ? onSelect : undefined}
      className={cn(
        'group h-[318px] overflow-hidden rounded-[8px] border bg-white transition-all hover:shadow-[0_16px_32px_rgba(29,33,41,0.12)]',
        isSelectable && 'cursor-pointer hover:border-[#1664FF] hover:shadow-[0_16px_32px_rgba(22,100,255,0.12)]',
        isSelected ? 'border-[#1664FF]' : 'border-[#E5E6EB]'
      )}
    >
      <div className={cn('relative h-[180px] overflow-hidden bg-[#DDE7FF]', isSelectable && 'transition-colors group-hover:bg-[#D4E2FF]')}>
        {isAi && <div className="absolute left-0 top-0 z-20 rounded-br-[4px] bg-gradient-to-r from-[#4096FF] to-[#9B6DFF] px-[12px] py-[4px] text-[13px] font-medium leading-[18px] text-white">AI 推荐</div>}
        {isSelectable && isSelected && (
          <img src="/template-selected.svg" alt="" className="absolute left-0 top-0 z-30 h-[24px] w-[24px]" />
        )}
        {isSelectable && !isSelected && (
          <img
            src="/template-selected.svg"
            alt=""
            className="absolute left-0 top-0 z-30 hidden h-[24px] w-[24px] group-hover:block"
            style={{ opacity: HOVER_SELECT_ICON_OPACITY / 100 }}
          />
        )}

        <div className="absolute inset-0 bg-[#87909F] opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-[16px] opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPreview();
            }}
            className="h-[34px] rounded-[4px] bg-white px-[18px] text-[14px] font-medium leading-[22px] text-[#1D2129] shadow-sm hover:bg-[#F7F8FA]"
          >
            预览
          </button>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="h-[34px] rounded-[4px] bg-[#0D6EFD] px-[18px] text-[14px] font-medium leading-[22px] text-white hover:bg-[#0B5FDD]"
          >
            使用
          </button>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
          className={cn(
            'absolute right-[12px] top-[10px] z-30 flex h-[24px] w-[24px] items-center justify-center rounded-[4px] transition-opacity',
            isFavorite ? 'opacity-100 text-[#FFC046]' : 'opacity-0 text-white hover:text-[#FFC046] group-hover:opacity-50'
          )}
          aria-label={isFavorite ? '取消收藏' : '收藏'}
        >
          <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>
      </div>

      <div className="flex h-[138px] flex-col px-[16px] pb-[14px] pt-[16px]">
        <div className="mb-[8px] flex h-[22px] items-center gap-[8px]">
          <div className="min-w-0 flex-1 text-[15px] font-semibold leading-[22px] text-[#020814]" title={tpl.title} style={textClamp(1)}>
            {tpl.title}
          </div>
          {!isAi && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onCopyId();
              }}
              className="hidden shrink-0 text-[13px] leading-[20px] text-[#86909C] transition-colors hover:text-[#0D6EFD] group-hover:block"
              title="点击复制模板 ID"
            >
              ID：{tpl.templateId}
            </button>
          )}
        </div>

        <p className="min-h-[44px] text-[14px] leading-[22px] text-[#6B778A]" title={tpl.desc} style={textClamp(2)}>
          {tpl.desc}
        </p>

        <div className="mt-auto flex h-[22px] items-center justify-between gap-[12px]">
          {isAi ? (
            <>
              <TagList tags={tpl.tags} />
              <div className="flex shrink-0 items-center gap-[4px] text-[13px] leading-[20px] text-[#86909C]">
                <Flame size={14} fill="#C7D0DE" stroke="none" />
                <span>{tpl.uses.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <>
              <TemplateCreators creators={tpl.creators} />
              <span className="shrink-0 text-[13px] leading-[20px] text-[#86909C]">{tpl.updatedAt}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateCreators({ creators = [] }) {
  const [firstCreator, ...otherCreators] = creators;
  if (!firstCreator) return null;

  return (
    <div className="flex min-w-0 items-center">
      <img src={firstCreator.avatar} alt="" className="h-[18px] w-[18px] shrink-0 rounded-full object-cover" />
      <span className="ml-[6px] block max-w-[116px] truncate text-[12px] leading-[18px] text-[#6B778A]" title={firstCreator.name}>
        {firstCreator.name}
      </span>
      {otherCreators.length > 0 && (
        <div className="group/more relative ml-[8px] shrink-0">
          <span className="block h-[20px] rounded-[10px] border border-[#EAEDF1] bg-[#F6F8FA] px-[8px] text-[10px] font-medium leading-[18px] text-[#4E5969]">
            +{otherCreators.length}
          </span>
          <div className="pointer-events-none absolute bottom-[28px] left-1/2 z-40 hidden -translate-x-1/2 whitespace-nowrap rounded-[8px] border border-[#DDE2EA] bg-white px-[18px] py-[12px] text-[13px] leading-[20px] text-[#6B778A] shadow-[0_12px_32px_rgba(29,33,41,0.14)] group-hover/more:block">
            {otherCreators.map((creator) => creator.name).join('、')}
            <div className="absolute bottom-[-7px] left-1/2 h-[14px] w-[14px] -translate-x-1/2 rotate-45 border-b border-r border-[#DDE2EA] bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}

function TagList({ tags }) {
  const visible = tags.slice(0, 3);
  const hiddenCount = Math.max(0, tags.length - visible.length);
  return (
    <div className="flex min-w-0 items-center gap-[6px] overflow-hidden">
      {visible.map((tag) => (
        <span key={tag} className="h-[20px] shrink-0 rounded-[4px] border border-[#DDE2EA] bg-[#F7F8FA] px-[7px] text-[12px] leading-[18px] text-[#4E5969]">
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="h-[20px] shrink-0 rounded-[4px] border border-[#DDE2EA] bg-[#F7F8FA] px-[7px] text-[12px] leading-[18px] text-[#4E5969]">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}

function EmptyFavorites() {
  return (
    <div className="flex h-[520px] flex-col items-center justify-center text-center">
      <div className="mb-[18px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#F7F8FA]">
        <Star size={34} className="text-[#C7D0DE]" strokeWidth={1.8} />
      </div>
      <div className="text-[15px] font-medium leading-[22px] text-[#6B778A]">暂无收藏的模板</div>
      <div className="mt-[6px] text-[13px] leading-[20px] text-[#A0A8B5]">去“AI 推荐”或“我的模板”中收藏几个吧</div>
    </div>
  );
}

function Toast({ message }) {
  return (
    <div className="fixed left-1/2 top-[20px] z-[99999] -translate-x-1/2 rounded-[4px] border border-[#E5E6EB] bg-white px-[16px] py-[10px] shadow-[0_8px_24px_rgba(29,33,41,0.12)]">
      <div className="flex items-center gap-[8px] text-[14px] font-medium leading-[22px] text-[#1D2129]">
        <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#2BA471] text-white">
          <Check size={12} strokeWidth={2.4} />
        </span>
        {message}
      </div>
    </div>
  );
}

function PreviewModal({ template, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45">
      <div className="flex h-[85vh] w-[80vw] min-w-[960px] flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.24)]">
        <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#E5E6EB] px-[24px]">
          <h2 className="text-[18px] font-semibold leading-[26px] text-[#020814]">{template.title}</h2>
          <button type="button" onClick={onClose} className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] text-[#4E5969] hover:bg-[#F2F3F5]">
            <X size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-white p-[8px]">
          <div className="grid h-full grid-cols-[1fr_204px] gap-[8px]">
            <div className="flex min-h-0 flex-col bg-[#121417]">
              <div className="relative h-[48%] min-h-[240px] bg-[#1B1E22]">
                <div className="absolute left-[20px] top-[10px] h-[calc(100%-20px)] w-[66%] overflow-hidden bg-[#ADB8A7]">
                  <div className="h-full w-full bg-[linear-gradient(135deg,#DCE5D6_0%,#A8B997_42%,#5F714D_43%,#C9D1BB_70%,#6A5B4C_100%)]" />
                </div>
                <div className="absolute bottom-[16px] left-[20px] right-[12px] h-[2px] bg-[#C9CDD4]" />
                <div className="absolute bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 border-y-[7px] border-l-[10px] border-y-transparent border-l-white" />
              </div>
              <div className="h-[30px] border-y border-[#2B303A] bg-[#171A1E]" />
              <div className="relative flex-1 bg-[#0F1012]">
                <div className="absolute left-[12px] right-[12px] top-[18px] h-[1px] bg-[#2E333A]" />
                <div className="absolute bottom-[68px] left-0 right-0 flex h-[34px] gap-[2px] px-[8px]">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="flex-1 bg-[linear-gradient(135deg,#84906A,#D5C09A_42%,#596A8B_43%,#B8C2A0)]" />
                  ))}
                </div>
                <div className="absolute bottom-[34px] left-[8px] right-[8px] flex h-[26px] gap-[2px]">
                  <div className="flex-[4] rounded-[2px] bg-[#2C83C8] pl-[8px] text-[10px] leading-[26px] text-white">Clip-02</div>
                  <div className="flex-[2] rounded-[2px] bg-[#2C83C8] pl-[8px] text-[10px] leading-[26px] text-white">Clip-03</div>
                  <div className="flex-1 rounded-[2px] bg-[#2C83C8] pl-[8px] text-[10px] leading-[26px] text-white">Clip-04</div>
                </div>
                <div className="absolute bottom-[8px] left-[8px] right-[8px] flex h-[24px] gap-[2px]">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex-1 rounded-[2px] bg-[#B8652F] pl-[6px] text-[9px] leading-[24px] text-white">shot-{index + 1}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-0 overflow-hidden border-l border-[#DDE2EA] bg-white text-[10px] text-[#4E5969]">
              <PreviewField title="segment_timestamps" rows={['startTime          endTime', '0:0                5:255']} />
              <PreviewField title="subjects" rows={['id                 description', 'Subject 5          角色信息（比弗利娇妻）']} />
              <PreviewField title="summary" rows={['Subject 5坐在车内转头看向镜头，随后画面通过树木拍摄。']} />
              <PreviewField title="narrative" rows={['画外音女声，语速平稳，音色明亮。']} />
              <PreviewField title="music" rows={['全程为upbeat电子流行乐，以合成器、鼓点为主。']} />
              <PreviewField title="style" rows={['写实;华丽;时尚']} />
              <PreviewField title="static_text" rows={['无文字']} />
            </div>
          </div>
        </div>

        <div className="flex h-[72px] shrink-0 items-center justify-end gap-[12px] border-t border-[#E5E6EB] px-[24px]">
          <button type="button" onClick={onClose} className="h-[34px] rounded-[4px] border border-[#DDE2EA] bg-white px-[18px] text-[14px] leading-[22px] text-[#1D2129] hover:bg-[#F7F8FA]">
            取消
          </button>
          <button type="button" className="h-[34px] rounded-[4px] bg-[#0D6EFD] px-[20px] text-[14px] font-medium leading-[22px] text-white hover:bg-[#0B5FDD]">
            使用此模板
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewField({ title, rows }) {
  return (
    <div className="border-b border-[#1D2129] px-[6px] py-[8px]">
      <div className="mb-[6px] font-semibold text-[#020814]">{title}</div>
      {rows.map((row) => (
        <div key={row} className="mb-[4px] rounded-[2px] bg-[#F2F3F5] px-[6px] py-[5px] leading-[14px] last:mb-0">
          {row}
        </div>
      ))}
    </div>
  );
}
