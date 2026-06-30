"use client";
import { useState } from "react";

export default function ConnectedAccountsSettingsPage() {
  const [sharingMode, setSharingMode] = useState("metadata");

  return (
    <div className="flex flex-col gap-[40px] w-full max-w-[600px]">
      <div>
        <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf] mb-[4px]">Connected Accounts</h1>
        <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2]">Manage integrations and data sharing preferences.</p>
      </div>

      <div className="flex flex-col gap-[16px]">
        {/* Gmail */}
        <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center text-[20px]">✉️</div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">Gmail</span>
                <span className="bg-[rgba(16,185,129,0.1)] text-[#10b981] text-[11px] font-['Geist:Medium'] font-medium px-[6px] py-[2px] rounded-[4px] flex items-center gap-[4px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#10b981]" /> Connected
                </span>
              </div>
              <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">brett@gmail.com · Sync: Real-time</span>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf] bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] px-[12px] py-[6px] rounded-[6px] transition-colors border border-[var(--color\/border,#40403e)]">
              Manage
            </button>
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] px-[12px] py-[6px] rounded-[6px] transition-colors">
              Disconnect
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center text-[20px]">📅</div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">Google Calendar</span>
                <span className="bg-[rgba(16,185,129,0.1)] text-[#10b981] text-[11px] font-['Geist:Medium'] font-medium px-[6px] py-[2px] rounded-[4px] flex items-center gap-[4px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#10b981]" /> Connected
                </span>
              </div>
              <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">brett@gmail.com · Sync: Real-time</span>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf] bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] px-[12px] py-[6px] rounded-[6px] transition-colors border border-[var(--color\/border,#40403e)]">
              Manage
            </button>
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] px-[12px] py-[6px] rounded-[6px] transition-colors">
              Disconnect
            </button>
          </div>
        </div>

        {/* Twitter */}
        <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-black border border-[#333] rounded-[8px] flex items-center justify-center text-[20px] text-white">𝕏</div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">X (Twitter)</span>
                <span className="bg-[rgba(16,185,129,0.1)] text-[#10b981] text-[11px] font-['Geist:Medium'] font-medium px-[6px] py-[2px] rounded-[4px] flex items-center gap-[4px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#10b981]" /> Connected
                </span>
              </div>
              <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">@brett</span>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf] bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] px-[12px] py-[6px] rounded-[6px] transition-colors border border-[var(--color\/border,#40403e)]">
              Manage
            </button>
            <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] px-[12px] py-[6px] rounded-[6px] transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[var(--color\/border,#40403e)] w-full" />

      {/* Sharing Preferences */}
      <div className="flex flex-col gap-[16px]">
        <h2 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf]">Default Sharing Options</h2>
        <div className="flex flex-col gap-[12px]">
          <label className="flex items-start gap-[12px] cursor-pointer group">
            <div className="w-[18px] h-[18px] mt-[2px] rounded-full border flex flex-shrink-0 items-center justify-center transition-colors border-[#f5cb5c]">
              {sharingMode === "full" && <div className="w-[10px] h-[10px] rounded-full bg-[#f5cb5c]" />}
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[14px] font-['Geist:Medium'] font-medium text-[#e8eddf]">Subject line and metadata</span>
              <span className="text-[13px] font-['Geist:Regular'] font-normal text-[#9fa8a2]">Workspace members can see the subject, sender, and recipients of emails linked to shared contacts or deals.</span>
            </div>
            <input type="radio" className="hidden" checked={sharingMode === "full"} onChange={() => setSharingMode("full")} />
          </label>

          <label className="flex items-start gap-[12px] cursor-pointer group">
            <div className="w-[18px] h-[18px] mt-[2px] rounded-full border flex flex-shrink-0 items-center justify-center transition-colors border-[#f5cb5c]">
              {sharingMode === "metadata" && <div className="w-[10px] h-[10px] rounded-full bg-[#f5cb5c]" />}
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[14px] font-['Geist:Medium'] font-medium text-[#e8eddf]">Metadata only</span>
              <span className="text-[13px] font-['Geist:Regular'] font-normal text-[#9fa8a2]">Members can only see that an interaction occurred (date and participants).</span>
            </div>
            <input type="radio" className="hidden" checked={sharingMode === "metadata"} onChange={() => setSharingMode("metadata")} />
          </label>

          <label className="flex items-start gap-[12px] cursor-pointer group">
            <div className="w-[18px] h-[18px] mt-[2px] rounded-full border flex flex-shrink-0 items-center justify-center transition-colors border-[var(--color\/border,#40403e)] group-hover:border-[#9fa8a2]">
              {sharingMode === "private" && <div className="w-[10px] h-[10px] rounded-full bg-[#f5cb5c]" />}
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[14px] font-['Geist:Medium'] font-medium text-[#e8eddf]">Private</span>
              <span className="text-[13px] font-['Geist:Regular'] font-normal text-[#9fa8a2]">Only you can see your interactions, even for shared contacts.</span>
            </div>
            <input type="radio" className="hidden" checked={sharingMode === "private"} onChange={() => setSharingMode("private")} />
          </label>
        </div>
      </div>

      <div className="h-[1px] bg-[var(--color\/border,#40403e)] w-full" />

      {/* Blocklist */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[8px]">
          <h2 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf]">Blocklist</h2>
          <span className="bg-[var(--color\/surface-2,#3d3f3b)] px-[8px] py-[2px] rounded-[10px] text-[11px] font-['Geist:Medium'] font-medium text-[#9fa8a2]">2</span>
        </div>
        
        <div className="flex gap-[8px]">
          <input 
            type="text" 
            placeholder="Email address or domain (e.g., @competitor.com)" 
            className="flex-1 bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[8px] text-[14px] text-[#e8eddf] outline-none focus:border-[#cfdbd5] transition-colors"
          />
          <button className="bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors border border-[var(--color\/border,#40403e)] rounded-[8px] px-[16px] py-[8px] text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
            Add
          </button>
        </div>

        <div className="flex flex-col border border-[var(--color\/border,#40403e)] rounded-[8px] overflow-hidden">
          <div className="flex items-center justify-between px-[16px] py-[12px] bg-[var(--color\/surface,#333533)] border-b border-[var(--color\/border,#40403e)]">
            <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">@competitor.com</span>
            <div className="flex items-center gap-[12px]">
              <span className="text-[12px] text-[#9fa8a2]">Private</span>
              <button className="text-[#9fa8a2] hover:text-[#ef4444] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-[16px] py-[12px] bg-[var(--color\/surface,#333533)]">
            <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">personal@gmail.com</span>
            <div className="flex items-center gap-[12px]">
              <span className="text-[12px] text-[#9fa8a2]">Blocked</span>
              <button className="text-[#9fa8a2] hover:text-[#ef4444] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
