import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronLeft, Clock, Copy, MoreHorizontal, Edit3, 
  Database, Upload, Plus, Search, RefreshCw, Settings,
  Check, Download, Info, Play, User, ChevronDown,
  MinusCircle, CheckCircle2, AlertCircle, XCircle, Pause
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserHoverWrapper } from './UserHoverCard';

function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// 详情 Tab
function DetailTab({ task }) {
  return (
    <div className="flex flex-col gap-6">
      {/* 基础信息 */}
      <div className="bg-white border border-[#F0F2FA] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[var(--primary-color)] rounded-full"></div>
            <h3 className="text-[16px] font-medium text-[#0B0B0F]">基础信息</h3>
          </div>
          <button className="flex items-center gap-1 text-[#555B65] hover:text-[var(--primary-color)] text-[13px] transition-colors">
            <Edit3 size={14}/> 编辑
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-6">
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">任务名称</span>
            <span className="text-[#0B0B0F]">{task.name}</span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">所属项目</span>
            <span className="text-[#0B0B0F]">推理预训练-项目列表融合</span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">任务ID</span>
            <span className="text-[#0B0B0F] flex items-center gap-1">{task.id} <Copy size={14} className="text-[#86909C] cursor-pointer hover:text-[var(--primary-color)]"/></span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">项目ID</span>
            <span className="text-[#0B0B0F] flex items-center gap-1">6800994139618938632 <Copy size={14} className="text-[#86909C] cursor-pointer hover:text-[var(--primary-color)]"/></span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">任务Owner</span>
            <span className="text-[#0B0B0F]">zhouhongxiang huiping zhaoming</span>
          </div>
          <div className="flex gap-4 text-[13px] items-center">
            <span className="text-[#86909C] w-[80px]">项目经理</span>
            <div className="flex items-center gap-2">
               <UserHoverWrapper name="周鸿翔" avatar="/cat1.jpg">
                 <span className="flex items-center gap-1 cursor-pointer transition-colors"><img src="/cat1.jpg" className="w-5 h-5 rounded-full object-cover"/>周鸿翔</span>
               </UserHoverWrapper>
               <UserHoverWrapper name="任我行" avatar="/cat2.jpg">
                 <span className="flex items-center gap-1 cursor-pointer transition-colors"><img src="/cat2.jpg" className="w-5 h-5 rounded-full object-cover"/>任我行</span>
               </UserHoverWrapper>
               <UserHoverWrapper name="周芳芳" avatar="/cat3.jpg">
                 <span className="flex items-center gap-1 cursor-pointer transition-colors"><img src="/cat3.jpg" className="w-5 h-5 rounded-full object-cover"/>周芳芳</span>
               </UserHoverWrapper>
               <UserHoverWrapper name="赵明" avatar="/cat4.jpg">
                 <span className="flex items-center gap-1 cursor-pointer transition-colors"><img src="/cat4.jpg" className="w-5 h-5 rounded-full object-cover"/>赵明</span>
               </UserHoverWrapper>
               <UserHoverWrapper name="吴剑锋" avatar="/cat5.jpg">
                 <span className="flex items-center gap-1 cursor-pointer transition-colors"><img src="/cat5.jpg" className="w-5 h-5 rounded-full object-cover"/>吴剑锋</span>
               </UserHoverWrapper>
               <span className="text-[#86909C] ml-1">+16</span>
            </div>
          </div>
          <div className="flex gap-4 text-[13px] items-center">
            <span className="text-[#86909C] w-[80px]">任务类型</span>
            <span className="px-2 py-0.5 bg-[var(--primary-bg-light)] text-[var(--primary-color)] rounded text-[12px]">正式</span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">所属子项目</span>
            <span className="text-[#0B0B0F]">推理预训练-项目列表融合子项目1</span>
          </div>
          <div className="flex gap-4 text-[13px] items-center">
            <span className="text-[#86909C] w-[80px]">子项目标签</span>
            <span className="px-2 py-0.5 bg-[#F6F7FA] text-[#555B65] border border-[#E2E5F1] rounded text-[12px]">文本基础模型/Functioncall-SFT-一方Agent</span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">子项目ID</span>
            <span className="text-[#0B0B0F] flex items-center gap-1">6800994139618938632 <Copy size={14} className="text-[#86909C] cursor-pointer hover:text-[var(--primary-color)]"/></span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span className="text-[#86909C] w-[80px]">任务描述</span>
            <span className="text-[#0B0B0F]">GroundingBOX考试队列</span>
          </div>
        </div>
      </div>

      {/* 作业模板 */}
      <div className="bg-white border border-[#F0F2FA] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[var(--primary-color)] rounded-full"></div>
            <h3 className="text-[16px] font-medium text-[#0B0B0F]">作业模板</h3>
          </div>
          <button className="flex items-center gap-1 text-[#555B65] hover:text-[var(--primary-color)] text-[13px] transition-colors">
            <Edit3 size={14}/> 编辑
          </button>
        </div>
        <div className="border border-[#E2E5F1] rounded-lg p-4 flex items-center justify-between bg-[#F6F7FA]">
          <div className="flex items-center gap-3">
             <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
               <path d="M23.296 5.36621L14 10.7464L19.5286 13.9454L26.124 10.1318V6.98181L23.296 5.36621Z" fill="var(--primary-light)"/>
               <path d="M26.1156 21.0049L26.1254 21L26.1156 21.0049Z" fill="var(--primary-color)"/>
               <path d="M20.5982 13.3266L20.5996 17.808L26.124 21V10.1318L20.5982 13.3266Z" fill="var(--primary-color)"/>
               <path d="M20.5996 17.808L8.4742 24.8094L14 28L26.124 21L20.5996 17.808Z" fill="var(--primary-dark)"/>
               <path d="M19.5426 3.2004L14 0L1.876 7L7.4018 10.1906L19.5426 3.2004Z" fill="var(--primary-light)"/>
               <path d="M7.4018 10.1906L1.876 7V21L4.6018 22.5736L7.4018 20.9426V10.1906Z" fill="var(--primary-color)"/>
               <path d="M14 17.1402L8.4714 13.9454L7.4018 14.5516V20.9426L14 17.1402Z" fill="var(--primary-dark)"/>
             </svg>
             <span className="text-[14px] text-[#0B0B0F] font-medium">SFT-新增&回扫-三方&四方</span>
             <span className="text-[13px] text-[#86909C]">(6800994139618938632)</span>
             <div className="flex items-center gap-1 ml-4 text-[#86909C] text-[13px]">
               <User size={14}/>
               zhouhongxiang
               <span className="bg-white border border-[#E2E5F1] rounded px-1 ml-1 text-[12px]">+3</span>
             </div>
          </div>
          <div className="flex items-center gap-4 text-[13px]">
             <span className="text-[var(--primary-color)] cursor-pointer hover:underline">编辑</span>
             <span className="text-[var(--primary-color)] cursor-pointer hover:underline">预览</span>
          </div>
        </div>
      </div>

      {/* 流程设置 */}
      <div className="bg-white border border-[#F0F2FA] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[var(--primary-color)] rounded-full"></div>
            <h3 className="text-[16px] font-medium text-[#0B0B0F]">流程设置</h3>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-1 border border-[#E2E5F1] rounded px-3 py-1.5 text-[#555B65] hover:bg-gray-50 text-[13px] transition-colors">
               <Settings size={14}/> 全局高级配置
             </button>
             <button className="flex items-center gap-1 text-[#555B65] hover:text-[var(--primary-color)] text-[13px] transition-colors ml-2">
               <Edit3 size={14}/> 编辑
             </button>
          </div>
        </div>
        <div className="flex items-center overflow-x-auto p-6 w-full rounded-lg border border-[#DDE2E9] bg-[#F6F8FA] relative" style={{ height: '480px', alignSelf: 'stretch' }}>
          {/* 开始节点 */}
          <div className="relative flex w-[120px] px-4 py-3 justify-center items-center gap-2 rounded-[22px] border border-[#EAEDF1] bg-white flex-shrink-0">
            <span className="text-[#4D5868] font-['PingFang_SC'] text-[13px] font-medium leading-[20px] tracking-[0.039px]">开始</span>
            <svg className="absolute -right-[5px] top-1/2 -translate-y-1/2 z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>
          </div>

          {/* 链接横线 */}
          <div className="w-[54px] flex items-center flex-shrink-0 -mx-[1px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-full"> 
              <path d="M1 1H53" stroke="var(--primary-color, #5364FF)" strokeWidth="2" strokeLinecap="round"/> 
            </svg>
          </div>

          {/* 环节1卡片 */}
          <div className="flex w-[240px] pt-3 px-4 pb-4 flex-col items-start gap-3 rounded-[8px] border border-[#EAEDF1] bg-white flex-shrink-0 relative">
            <svg className="absolute -left-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>
            <svg className="absolute -right-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>

            {/* 环节1卡片上方 */}
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex justify-between items-center self-stretch">
                <div className="flex items-center gap-[4px]">
                  <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-[#EBF1FF]" style={{ backgroundColor: 'var(--primary-bg-hover, #EBF1FF)' }}>
                    <span className="text-[var(--primary-color,#5364FF)] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">标</span>
                  </div>
                  <div className="text-[#0B0B0F] font-['PingFang_SC'] text-[14px] font-medium leading-[22px]">环节1</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-start border border-[#E8EBEF] rounded-[4px]">
                    <div className="flex px-2 items-start gap-2.5 bg-[#F6F7FB] rounded-l-[4px]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">ID</span>
                    </div>
                    <div className="flex px-2 items-start gap-2.5 rounded-r-[4px] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05),-1px_0_0_0_#E8EBEF]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">1</span>
                    </div>
                  </div>
                  <div className="flex p-1 justify-center items-center rounded-[4px] bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <MoreHorizontal size={14} className="text-[#86909C]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 环节1卡片下方 */}
            <div className="flex p-2 items-center gap-[8px] self-stretch rounded-[4px] bg-[#F6F7FB]">
              <span className="text-[#86909C] font-['PingFang_SC'] text-[13px] font-normal leading-normal">最大作业占用时长</span>
              <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-white">
                <span className="text-[#737A87] font-['PingFang_SC'] text-[12px] font-normal leading-[20px] tracking-[0.036px]">不限</span>
              </div>
            </div>
          </div>

          {/* 链接横线 2 */}
          <div className="w-[54px] flex items-center flex-shrink-0 -mx-[1px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-full"> 
              <path d="M1 1H53" stroke="var(--primary-color, #5364FF)" strokeWidth="2" strokeLinecap="round"/> 
            </svg>
          </div>

          {/* 智能服务1卡片 */}
          <div className="flex w-[240px] pt-3 px-4 pb-4 flex-col items-start gap-3 rounded-[8px] border border-[#EAEDF1] bg-white flex-shrink-0 relative">
            <svg className="absolute -left-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>
            <svg className="absolute -right-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>

            {/* 智能服务1卡片上方 */}
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex justify-between items-center self-stretch">
                <div className="flex items-center gap-[4px]">
                  <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-[#E1F6E6]">
                    <span className="text-[#237040] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">AI</span>
                  </div>
                  <div className="text-[#0B0B0F] font-['PingFang_SC'] text-[14px] font-medium leading-[22px]">智能服务1</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-start border border-[#E8EBEF] rounded-[4px]">
                    <div className="flex px-2 items-start gap-2.5 bg-[#F6F7FB] rounded-l-[4px]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">ID</span>
                    </div>
                    <div className="flex px-2 items-start gap-2.5 rounded-r-[4px] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05),-1px_0_0_0_#E8EBEF]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">2</span>
                    </div>
                  </div>
                  <div className="flex p-1 justify-center items-center rounded-[4px] bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <MoreHorizontal size={14} className="text-[#86909C]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 智能服务1卡片下方 */}
            <div className="flex p-2 flex-col items-start gap-[8px] self-stretch rounded-[4px] bg-[#F6F7FB]">
              <div className="flex items-start gap-[8px] self-stretch">
                <span className="text-[#86909C] font-['PingFang_SC'] text-[13px] font-normal leading-[20px] w-[52px] flex-shrink-0">方案名称</span>
                <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-white">
                  <span className="text-[#737A87] font-['PingFang_SC'] text-[12px] font-normal leading-[20px] tracking-[0.036px] break-words break-all text-left">文本润色</span>
                </div>
              </div>
              <div className="flex items-start gap-[8px] self-stretch">
                <span className="text-[#86909C] font-['PingFang_SC'] text-[13px] font-normal leading-[20px] w-[52px] flex-shrink-0">方案备注</span>
                <div className="flex px-1.5 items-center gap-1 rounded-[4px] bg-white flex-1 min-w-0">
                  <span className="text-[#737A87] font-['PingFang_SC'] text-[12px] font-normal leading-[20px] tracking-[0.036px] break-words break-all text-left whitespace-normal">这是一个用来预处理标注数据的方案</span>
                </div>
              </div>
            </div>
          </div>

          {/* 链接横线 3 */}
          <div className="w-[54px] flex items-center flex-shrink-0 -mx-[1px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-full"> 
              <path d="M1 1H53" stroke="var(--primary-color, #5364FF)" strokeWidth="2" strokeLinecap="round"/> 
            </svg>
          </div>

          {/* 质检卡片 */}
          <div className="flex w-[240px] pt-3 px-4 pb-4 flex-col items-start gap-3 rounded-[8px] border border-[#EAEDF1] bg-white flex-shrink-0 relative">
            <svg className="absolute -left-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>
            <svg className="absolute -right-[5px] top-[24px] z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>

            {/* 质检卡片上方 */}
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex justify-between items-center self-stretch">
                <div className="flex items-center gap-[4px]">
                  <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-[#FFF3DC]">
                    <span className="text-[#BD7E00] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">审</span>
                  </div>
                  <div className="text-[#0B0B0F] font-['PingFang_SC'] text-[14px] font-medium leading-[22px]">质检</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-start border border-[#E8EBEF] rounded-[4px]">
                    <div className="flex px-2 items-start gap-2.5 bg-[#F6F7FB] rounded-l-[4px]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">ID</span>
                    </div>
                    <div className="flex px-2 items-start gap-2.5 rounded-r-[4px] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05),-1px_0_0_0_#E8EBEF]">
                      <span className="text-[#42464E] font-['PingFang_SC'] text-[12px] font-medium leading-[20px] tracking-[0.036px]">3</span>
                    </div>
                  </div>
                  <div className="flex p-1 justify-center items-center rounded-[4px] bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <MoreHorizontal size={14} className="text-[#86909C]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 质检卡片下方 */}
            <div className="flex p-2 items-center gap-[8px] self-stretch rounded-[4px] bg-[#F6F7FB]">
              <span className="text-[#86909C] font-['PingFang_SC'] text-[13px] font-normal leading-normal">最大作业占用时长</span>
              <div className="flex px-1.5 justify-center items-center gap-1 rounded-[4px] bg-white">
                <span className="text-[#737A87] font-['PingFang_SC'] text-[12px] font-normal leading-[20px] tracking-[0.036px]">不限</span>
              </div>
            </div>
          </div>

          {/* 链接横线 4 */}
          <div className="w-[54px] flex items-center flex-shrink-0 -mx-[1px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-full"> 
              <path d="M1 1H53" stroke="var(--primary-color, #5364FF)" strokeWidth="2" strokeLinecap="round"/> 
            </svg>
          </div>

          {/* 结束节点 */}
          <div className="relative flex w-[120px] px-4 py-3 justify-center items-center gap-2 rounded-[22px] border border-[#EAEDF1] bg-white flex-shrink-0">
            <svg className="absolute -left-[5px] top-1/2 -translate-y-1/2 z-10" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"> 
              <circle opacity="0.5" cx="5" cy="5" r="4.5" fill="var(--primary-color, #5364FF)" stroke="white"/> 
              <circle cx="5" cy="5" r="4" fill="var(--primary-color, #5364FF)" stroke="white" strokeWidth="1" opacity="0.5"/> 
            </svg>
            <span className="text-[#4D5868] font-['PingFang_SC'] text-[13px] font-medium leading-[20px] tracking-[0.039px]">结束</span>
          </div>
          
          {/* 工具栏 */}
          <div className="absolute right-[16px] bottom-[16px] inline-flex py-2 px-4 items-center gap-[8px] rounded-[8px] border border-[#EAEDF1] bg-white z-20">
            <div className="flex p-1 justify-center items-center rounded-[4px] bg-white hover:bg-[#F2F3F8] cursor-pointer transition-colors group">
              <img src="/toolbar-zoom-out.svg" alt="zoom out" className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <span className="text-[#4D5868] text-center font-['PingFang_SC'] text-[13px] font-normal leading-[22px] tracking-[0.039px] min-w-[36px]">
              100%
            </span>
            <div className="flex p-1 justify-center items-center rounded-[4px] bg-white hover:bg-[#F2F3F8] cursor-pointer transition-colors group">
              <img src="/toolbar-zoom-in.svg" alt="zoom in" className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <div className="w-[1px] h-[16px] bg-[#EAEDF1]"></div>
            <div className="flex p-1 justify-center items-center rounded-[4px] bg-white hover:bg-[#F2F3F8] cursor-pointer transition-colors group">
              <img src="/toolbar-fit.svg" alt="fit" className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <div className="flex p-1 justify-center items-center rounded-[4px] bg-white hover:bg-[#F2F3F8] cursor-pointer transition-colors group">
              <img src="/toolbar-fullscreen.svg" alt="fullscreen" className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useFilter() {
  const [hoverFilter, setHoverFilter] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicking outside of the active filter, clear the active state
      if (!event.target.closest('.active-filter-item')) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return { hoverFilter, setHoverFilter, activeFilter, setActiveFilter, getFilterInputStyle, getFilterLabelStyle };
}

// 数据 Tab
function DataTab() {
  const mockData = [
    { id: '7526834161223995186', status: '标注', state: '未就绪', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '检查', state: '待领取', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '质检', state: '处理中', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '结束', state: '通过', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '结束', state: '拒绝', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '结束', state: '返修', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '结束', state: '押后', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '标注', state: '通过', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
    { id: '7526834161223995186', status: '检查', state: '通过', batch: '1', start: '2025.07.15 18:00:00', end: '-', owner: '-' },
  ];

  const getStateStyle = (state) => {
    switch(state) {
      case '未就绪': return 'bg-[#F6F7FA] text-[#555B65] border-[#E2E5F1]';
      case '待领取': return 'bg-[var(--primary-bg-light)] text-[var(--primary-color)] border-[var(--primary-color)]';
      case '处理中': return 'bg-[#FFF2F5] text-[#F53F3F] border-[#F53F3F]';
      case '通过': return 'bg-[#F4FAEC] text-[#00B42A] border-[#00B42A]';
      case '拒绝': return 'bg-[#FFF2F5] text-[#F53F3F] border-[#F53F3F]';
      case '返修': return 'bg-[#FFF7E8] text-[#FF7D00] border-[#FF7D00]';
      case '押后': return 'bg-[#FFF7E8] text-[#FF7D00] border-[#FF7D00]';
      default: return 'bg-[#F6F7FA] text-[#555B65] border-[#E2E5F1]';
    }
  };

  const { hoverFilter, setHoverFilter, activeFilter, setActiveFilter, getFilterInputStyle, getFilterLabelStyle } = useFilter();
  const [isTaskStepMenuOpen, setIsTaskStepMenuOpen] = useState(false);
  const [selectedTaskStep, setSelectedTaskStep] = useState('指定任务节点, 不选默认全部');
  const taskStepMenuRef = useRef(null);
  const taskStepSelectorRef = useRef(null);
  const [taskStepDropdownWidth, setTaskStepDropdownWidth] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskStepMenuRef.current && !taskStepMenuRef.current.contains(event.target)) {
        setIsTaskStepMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isTaskStepMenuOpen && taskStepSelectorRef.current) {
      setTaskStepDropdownWidth(taskStepSelectorRef.current.offsetWidth);
    }
  }, [isTaskStepMenuOpen]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button className="px-4 py-1.5 border border-[var(--primary-color)] text-[var(--primary-color)] rounded text-[13px] flex items-center gap-1 bg-[var(--primary-bg-light)] hover:bg-[var(--primary-bg-hover)] transition-colors"><Database size={14}/> 数据导引 <Info size={12}/></button>
          <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] flex items-center gap-1 hover:bg-gray-50 transition-colors"><Upload size={14}/> 送标数据 <Info size={12}/></button>
          <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] flex items-center gap-1 hover:bg-gray-50 transition-colors"><Plus size={14}/> 生成导出任务</button>
          <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] flex items-center gap-1 hover:bg-gray-50 transition-colors"><RefreshCw size={14}/> 批量处理</button>
          <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] flex items-center gap-1 hover:bg-gray-50 transition-colors"><Database size={14}/> 送/取标列表</button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] mb-4">
          <div 
            ref={taskStepMenuRef}
            className={cn("flex items-center cursor-pointer transition-all h-[32px] relative filter-item", activeFilter === 'filter1' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter1')}
            onMouseLeave={() => setHoverFilter(null)}
            onClick={() => {
              setActiveFilter(activeFilter === 'filter1' ? null : 'filter1');
              setIsTaskStepMenuOpen(!isTaskStepMenuOpen);
            }}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3 relative z-10" style={getFilterLabelStyle('filter1')}>
               <span className="text-[#555B65]">任务环节</span>
             </div>
             <div 
               ref={taskStepSelectorRef}
               className="flex-1 flex items-center justify-between h-full px-3 w-[200px] relative z-20" 
               style={getFilterInputStyle('filter1')}
             >
               <span className={cn("truncate", selectedTaskStep === '指定任务节点, 不选默认全部' ? "text-[#86909C]" : "text-[#0B0B0F]")}>
                 {selectedTaskStep}
               </span>
               <ChevronDown size={14} className={cn("text-[#86909C] ml-2 flex-shrink-0 transition-transform duration-200", isTaskStepMenuOpen && "rotate-180")} />
             </div>

             {/* Custom Dropdown Menu */}
             {isTaskStepMenuOpen && (
               <div 
                 className="absolute z-[9999] flex flex-col items-start bg-[#FFF] border border-[#ECEEF9]"
                 style={{
                   width: `${taskStepDropdownWidth}px`,
                   padding: '6px',
                   gap: '4px',
                   right: 0,
                   top: 'calc(100% + 4px)',
                   borderRadius: '8px',
                   boxShadow: '0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)',
                 }}
                 onClick={(e) => e.stopPropagation()}
               >
                 {['标注', '质检', '检查', '验收'].map((step) => (
                   <div
                     key={step}
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
                       setSelectedTaskStep(step);
                       setIsTaskStepMenuOpen(false);
                       setActiveFilter(null);
                     }}
                   >
                     {step}
                   </div>
                 ))}
               </div>
             )}
          </div>

          <div 
            className={cn("flex items-center cursor-pointer transition-all h-[32px] filter-item", activeFilter === 'filter2' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter2')}
            onMouseLeave={() => setHoverFilter(null)}
            onClick={() => setActiveFilter(activeFilter === 'filter2' ? null : 'filter2')}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter2')}>
               <span className="text-[#555B65]">题目状态</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[100px]" style={getFilterInputStyle('filter2')}>
               <span className="text-[#86909C]">全部</span>
               <ChevronDown size={14} className="text-[#86909C]"/>
             </div>
          </div>

          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter3' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter3')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter3')}>
               <span className="text-[#555B65]">任务题ID</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[200px]" style={getFilterInputStyle('filter3')}>
               <input 
                 type="text" 
                 placeholder="请输入任务题ID并用回车分隔" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter3')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>

          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter4' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter4')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter4')}>
               <span className="text-[#555B65]">包ID</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[150px]" style={getFilterInputStyle('filter4')}>
               <input 
                 type="text" 
                 placeholder="请输入" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter4')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>

          <div 
            className={cn("flex items-center cursor-pointer transition-all h-[32px] filter-item", activeFilter === 'filter5' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter5')}
            onMouseLeave={() => setHoverFilter(null)}
            onClick={() => setActiveFilter(activeFilter === 'filter5' ? null : 'filter5')}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter5')}>
               <span className="text-[#555B65]">送标时间</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[200px]" style={getFilterInputStyle('filter5')}>
               <span className="text-[#86909C]">开始日期 - 结束日期</span>
               <Clock size={14} className="text-[#86909C]"/>
             </div>
          </div>

          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter6' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter6')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter6')}>
               <span className="text-[#555B65]">送标批次</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[150px]" style={getFilterInputStyle('filter6')}>
               <input 
                 type="text" 
                 placeholder="请输入" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter6')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>

          <div 
            className={cn("flex items-center cursor-pointer transition-all h-[32px] filter-item", activeFilter === 'filter7' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter7')}
            onMouseLeave={() => setHoverFilter(null)}
            onClick={() => setActiveFilter(activeFilter === 'filter7' ? null : 'filter7')}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter7')}>
               <span className="text-[#555B65]">结束时间</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[200px]" style={getFilterInputStyle('filter7')}>
               <span className="text-[#86909C]">开始日期 - 结束日期</span>
               <Clock size={14} className="text-[#86909C]"/>
             </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button className="px-4 py-1.5 bg-[var(--primary-color)] text-white rounded text-[13px] hover:bg-[#4353E5] transition-colors">查询</button>
             <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] hover:bg-gray-50 transition-colors">列表重置</button>
             <button className="px-4 py-1.5 border border-[#E2E5F1] rounded text-[13px] hover:bg-gray-50 transition-colors">全部重置</button>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center justify-center w-[32px] h-[32px] border border-[#E2E5F1] rounded hover:bg-gray-50 text-[#555B65] transition-colors"><RefreshCw size={14}/></button>
             <button className="px-3 h-[32px] border border-[#E2E5F1] rounded text-[13px] flex items-center gap-1 hover:bg-gray-50 text-[#555B65] transition-colors"><Settings size={14}/> 高级筛选</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-4">
        <div className="border border-[#E2E5F1] rounded-[8px] overflow-auto h-fit" style={{ maxHeight: 'calc(100% - 60px)' }}>
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F6F7FA] text-[#555B65] text-[13px] font-medium border-b border-[#E2E5F1] sticky top-0 z-10">
              <tr>
                <th className="py-3 pr-3 pl-4">任务题ID</th>
                <th className="p-3">当前节点</th>
                <th className="p-3">批次</th>
                <th className="p-3">送标时间 <ChevronLeft size={12} className="inline rotate-90 cursor-pointer"/></th>
                <th className="p-3">结束时间 <ChevronLeft size={12} className="inline rotate-90 cursor-pointer"/></th>
                <th className="p-3">当前占有人</th>
                <th className="p-3">标注</th>
                <th className="p-3">质检</th>
                <th className="p-3 pr-4"><Settings size={14} className="cursor-pointer"/></th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={i} className="border-b border-[#E2E5F1] last:border-0 text-[13px] text-[#0B0B0F] hover:bg-[#F9FAFF] transition-colors">
                  <td className="py-3 pr-3 pl-4">
                    <div className="text-[var(--primary-color)] cursor-pointer hover:underline">{item.id}</div>
                  </td>
                  <td className="p-3">
                  {item.status === '标注' && (
                    <span 
                      className="inline-flex items-center justify-center"
                      style={{
                        padding: '1px 6px',
                        gap: '4px',
                        borderRadius: '4px',
                        background: '#EBF1FF', // var(--blue-link-2)
                        color: 'var(--primary-color)',
                        fontFamily: '"PingFang SC"',
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        letterSpacing: '0.039px'
                      }}
                    >
                      标注
                    </span>
                  )}
                  {item.status === '检查' && (
                    <span 
                      className="inline-flex items-center justify-center flex-shrink-0"
                      style={{
                        height: '24px',
                        padding: '0 6px',
                        gap: '4px',
                        borderRadius: '4px',
                        background: '#FFF3DC', // var(--yellow-tag-warning-2)
                        color: '#BD7E00', // var(--yellow-warning-6)
                        fontFamily: '"PingFang SC"',
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        letterSpacing: '0.039px'
                      }}
                    >
                      检查
                    </span>
                  )}
                  {item.status === '质检' && (
                    <span 
                      className="inline-flex items-center justify-center"
                      style={{
                        padding: '1px 6px',
                        gap: '4px',
                        borderRadius: '4px',
                        background: '#F7E4FF',
                        color: '#794F89',
                        fontFamily: '"PingFang SC"',
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        letterSpacing: '0.039px'
                      }}
                    >
                      质检
                    </span>
                  )}
                  {item.status === '结束' && (
                    <span 
                      className="inline-flex items-center justify-center"
                      style={{
                        padding: '1px 6px',
                        gap: '4px',
                        borderRadius: '4px',
                        background: '#E1F6E6', // var(--green-tag-success-2)
                        color: '#237040', // var(--green-success-7)
                        fontFamily: '"PingFang SC"',
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        letterSpacing: '0.039px'
                      }}
                    >
                      结束
                    </span>
                  )}
                </td>
                <td className="p-3">{item.batch}</td>
                <td className="p-3">{item.start}</td>
                <td className="p-3">{item.end}</td>
                <td className="p-3">{item.owner}</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3 pr-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

// 统计 Tab
function StatsTab() {
  const { hoverFilter, setHoverFilter, activeFilter, setActiveFilter, getFilterInputStyle, getFilterLabelStyle } = useFilter();

  const cards = [
    { label: '作业中人数', value: '12', unit: '人' },
    { label: '送标数', value: '13,728', arrow: 'up' },
    { label: '有效完成题数', value: '1,278', arrow: 'up' },
    { label: '完结题数', value: '1,278', arrow: 'up' },
    { label: '废弃次数', value: '1,278', arrow: 'up' },
    { label: '有效完结进度', value: '32.64', unit: '%' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white pt-4">
        <div className="grid grid-cols-2 gap-12 mb-8">
           <div>
             <div className="flex items-center gap-1 text-[13px] text-[#555B65] mb-2">标注进度 <Info size={12}/></div>
             <div className="text-[28px] font-bold text-[#0B0B0F] mb-2">75%</div>
             <div className="h-2 bg-[#F6F7FA] rounded-full overflow-hidden mb-2">
               <div className="h-full bg-[var(--primary-color)] w-[75%] rounded-full"></div>
             </div>
             <div className="flex justify-between text-[12px] text-[#86909C]">
               <span>标注数: 75</span>
               <span>题目总数: 100</span>
             </div>
           </div>
           <div>
             <div className="flex items-center gap-1 text-[13px] text-[#555B65] mb-2">有效完结进度 <Info size={12}/></div>
             <div className="text-[28px] font-bold text-[#0B0B0F] mb-2">75%</div>
             <div className="h-2 bg-[#F6F7FA] rounded-full overflow-hidden mb-2">
               <div className="h-full bg-[#00B42A] w-[75%] rounded-full"></div>
             </div>
             <div className="flex justify-between text-[12px] text-[#86909C]">
               <span>有效完结数: 75</span>
               <span>题目总数: 100</span>
             </div>
           </div>
        </div>
        
        <div className="flex items-center justify-between mb-8 border-b border-[#E2E5F1] pb-6">
           <div className="flex items-center gap-2">
             <div className="flex rounded border border-[#E2E5F1] overflow-hidden text-[13px]">
               <button className="px-4 py-1.5 bg-[var(--primary-bg-light)] text-[var(--primary-color)] border-r border-[#E2E5F1]">今日</button>
               <button className="px-4 py-1.5 hover:bg-gray-50 border-r border-[#E2E5F1]">近7日</button>
               <button className="px-4 py-1.5 hover:bg-gray-50 border-r border-[#E2E5F1]">近14日</button>
               <button className="px-4 py-1.5 hover:bg-gray-50 border-r border-[#E2E5F1]">近30日</button>
               <button className="px-4 py-1.5 hover:bg-gray-50">自定义</button>
             </div>
             <div className="border border-[#E2E5F1] rounded px-3 py-1.5 text-[13px] text-[#555B65] flex items-center gap-2">
               2025-12-08 00:00 - 2025-12-08 23:59 <Clock size={14}/>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <button className="h-[32px] border border-[#E2E5F1] rounded px-3 text-[13px] flex items-center gap-1 hover:bg-gray-50 transition-colors"><Download size={14}/> 导出数据 <ChevronLeft size={12} className="-rotate-90"/></button>
             <button className="flex items-center justify-center w-[32px] h-[32px] border border-[#E2E5F1] rounded hover:bg-gray-50 transition-colors"><RefreshCw size={14}/></button>
           </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-8">
           {cards.map((c, i) => (
             <div key={i} className="flex flex-col">
               <div className="flex items-center gap-1 text-[13px] text-[#555B65] mb-2">{c.label} <Info size={12}/></div>
               <div className="flex items-baseline gap-1 text-[#0B0B0F]">
                 <span className="text-[24px] font-bold">{c.value}</span>
                 {c.unit && <span className="text-[14px]">{c.unit}</span>}
                 {c.arrow && <span className="text-[#86909C] text-[16px]">↑</span>}
               </div>
             </div>
           ))}
        </div>

        <div className="flex items-center gap-6 border-b border-[#E2E5F1] mb-6">
           {['作业榜', '自定义统计', '统计详情', '包列表', '自定义看板'].map((tab, i) => (
             <div key={tab} className={cn("pb-2 cursor-pointer text-[14px] relative no-underline", i === 0 ? "text-[var(--primary-color)] font-medium" : "text-[#555B65] hover:text-[var(--primary-color)]")}>
               {tab}
               {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-color)]"/>}
             </div>
           ))}
        </div>

        <div className="flex items-center gap-4 mb-4 text-[13px]">
           <div 
             className={cn("flex items-center cursor-pointer transition-all h-[32px] filter-item", activeFilter === 'filter1' && "active-filter-item")}
             onMouseEnter={() => setHoverFilter('filter1')}
             onMouseLeave={() => setHoverFilter(null)}
             onClick={() => setActiveFilter(activeFilter === 'filter1' ? null : 'filter1')}
           >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter1')}>
               <span className="text-[#555B65]">指标类型</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[120px]" style={getFilterInputStyle('filter1')}>
               <span className="text-[#0B0B0F]">次数统计</span>
               <ChevronDown size={14} className="text-[#86909C]"/>
             </div>
           </div>

           <div 
             className={cn("flex items-center cursor-pointer transition-all h-[32px] filter-item", activeFilter === 'filter2' && "active-filter-item")}
             onMouseEnter={() => setHoverFilter('filter2')}
             onMouseLeave={() => setHoverFilter(null)}
             onClick={() => setActiveFilter(activeFilter === 'filter2' ? null : 'filter2')}
           >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter2')}>
               <span className="text-[#555B65]">环节</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[120px]" style={getFilterInputStyle('filter2')}>
               <span className="text-[#0B0B0F]">标注</span>
               <ChevronDown size={14} className="text-[#86909C]"/>
             </div>
           </div>

           <div 
             className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter3' && "active-filter-item")}
             onMouseEnter={() => setHoverFilter('filter3')}
             onMouseLeave={() => setHoverFilter(null)}
           >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter3')}>
               <span className="text-[#555B65]">用户</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[200px]" style={getFilterInputStyle('filter3')}>
               <input 
                 type="text" 
                 placeholder="请输入用户名, 回车搜索" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter3')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
           </div>
           <div className="ml-auto">
             <button className="flex items-center justify-center w-[32px] h-[32px] border border-[#E2E5F1] rounded hover:bg-gray-50 transition-colors"><Settings size={14}/></button>
           </div>
        </div>

        <div className="overflow-auto rounded-[8px] border border-[#E2E5F1]">
          <table className="w-full text-center border-collapse min-w-[1000px]">
            <thead className="bg-[#F6F7FA] text-[#555B65] text-[13px] font-medium">
              <tr>
                <th className="p-3 pl-4 border-b border-r border-[#E2E5F1] text-left w-[150px]" rowSpan={2}>用户</th>
                <th className="p-3 border-b border-r border-[#E2E5F1]" colSpan={6}>产量</th>
                <th className="p-3 pr-4 border-b border-[#E2E5F1] w-[120px]" rowSpan={2}>操作</th>
              </tr>
              <tr>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">作业提交次数 <Info size={12} className="inline"/></th>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">返修提交次数 <Info size={12} className="inline"/></th>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">【申诉前】标记合格数 <Info size={12} className="inline"/></th>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">【申诉前】标记不合格数 <Info size={12} className="inline"/></th>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">【申诉前】合格率 <ChevronLeft size={12} className="inline rotate-90 cursor-pointer"/></th>
                <th className="p-3 border-b border-r border-[#E2E5F1] font-normal">通过次数 <Info size={12} className="inline"/></th>
              </tr>
            </thead>
            <tbody>
              {Array(6).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-[#E2E5F1] last:border-0 text-[13px] hover:bg-[#F9FAFF] transition-colors">
                  <td className="p-3 pl-4 border-r border-[#E2E5F1] text-left">zhouhongxiang</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 border-r border-[#E2E5F1]">0</td>
                  <td className="p-3 pr-4 text-[var(--primary-color)] cursor-pointer hover:underline">回收占用任务题</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 分配 Tab
function DistributionTab() {
  const { hoverFilter, setHoverFilter, activeFilter, setActiveFilter, getFilterInputStyle, getFilterLabelStyle } = useFilter();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[13px]">
          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter1' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter1')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter1')}>
               <span className="text-[#555B65]">用户名</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[180px]" style={getFilterInputStyle('filter1')}>
               <input 
                 type="text" 
                 placeholder="搜索" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter1')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>
          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter2' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter2')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter2')}>
               <span className="text-[#555B65]">用户ID</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[180px]" style={getFilterInputStyle('filter2')}>
               <input 
                 type="text" 
                 placeholder="搜索" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter2')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[32px] px-4 border border-[#E2E5F1] bg-[#F6F7FA] text-[#0B0B0F] rounded text-[13px] flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors"><Plus size={14}/> 新增授权</button>
          <button className="flex items-center justify-center w-[32px] h-[32px] border border-[#E2E5F1] rounded hover:bg-gray-50 text-[#555B65] transition-colors"><MoreHorizontal size={14}/></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-4">
        <div className="border border-[#E2E5F1] rounded-[8px] overflow-auto h-fit" style={{ maxHeight: 'calc(100% - 60px)' }}>
          <table className="w-full text-center border-collapse min-w-[1200px]">
            <thead className="bg-[#F6F7FA] text-[#555B65] text-[13px] font-medium border-b border-[#E2E5F1] sticky top-0 z-10">
              <tr>
                <th className="py-3 pr-3 pl-4 text-left">用户名/ID</th>
                <th className="p-3">标注</th>
                <th className="p-3">标注 授权</th>
                <th className="p-3">检查 <Info size={12} className="inline"/></th>
                <th className="p-3">检查 授权</th>
                <th className="p-3">任务数据 <Info size={12} className="inline"/></th>
                <th className="p-3">任务数据 授权</th>
                <th className="p-3">任务统计</th>
                <th className="p-3">标注结果 <Info size={12} className="inline"/></th>
                <th className="p-3">标注结果 授权</th>
                <th className="p-3 pr-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-[#E2E5F1] last:border-0 text-[13px] text-[#0B0B0F] hover:bg-[#F9FAFF] transition-colors">
                  <td className="py-3 pr-3 pl-4 text-left">
                    <div>周鸿翔</div>
                    <div className="text-[#86909C] text-[12px]">7296829258498883621</div>
                  </td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3">
                    <div className="flex flex-col items-center">
                      <Check size={16} className="text-[var(--primary-color)]" strokeWidth={3}/>
                      <span className="text-[var(--primary-color)] text-[12px]">抽检 100%</span>
                    </div>
                  </td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3"><Check size={16} className="text-[var(--primary-color)] mx-auto" strokeWidth={3}/></td>
                  <td className="p-3 pr-4"><span className="text-[var(--primary-color)] cursor-pointer hover:underline">移除</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-shrink-0 py-3 flex items-center justify-end gap-4 text-[13px] text-[#555B65]">
           <span>共 62 项</span>
         <div className="flex items-center gap-1">
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50"><ChevronLeft size={14}/></button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">1</button>
           <button className="w-6 h-6 bg-[var(--primary-color)] text-white rounded flex items-center justify-center">2</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">3</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">4</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">5</button>
           <span className="mx-1">...</span>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">19</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50"><ChevronLeft size={14} className="rotate-180"/></button>
         </div>
         <select className="border border-[#E2E5F1] rounded px-2 py-1 outline-none"><option>20 条/页</option></select>
         <div className="flex items-center gap-2">
           跳至 <input type="text" className="w-8 border border-[#E2E5F1] rounded text-center outline-none" defaultValue="12"/> 页
         </div>
        </div>
      </div>
    </div>
  );
}

// 分发 Tab
function DispatchTab() {
  const { hoverFilter, setHoverFilter, activeFilter, setActiveFilter, getFilterInputStyle, getFilterLabelStyle } = useFilter();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px]">
          <div 
            className={cn("flex items-center transition-all h-[32px] filter-item", activeFilter === 'filter1' && "active-filter-item")}
            onMouseEnter={() => setHoverFilter('filter1')}
            onMouseLeave={() => setHoverFilter(null)}
          >
             <div className="flex items-center justify-center flex-shrink-0 h-full px-3" style={getFilterLabelStyle('filter1')}>
               <span className="text-[#555B65]">用户ID</span>
             </div>
             <div className="flex-1 flex items-center justify-between h-full px-3 w-[240px]" style={getFilterInputStyle('filter1')}>
               <input 
                 type="text" 
                 placeholder="搜索" 
                 className="outline-none w-full bg-transparent text-[#0B0B0F] placeholder-[#86909C]"
                 onFocus={() => setActiveFilter('filter1')}
                 onBlur={() => setActiveFilter(null)}
               />
               <Search size={14} className="text-[#86909C]"/>
             </div>
          </div>
        </div>
        <button className="flex items-center justify-center w-[32px] h-[32px] border border-[#E2E5F1] rounded hover:bg-gray-50 text-[#555B65] transition-colors"><RefreshCw size={14}/></button>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-4">
        <div className="border border-[#E2E5F1] rounded-[8px] overflow-auto h-fit" style={{ maxHeight: 'calc(100% - 60px)' }}>
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F6F7FA] text-[#555B65] text-[13px] font-medium border-b border-[#E2E5F1] sticky top-0 z-10">
              <tr>
                <th className="py-3 pr-3 pl-4 text-left">用户名</th>
                <th className="p-3">用户ID</th>
                <th className="p-3">人题标签&倾向值 <Info size={12} className="inline"/></th>
                <th className="p-3">小组标签</th>
                <th className="p-3 pr-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-[#E2E5F1] last:border-0 text-[13px] text-[#0B0B0F] hover:bg-[#F9FAFF] transition-colors">
                  <td className="py-3 pr-3 pl-4 text-left">zhouhongxiang</td>
                  <td className="p-3">6800994139618938632</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 border border-[#E2E5F1] rounded-md text-[12px] text-[#555B65]">英语, 多模态</span>
                      <span className="px-2 py-1 border border-[#E2E5F1] rounded-md text-[12px] text-[#555B65]">28</span>
                    </div>
                  </td>
                  <td className="p-3">多模态一组</td>
                  <td className="p-3 pr-4"><span className="text-[var(--primary-color)] cursor-pointer hover:underline">编辑</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-shrink-0 py-3 flex items-center justify-end gap-4 text-[13px] text-[#555B65]">
           <div className="flex items-center gap-1 text-[13px] text-[#555B65]">
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50"><ChevronLeft size={14}/></button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">1</button>
           <button className="w-6 h-6 bg-[var(--primary-color)] text-white rounded flex items-center justify-center">2</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">3</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">4</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">5</button>
           <span className="mx-1">...</span>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50">19</button>
           <button className="w-6 h-6 border border-[#E2E5F1] rounded flex items-center justify-center hover:bg-gray-50"><ChevronLeft size={14} className="rotate-180"/></button>
         </div>
        </div>
      </div>
    </div>
  );
}

export default function TaskDetail({ task, onBack }) {
  const [activeTab, setActiveTab] = useState('详情');
  const tabs = ['详情', '数据', '统计', '分配', '分发'];

  const [actionMenuPos, setActionMenuPos] = useState(null);
  const actionTimeoutRef = useRef(null);

  const handleActionMouseEnter = (e) => {
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setActionMenuPos({
      top: rect.bottom,
      right: window.innerWidth - rect.right,
    });
  };

  const handleActionMouseLeave = () => {
    actionTimeoutRef.current = setTimeout(() => {
      setActionMenuPos(null);
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden absolute inset-0 z-20">
      <div className="flex flex-col pt-5 pb-0 flex-shrink-0">
         <div className="flex items-center justify-between mb-2 px-6">
            <div className="flex items-center gap-2">
              <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-md transition-colors -ml-1"><ChevronLeft size={20} className="text-[#0B0B0F]"/></button>
              <h1 className="font-semibold text-[#0B0B0F]" style={{ fontSize: '16px', lineHeight: '22px' }}>{task.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[12px] bg-[var(--primary-bg-hover)] text-[var(--primary-color)] flex items-center gap-1 font-medium ml-2 no-underline">
                 <Play size={10} fill="currentColor"/> 进行中
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="flex justify-center items-center gap-[6px] rounded-[6px] border border-[#E2E5F1] hover:bg-gray-50 transition-colors"
                style={{ padding: '5px 16px' }}
              >
                <span 
                  className="text-center font-medium text-[#3F3F51]"
                  style={{ fontFamily: '"PingFang SC"', fontSize: '13px', lineHeight: '22px', letterSpacing: '0.039px' }}
                >
                  编辑
                </span>
              </button>
              <div className="relative">
                <button 
                  className="flex justify-center items-center gap-[8px] rounded-[6px] border border-[#E2E5F1] bg-[#FFF] hover:bg-gray-50 transition-colors text-[#3F3F51]"
                  style={{ width: '32px', height: '32px', padding: '10px' }}
                  onMouseEnter={handleActionMouseEnter}
                  onMouseLeave={handleActionMouseLeave}
                >
                  <div className="flex justify-center items-center flex-shrink-0" style={{ width: '12px', height: '12px' }}>
                    <MoreHorizontal size={12} />
                  </div>
                </button>
                {actionMenuPos && createPortal(
                  <div
                    className="fixed z-[99999] flex flex-col bg-white"
                    style={{
                      top: `${actionMenuPos.top + 4}px`,
                      right: `${actionMenuPos.right}px`,
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
                    <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">启动</div>
                    <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">暂停</div>
                    <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">结束</div>
                    <div className="px-3 py-1.5 text-[14px] leading-[22px] cursor-pointer hover:bg-[var(--primary-bg-hover)] hover:text-[var(--primary-color)] text-[#0B0B0F] transition-colors rounded-md text-center">删除</div>
                  </div>,
                  document.body
                )}
              </div>
            </div>
         </div>
         <div className="flex items-center gap-8 text-[13px] text-[#86909C] mb-6 px-6 pl-[56px]">
            <div className="flex items-center gap-2">
              <span>任务ID: {task.id}</span> 
              <Copy size={14} className="cursor-pointer hover:text-[var(--primary-color)] transition-colors"/>
            </div>
            <div>
              <span>任务描述: {task.name}</span>
            </div>
         </div>
         <div className="flex w-full items-center px-5" style={{ borderBottom: '1px solid #F0F2FA', gap: '6px' }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex items-center cursor-pointer transition-colors group relative",
                    isActive ? "z-10" : ""
                  )}
                  style={isActive ? {
                    padding: '5px 16px',
                    gap: '8px',
                    borderRadius: '4px 4px 0 0',
                    borderRight: '1px solid #F0F2FA',
                    borderLeft: '1px solid #F0F2FA',
                    background: '#FFF',
                    boxShadow: '0 2px 0 0 var(--primary-color) inset',
                    height: '32px',
                    marginBottom: '-1px'
                  } : {
                    padding: '5px 16px',
                    gap: '8px',
                    borderRadius: '4px 4px 0 0',
                    border: '1px solid #F0F2FA',
                    borderBottom: 'none',
                    background: '#F6F7FA',
                    height: '32px',
                    marginBottom: '-1px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const span = e.currentTarget.querySelector('span');
                      if (span) span.style.color = 'var(--primary-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
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
                      color: isActive ? 'var(--primary-color)' : '#86909c', 
                      fontWeight: isActive ? 'bold' : 'normal' 
                    }}
                  >
                    {tab}
                  </span>
                </div>
              );
            })}
         </div>
       </div>
       <div className="flex-1 overflow-auto px-6 pt-[16px] bg-white">
          {activeTab === '详情' && <DetailTab task={task} />}
          {activeTab === '数据' && <DataTab />}
          {activeTab === '统计' && <StatsTab />}
          {activeTab === '分配' && <DistributionTab />}
          {activeTab === '分发' && <DispatchTab />}
       </div>
    </div>
  );
}