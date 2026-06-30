"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  const getNavClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "bg-[var(--color\\/surface-2,#3d3f3b)] content-stretch flex items-center overflow-clip px-[12px] py-[6px] relative rounded-[6px] shrink-0 w-full cursor-pointer transition-colors no-underline"
      : "content-stretch flex items-center overflow-clip px-[12px] py-[6px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-colors no-underline";
  };

  const getNavTextClass = (path) => {
    const isActive = pathname === path || pathname.startsWith(path + '/');
    return isActive
      ? "[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\\/text-primary,#e8eddf)] whitespace-nowrap"
      : "[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\\/text-secondary,#cfdbd5)] whitespace-nowrap";
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      {/* Top Bar */}
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[20px] pr-[18px] py-[12px] relative shrink-0 w-full z-10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
          Settings
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Secondary Sidebar */}
        <div className="w-[240px] border-r border-[var(--color\/border,#40403e)] bg-[var(--color\/canvas,#242423)] flex flex-col py-[16px] px-[12px] shrink-0 overflow-y-auto">
          
          <div className="mb-[24px]">
            <p className="px-[12px] mb-[8px] font-['Geist:SemiBold'] font-semibold text-[11px] text-[#9fa8a2] uppercase tracking-[0.5px]">
              Account
            </p>
            <div className="flex flex-col gap-[2px]">
              <Link href="/settings/profile" className={getNavClass('/settings/profile')}>
                <p className={getNavTextClass('/settings/profile')}>Profile</p>
              </Link>
              <Link href="/settings/appearance" className={getNavClass('/settings/appearance')}>
                <p className={getNavTextClass('/settings/appearance')}>Appearance</p>
              </Link>
              <Link href="/settings/notifications" className={getNavClass('/settings/notifications')}>
                <p className={getNavTextClass('/settings/notifications')}>Notifications</p>
              </Link>
              <Link href="/settings/connected" className={getNavClass('/settings/connected')}>
                <p className={getNavTextClass('/settings/connected')}>Connected Accounts</p>
              </Link>
            </div>
          </div>

          <div>
            <p className="px-[12px] mb-[8px] font-['Geist:SemiBold'] font-semibold text-[11px] text-[#9fa8a2] uppercase tracking-[0.5px]">
              Workspace
            </p>
            <div className="flex flex-col gap-[2px]">
              <div className="content-stretch flex items-center overflow-clip px-[12px] py-[6px] relative rounded-[6px] shrink-0 w-full opacity-50">
                <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#cfdbd5]">General</p>
              </div>
              <div className="content-stretch flex items-center overflow-clip px-[12px] py-[6px] relative rounded-[6px] shrink-0 w-full opacity-50">
                <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#cfdbd5]">Members</p>
              </div>
              <Link href="/settings/billing" className={getNavClass('/settings/billing')}>
                <p className={getNavTextClass('/settings/billing')}>Billing & plans</p>
              </Link>
            </div>
          </div>

        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[700px] px-[48px] py-[40px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
