import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      {/* Left Main Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center bg-white">
        {/* Top Left Icons */}
        <div className="absolute top-6 left-6 flex items-center gap-4 text-[#555B65]">
          <button className="hover:text-[var(--primary-color)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          </button>
          <div className="w-[1px] h-[14px] bg-[#E2E5F1]"></div>
          <button className="hover:text-[var(--primary-color)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </button>
          <button className="hover:text-[var(--primary-color)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </button>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center w-full max-w-[640px] px-8 mt-[-10vh]">
          {/* Avatar */}
          <div className="w-[64px] h-[64px] rounded-full bg-[#F2F3F8] overflow-hidden mb-4 border border-[#E2E5F1]">
            {/* Placeholder for actual avatar */}
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-[24px] font-semibold text-[#1D2129] mb-10 tracking-wide">
            Hi 👋，今天我能为你做些什么？
          </h1>

          {/* Chat Input Box */}
          <div className="w-full bg-white rounded-[24px] border border-[#2166FF] shadow-[0_8px_24px_rgba(33,102,255,0.08)] p-4 flex flex-col min-h-[140px] relative transition-all duration-300">
            <textarea 
              className="w-full flex-1 resize-none outline-none text-[15px] text-[#1D2129] placeholder:text-[#86909C] bg-transparent"
              placeholder="发消息或输入 @ 添加任务、人员提问"
              style={{ minHeight: '60px' }}
            />
            
            <div className="flex items-center justify-between mt-2 pt-2">
              {/* Left tools */}
              <div className="flex items-center text-[#555B65] text-[13px] font-medium cursor-pointer hover:text-[var(--primary-color)] transition-colors">
                <span className="text-[16px] mr-2">@</span>
                <div className="w-[1px] h-[12px] bg-[#E2E5F1] mr-2"></div>
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                数据分析
              </div>
              
              {/* Send Button */}
              <button className="w-[32px] h-[32px] rounded-full bg-[#E2E5F1] flex items-center justify-center text-white cursor-not-allowed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-[600px]">
            <SuggestionChip text="可以机标 + 人标结合生产数据吗？" />
            <SuggestionChip text="如何往标注任务中送入待标数据？" />
            <SuggestionChip text="我目前在飞书表格作业，可以一键生成标注模板吗？" />
            <SuggestionChip text="AIDP 为我提供了哪些智能服务？" />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[340px] h-full bg-[#F7F8FA] border-l border-[#E2E5F1] flex flex-col flex-shrink-0">
        {/* Sidebar Header */}
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white text-[12px] font-bold">W</div>
            <span className="text-[16px] font-semibold text-[#1D2129]">工作事项</span>
          </div>
          <button className="text-[#86909C] hover:text-[#1D2129] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="12" x2="3" y2="12"></line><polyline points="15 6 21 12 15 18"></polyline></svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 scrollbar-hide">
          
          {/* Card 1: 我的题目 */}
          <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E5F1]/50">
            <h3 className="text-[14px] font-medium text-[#1D2129] mb-4">我的题目</h3>
            <div className="flex gap-6 border-b border-[#E2E5F1] mb-6">
              <div className="text-[13px] font-medium text-[var(--primary-color)] pb-2 border-b-2 border-[var(--primary-color)] cursor-pointer">
                待我修改 (0)
              </div>
              <div className="text-[13px] font-medium text-[#555B65] pb-2 cursor-pointer hover:text-[#1D2129]">
                待我质检 (0)
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              {/* Placeholder for empty state SVG */}
              <div className="w-[120px] h-[80px] bg-[#F2F3F8] rounded-lg mb-3 flex items-center justify-center text-[#86909C] text-xs border border-dashed border-[#C9CDD4]">
                请上传插图SVG
              </div>
              <span className="text-[13px] text-[#86909C]">已完成所有返修题目</span>
            </div>
          </div>

          {/* Card 2: 我的任务 */}
          <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E5F1]/50">
            <div className="flex items-center gap-1 mb-4">
              <h3 className="text-[14px] font-medium text-[#1D2129]">我的任务</h3>
              <svg className="w-3.5 h-3.5 text-[#86909C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div className="flex gap-6 border-b border-[#E2E5F1] mb-6">
              <div className="text-[13px] font-medium text-[var(--primary-color)] pb-2 border-b-2 border-[var(--primary-color)] cursor-pointer">
                作为负责人 (0)
              </div>
              <div className="text-[13px] font-medium text-[#555B65] pb-2 cursor-pointer hover:text-[#1D2129]">
                作为数据专家 (0)
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              {/* Placeholder for empty state SVG */}
              <div className="w-[120px] h-[80px] bg-[#F2F3F8] rounded-lg mb-3 flex items-center justify-center text-[#86909C] text-xs border border-dashed border-[#C9CDD4]">
                请上传插图SVG
              </div>
              <span className="text-[13px] text-[#86909C]">暂时没有在跟进的任务</span>
            </div>
          </div>

          {/* Card 3: Storage/Limits */}
          <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E5F1]/50 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[13px] text-[#555B65]">
                <span className="text-orange-500">📊</span>
                聚焦有效任务，降低信息过载
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-bold text-[#1D2129]">0<span className="text-[14px] text-[#86909C] font-normal">/1</span></span>
                <svg className="w-3.5 h-3.5 text-[#86909C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded bg-[#F2F3F8] text-[#1D2129] text-[13px] font-medium hover:bg-[#E2E5F1] transition-colors">
              去清理
            </button>
          </div>

          {/* Card 4: 我的常用 */}
          <div>
             <h3 className="text-[14px] font-medium text-[#1D2129] px-1 mt-6">我的常用</h3>
          </div>

        </div>
      </div>
    </div>
  );
}

function SuggestionChip({ text }) {
  return (
    <div className="bg-[#F2F3F8] hover:bg-[#E2E5F1] transition-colors cursor-pointer rounded-full px-5 py-2.5 flex items-center gap-2 text-[13px] text-[#1D2129]">
      {text}
      <svg className="w-3.5 h-3.5 text-[#555B65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </div>
  );
}
