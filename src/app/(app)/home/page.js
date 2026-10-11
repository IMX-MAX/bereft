"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const stats = [
    { label: 'Unread Emails', value: '12', icon: '✨', color: 'bg-[#e0f2fe]', textColor: 'text-[#0369a1]' },
    { label: "Today's Events", value: '4', icon: '📅', color: 'bg-[#fce7f3]', textColor: 'text-[#be185d]' },
    { label: 'Open Tasks', value: '8', icon: '🎯', color: 'bg-[#fef3c7]', textColor: 'text-[#b45309]' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#f9f9f9] font-['Inter',sans-serif] overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#fdfdfd] border-b border-[#ececec] content-stretch flex items-center px-[20px] py-[12px] relative shrink-0 w-full">
        <p className="font-semibold text-[14px] text-[#333]">
          Home
        </p>
        <div className="flex-1" />
        <p className="font-medium text-[13px] text-[#999]">
          {dateStr}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-[40px] py-[40px] flex flex-col gap-[32px]">
          
          {/* Greeting */}
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-semibold text-[28px] text-[#333] tracking-tight">
              Good morning! Ready to crush it today? ☀️
            </h1>
            <p className="text-[15px] text-[#666]">
              Your AI assistant is synced and ready to help you plan.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-[16px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border border-[#e5e5e5] rounded-[16px] p-[20px] flex items-center gap-[16px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-[24px] ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <p className={`font-bold text-[24px] ${stat.textColor}`}>{stat.value}</p>
                  <p className="font-medium text-[13px] text-[#666]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-2 gap-[16px] mt-4">
            <div 
              onClick={() => router.push('/plan')}
              className="group bg-white border border-[#e5e5e5] rounded-[16px] p-[24px] flex flex-col items-center justify-center gap-[12px] shadow-sm hover:border-[#ccc] hover:bg-[#fdfdfd] transition-all cursor-pointer text-center"
            >
              <div className="w-[56px] h-[56px] bg-[#f3f4f6] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-[#333]">Draft your day with AI</h3>
                <p className="text-[13px] text-[#666] mt-1">Let the AI engine organize your tasks and events automatically.</p>
              </div>
            </div>

            <div 
              onClick={() => router.push('/calendar')}
              className="group bg-white border border-[#e5e5e5] rounded-[16px] p-[24px] flex flex-col items-center justify-center gap-[12px] shadow-sm hover:border-[#ccc] hover:bg-[#fdfdfd] transition-all cursor-pointer text-center"
            >
              <div className="w-[56px] h-[56px] bg-[#f3f4f6] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-[#333]">View Calendar</h3>
                <p className="text-[13px] text-[#666] mt-1">Drag and drop your tasks into an ultra-clean schedule.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center opacity-60">
            <p className="text-[12px] text-[#999] font-medium uppercase tracking-wider">Workspace Sync</p>
            <p className="text-[13px] text-[#666] mt-2">All integrations are active. Data last synced 2 mins ago.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
