"use client";
import { useState } from "react";

export default function NotificationsSettingsPage() {
  const [push, setPush] = useState(true);
  const [meetings, setMeetings] = useState(true);
  const [updates, setUpdates] = useState(false);

  const Toggle = ({ checked, onChange }) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-[40px] h-[24px] rounded-full p-[2px] cursor-pointer transition-colors ${checked ? 'bg-[#f5cb5c]' : 'bg-[var(--color\/surface-2,#3d3f3b)]'}`}
    >
      <div className={`w-[20px] h-[20px] rounded-full bg-white transition-transform ${checked ? 'translate-x-[16px]' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[500px]">
      <div>
        <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf] mb-[4px]">Notifications</h1>
        <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2]">Control how and when Bereft contacts you.</p>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Push */}
        <div className="flex items-center justify-between py-[12px] border-b border-[var(--color\/border,#40403e)]">
          <div className="flex flex-col gap-[4px] pr-[20px]">
            <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">Push notifications</span>
            <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">Get notified on your phone when new emails arrive that require your attention.</span>
          </div>
          <Toggle checked={push} onChange={setPush} />
        </div>

        {/* Meetings */}
        <div className="flex items-center justify-between py-[12px] border-b border-[var(--color\/border,#40403e)]">
          <div className="flex flex-col gap-[4px] pr-[20px]">
            <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">Meeting summaries</span>
            <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">Get emailed when AI meeting summaries are ready and action items are extracted.</span>
          </div>
          <Toggle checked={meetings} onChange={setMeetings} />
        </div>

        {/* Product Updates */}
        <div className="flex items-center justify-between py-[12px] border-b border-[var(--color\/border,#40403e)]">
          <div className="flex flex-col gap-[4px] pr-[20px]">
            <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">Product updates</span>
            <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">Receive occasional emails about new features, improvements, and tips.</span>
          </div>
          <Toggle checked={updates} onChange={setUpdates} />
        </div>
      </div>
    </div>
  );
}
