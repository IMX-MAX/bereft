"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const getNavClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "bg-[var(--color\\/surface-2,#3d3f3b)] border border-[var(--color\\/border,#40403e)] border-solid content-stretch flex gap-[11px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer no-underline"
      : "content-stretch flex gap-[11px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[var(--color\\/surface-2,#3d3f3b)] transition-colors no-underline";
  };

  const getNavTextClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\\/text-primary,#e8eddf)] whitespace-nowrap"
      : "[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\\/text-secondary,#cfdbd5)] whitespace-nowrap";
  };

  return (
    <div className="bg-[var(--color\/subtle,#1e1e1d)] border-[var(--color\/border,#40403e)] border-r border-solid content-stretch flex flex-col gap-[2px] h-full items-start overflow-clip pb-[10px] pt-[12px] px-[10px] relative shrink-0 w-[260px]">
      {/* Workspace Header */}
      <div className="content-stretch flex gap-[9px] items-center overflow-clip pb-[10px] pt-[6px] px-[6px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-[color:var(--color\/text-primary,#e8eddf)] tracking-[-0.15px] whitespace-nowrap">
          bereft
        </p>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m6 9 6 6 6-6"/></svg>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 cursor-pointer hover:stroke-[#e8eddf] transition-colors"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
      </div>

      {/* Search */}
      <div className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] cursor-pointer hover:border-[#4d4f4b] transition-colors">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap">
          Search
        </p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <span className="text-[12px] text-[#9fa8a2] bg-[rgba(255,255,255,0.06)] px-[6px] py-[2px] rounded-[4px] font-['Geist:Regular']">⌘K</span>
      </div>

      <div className="h-[4px] relative shrink-0 w-full" />

      {/* Section: Account */}
      <div className="content-stretch flex gap-[5px] items-center overflow-clip pb-[4px] pt-[8px] px-[8px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[11px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap uppercase tracking-[0.5px]">
          Account
        </p>
      </div>

      {/* Home */}
      <Link href="/home" className={getNavClass('/home')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <p className={getNavTextClass('/home')}>Home</p>
      </Link>

      {/* Email */}
      <Link href="/email" className={getNavClass('/email')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <p className={getNavTextClass('/email')}>Email</p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <span className="text-[11px] text-[#9fa8a2] bg-[rgba(255,255,255,0.08)] px-[5px] py-[1px] rounded-[4px]">3</span>
      </Link>

      {/* Contacts */}
      <Link href="/contacts" className={getNavClass('/contacts')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <p className={getNavTextClass('/contacts')}>Contacts</p>
      </Link>

      {/* Tasks */}
      <Link href="/tasks" className={getNavClass('/tasks')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
        <p className={getNavTextClass('/tasks')}>Tasks</p>
      </Link>

      {/* Docs */}
      <Link href="/docs" className={getNavClass('/docs')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        <p className={getNavTextClass('/docs')}>Docs</p>
      </Link>

      {/* Calendar */}
      <Link href="/calendar" className={getNavClass('/calendar')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        <p className={getNavTextClass('/calendar')}>Calendar</p>
      </Link>

      <div className="h-[4px] relative shrink-0 w-full" />

      {/* Section: Workspace */}
      <div className="content-stretch flex gap-[5px] items-center overflow-clip pb-[4px] pt-[8px] px-[8px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[11px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap uppercase tracking-[0.5px]">
          Workspace
        </p>
      </div>

      {/* Agents */}
      <Link href="/agents" className={getNavClass('/agents')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <p className={getNavTextClass('/agents')}>Agents</p>
      </Link>

      {/* Connections */}
      <Link href="/connections" className={getNavClass('/connections')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9fa8a2] shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        <p className={getNavTextClass('/connections')}>Connections</p>
      </Link>

      <div className="h-[4px] relative shrink-0 w-full" />

      {/* Section: Chats */}
      <div className="content-stretch flex gap-[5px] items-center overflow-clip pb-[4px] pt-[8px] px-[8px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[11px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap uppercase tracking-[0.5px]">
          Chats
        </p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 cursor-pointer hover:stroke-[#e8eddf] transition-colors"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </div>

      {/* Chat items */}
      <Link href="/chats" className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors no-underline">
        <span className="text-[14px] shrink-0">💬</span>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[normal] min-w-px overflow-hidden relative text-[13.5px] text-[color:var(--color\/text-secondary,#cfdbd5)] text-ellipsis whitespace-nowrap">
          Summarize unread Slack
        </p>
      </Link>

      <div className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors">
        <span className="text-[14px] shrink-0">💬</span>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[normal] min-w-px overflow-hidden relative text-[13.5px] text-[color:var(--color\/text-secondary,#cfdbd5)] text-ellipsis whitespace-nowrap">
          Inbox triage — today
        </p>
        <div className="w-[6px] h-[6px] rounded-full bg-[#f5cb5c] shrink-0" />
      </div>

      <div className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors">
        <span className="text-[14px] shrink-0">💬</span>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[normal] min-w-px overflow-hidden relative text-[13.5px] text-[color:var(--color\/text-secondary,#cfdbd5)] text-ellipsis whitespace-nowrap">
          Deal flow tracker
        </p>
        <div className="w-[6px] h-[6px] rounded-full bg-[#f5cb5c] shrink-0" />
      </div>

      <div className="content-stretch flex gap-[10px] items-center overflow-clip p-[8px] relative shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors rounded-[9px]">
        <span className="text-[14px] shrink-0">📋</span>
        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[13.5px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap">
          All chats
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-[1_0_0] min-h-px relative w-full" />

      {/* Footer */}
      <Link href="/settings" className="content-stretch flex gap-[9px] items-center overflow-clip pb-[6px] pt-[8px] px-[8px] relative shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors rounded-[9px] no-underline">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap">
          Settings
        </p>
      </Link>

      <Link href="/chats" className="content-stretch flex gap-[11px] items-center overflow-clip p-[8px] relative rounded-[9px] shrink-0 w-full cursor-pointer hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors no-underline">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap">
          New chat
        </p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <span className="text-[12px] text-[#9fa8a2] bg-[rgba(255,255,255,0.06)] px-[6px] py-[2px] rounded-[4px] font-['Geist:Regular']">⌘J</span>
      </Link>
    </div>
  );
}
