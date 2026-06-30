"use client";
import Link from 'next/link';

export default function ThreadPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      {/* Top Bar */}
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
        <Link href="/email" className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[4px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <span className="text-[14px] text-[#9fa8a2] mx-[4px]">/</span>
        <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#e8eddf]">
          Re: Acme Renewal Proposal
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-[32px] md:p-[48px] flex justify-center">
        <div className="w-full max-w-[700px] flex flex-col gap-[32px]">
          
          <div className="flex items-center justify-between">
            <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf]">Re: Acme Renewal Proposal</h1>
            <div className="flex gap-[8px]">
              <span className="bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] px-[8px] py-[4px] rounded-[6px] text-[11px] font-['Geist:Medium'] font-medium text-[#cfdbd5]">Acme</span>
              <span className="bg-[#f5cb5c]/10 border border-[#f5cb5c]/20 px-[8px] py-[4px] rounded-[6px] text-[11px] font-['Geist:Medium'] font-medium text-[#f5cb5c]">Priority</span>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-[#f5cb5c]" />
            <div className="flex items-start gap-[12px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5cb5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px]"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
              <div className="flex flex-col gap-[8px]">
                <h3 className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">AI Thread Summary</h3>
                <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#cfdbd5] leading-[1.6]">
                  Sarah is reviewing the new pricing tiers but has concerns about the API rate limits before signing the renewal. They are requesting a quick call to clarify.
                </p>
                <div className="mt-[8px] flex gap-[12px]">
                  <button className="text-[12px] font-['Geist:Medium'] font-medium text-[#f5cb5c] bg-[#f5cb5c]/10 hover:bg-[#f5cb5c]/20 px-[10px] py-[6px] rounded-[6px] transition-colors">
                    Create Task: Follow up on API limits
                  </button>
                  <button className="text-[12px] font-['Geist:Medium'] font-medium text-[#cfdbd5] bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] border border-[var(--color\/border,#40403e)] px-[10px] py-[6px] rounded-[6px] transition-colors">
                    Draft reply offering times
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            {/* Thread item 1 (Older) */}
            <div className="flex flex-col border border-[var(--color\/border,#40403e)] rounded-[12px] overflow-hidden bg-[var(--color\/surface,#333533)] opacity-70">
              <div className="p-[16px] border-b border-[var(--color\/border,#40403e)] bg-[rgba(0,0,0,0.1)] flex items-center justify-between cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition-colors">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
                    Me
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">Me</span>
                    <span className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">to Sarah · 2 days ago</span>
                  </div>
                </div>
                <div className="text-[13px] text-[#9fa8a2]">Sent proposal link...</div>
              </div>
            </div>

            {/* Thread item 2 (Newest) */}
            <div className="flex flex-col border border-[var(--color\/border,#40403e)] rounded-[12px] overflow-hidden bg-[var(--color\/canvas,#242423)] shadow-sm">
              <div className="p-[20px] border-b border-[var(--color\/border,#40403e)] flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] rounded-full bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[16px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
                    S
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-[6px]">
                      <span className="font-['Geist:SemiBold'] font-semibold text-[15px] text-[#e8eddf]">Sarah Chen</span>
                      <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">&lt;sarah@acme.co&gt;</span>
                    </div>
                    <span className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">to me · 10:24 AM (2 hours ago)</span>
                  </div>
                </div>
                <div className="flex gap-[4px]">
                  <button className="p-[8px] text-[#9fa8a2] hover:text-[#e8eddf] hover:bg-[var(--color\/surface,#333533)] rounded-[8px] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                  </button>
                  <button className="p-[8px] text-[#9fa8a2] hover:text-[#e8eddf] hover:bg-[var(--color\/surface,#333533)] rounded-[8px] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </div>
              </div>
              <div className="p-[20px] font-['Geist:Regular'] font-normal text-[14.5px] text-[#cfdbd5] leading-[1.7] whitespace-pre-wrap">
                Hi Brett,
                {"\n\n"}
                Thanks for sending this over. The team reviewed the new pricing tiers and we have a few questions about the API rate limits before we sign.
                {"\n\n"}
                Specifically, our usage has been spiking recently and we want to ensure we won't hit any hard limits on the Pro tier. 
                {"\n\n"}
                Let me know if we can hop on a quick 15-minute call to go over the details. I'm available anytime tomorrow afternoon.
                {"\n\n"}
                Best,
                {"\n"}
                Sarah
              </div>
            </div>

            {/* Inline Reply Box */}
            <div className="mt-[16px] border border-[var(--color\/border,#40403e)] rounded-[12px] overflow-hidden bg-[var(--color\/surface,#333533)]">
              <textarea 
                placeholder="Write your reply to Sarah..."
                className="w-full bg-transparent border-none outline-none p-[20px] text-[14.5px] text-[#e8eddf] min-h-[120px] resize-none"
              />
              <div className="p-[12px] border-t border-[var(--color\/border,#40403e)] flex justify-between items-center bg-[rgba(0,0,0,0.1)]">
                <div className="flex gap-[8px]">
                  <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[6px] rounded-[6px] hover:bg-[var(--color\/canvas,#242423)]" title="AI Draft">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
                  </button>
                  <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[6px] rounded-[6px] hover:bg-[var(--color\/canvas,#242423)]" title="Attach">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  </button>
                </div>
                <button className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[14px] px-[20px] py-[8px] rounded-[8px]">
                  Send
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
