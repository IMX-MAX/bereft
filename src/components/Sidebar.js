"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const getNavClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "bg-white border border-[#e5e5e5] shadow-sm content-stretch flex gap-[11px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer no-underline"
      : "content-stretch flex gap-[11px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[#f2f2f2] transition-colors no-underline";
  };

  const getNavTextClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "[word-break:break-word] font-medium leading-[normal] relative shrink-0 text-[14px] text-[#333333] whitespace-nowrap"
      : "[word-break:break-word] font-normal leading-[normal] relative shrink-0 text-[14px] text-[#666666] whitespace-nowrap";
  };

  return (
    <div className="bg-[#f9f9f9] border-r border-[#ececec] content-stretch flex flex-col gap-[2px] h-full items-start overflow-clip pb-[10px] pt-[12px] px-[10px] relative shrink-0 w-[260px] font-['Inter',sans-serif]">
      {/* Workspace Header */}
      <div className="content-stretch flex gap-[9px] items-center overflow-clip pb-[10px] pt-[6px] px-[6px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-semibold leading-[normal] relative shrink-0 text-[15px] text-[#333333] tracking-[-0.15px] whitespace-nowrap">
          bereft
        </p>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m6 9 6 6 6-6"/></svg>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 cursor-pointer hover:stroke-[#333] transition-colors"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
      </div>

      {/* Search */}
      <div className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full bg-white border border-[#e5e5e5] shadow-sm cursor-pointer hover:border-[#ccc] transition-colors">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <p className="[word-break:break-word] font-normal leading-[normal] relative shrink-0 text-[14px] text-[#666]">
          Search
        </p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <span className="text-[12px] text-[#999] bg-[#f5f5f5] border border-[#eee] px-[6px] py-[2px] rounded-[4px]">⌘K</span>
      </div>

      <div className="h-[12px] relative shrink-0 w-full" />

      {/* Main Nav */}
      <Link href="/home" className={getNavClass('/home')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666] shrink-0"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <p className={getNavTextClass('/home')}>Home</p>
      </Link>

      <Link href="/calendar" className={getNavClass('/calendar')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666] shrink-0"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        <p className={getNavTextClass('/calendar')}>Calendar</p>
      </Link>
      
    {/* Planner */}
      <Link href="/plan" className={getNavClass('/plan')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666] shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        <p className={getNavTextClass('/plan')}>AI Planner</p>
      </Link>

      <div className="h-[12px] relative shrink-0 w-full" />

      {/* Spacer */}
      <div className="flex-[1_0_0] min-h-px relative w-full" />

      {/* Footer */}
      <Link href="/settings" className="content-stretch flex gap-[9px] items-center overflow-clip pb-[6px] pt-[8px] px-[8px] relative shrink-0 w-full cursor-pointer hover:bg-[#f2f2f2] transition-colors rounded-[9px] no-underline">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <p className="[word-break:break-word] font-normal leading-[normal] relative shrink-0 text-[13px] text-[#666] whitespace-nowrap">
          Settings
        </p>
      </Link>
    </div>
  );
}
