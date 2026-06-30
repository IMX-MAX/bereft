"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const imgFrame16 = "http://localhost:3845/assets/40f45f62f634c781c14e4281e79938fbe416acfb.svg";
const imgFrame17 = "http://localhost:3845/assets/bb792fcbf394a7210976543bdf8e02ae09761ba6.svg";
const imgFrame18 = "http://localhost:3845/assets/cbe77ca6f6bd494131df9b3ed63664edf4016c14.svg";
const imgFrame19 = "http://localhost:3845/assets/050fc3255920664ef35ef7dd5f3d0cf23bcf7f05.svg";
const imgFrame20 = "http://localhost:3845/assets/e505d3038cdc90f87103ab3426cc9fc4bfc43f69.svg";

// Harcoded Composio tools based on user's auth configs
const composioApps = [
  { name: 'Stripe', id: 'stripe-992z8f', icon: '💸', status: 'Enabled', type: 'OAuth2', updated: '1s ago' },
  { name: 'Outlook', id: 'outlook-dz4mio', icon: '📧', status: 'Enabled', type: 'OAuth2', updated: '20s ago' },
  { name: 'Google Drive', id: 'googledrive-4okk4q', icon: '📁', status: 'Enabled', type: 'OAuth2', updated: '31s ago' },
  { name: 'Google Calendar', id: 'googlecalendar-hzfgcu', icon: '📅', status: 'Enabled', type: 'OAuth2', updated: '39s ago' },
  { name: 'Gmail', id: 'gmail-ade142', icon: '✉️', status: 'Enabled', type: 'OAuth2', updated: '7d ago' },
  { name: 'Notion', id: 'notion-fni4t8', icon: '📝', status: 'Enabled', type: 'OAuth2', updated: '57s ago' }
];

export default function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from Composio using the API key
    // For now, we display the integrated tools that are provided.
    setConnections(composioApps);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      <div className="bg-[var(--color\/canvas,#242423)] border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[20px] pr-[18px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Connections
          </p>
        </div>
        <div className="flex-[1_0_0] h-[8px] min-w-px relative" />
        <Link href="/connections/add" className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors content-stretch flex gap-[7px] items-center overflow-clip pl-[12px] pr-[14px] py-[8px] relative rounded-[9px] shrink-0 cursor-pointer no-underline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <p className="[word-break:break-word] font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[13.5px] text-[color:var(--color\/on-accent,#242423)] whitespace-nowrap">
            Add MCP
          </p>
        </Link>
      </div>

      <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px overflow-y-auto overflow-x-hidden pb-[40px] pt-[34px] px-[48px] relative w-full">
        <div className="content-stretch flex flex-col gap-[26px] items-start overflow-clip relative shrink-0 w-[1000px] max-w-full">
          
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[7px] items-start overflow-clip relative shrink-0 w-full">
            <p className="font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color\/text-primary,#e8eddf)] tracking-[-0.42px] whitespace-nowrap">
              Connections
            </p>
            <p className="font-['Geist:Regular'] font-normal leading-[23px] min-w-full relative shrink-0 text-[15px] text-[color:var(--color\/text-secondary,#cfdbd5)] w-[min-content]">
              Plug in your apps. We natively support a set of core integrations via Composio. Everything else is an MCP you can bring yourself.
            </p>
          </div>

          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full">
            <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip px-[12px] py-[10px] relative rounded-[10px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" placeholder="Search apps and MCP servers" className="bg-transparent border-none outline-none text-[13.5px] text-[color:var(--color\/text-primary,#e8eddf)] flex-1 w-full" />
            </div>
          </div>

          <div className="content-stretch flex flex-col gap-[14px] items-start overflow-clip relative shrink-0 w-full mt-[10px]">
            <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
                Native Integrations
              </p>
              <div className="bg-[var(--color\/surface-2,#3d3f3b)] content-stretch flex items-start overflow-clip px-[8px] py-[2px] relative rounded-[999px] shrink-0">
                <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap">
                  {connections.length}
                </p>
              </div>
            </div>

            <div className="content-start flex flex-wrap gap-[16px] items-start overflow-clip relative shrink-0 w-full">
              {loading ? (
                <div className="text-[color:var(--color\/text-secondary,#cfdbd5)]">Loading connections...</div>
              ) : (
                connections.map((app, index) => (
                  <div key={index} className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip pb-[14px] pt-[16px] px-[16px] relative rounded-[16px] shrink-0 w-[322px] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full">
                      <div className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[42px] text-[20px]">
                        {app.icon}
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[15.5px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
                          {app.name}
                        </p>
                        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap truncate w-full">
                          {app.id}
                        </p>
                      </div>
                      <div className="bg-[rgba(59,201,114,0.1)] border border-[rgba(59,201,114,0.2)] border-solid content-stretch flex gap-[5px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                        <div className="bg-[#3bc972] relative rounded-[999px] shrink-0 size-[6px]" />
                        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[12px] text-[#3bc972] whitespace-nowrap">
                          {app.status}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[var(--color\/border,#40403e)] h-px relative shrink-0 w-full" />
                    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                      <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] text-[13px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap">
                        {app.type} · {app.updated}
                      </p>
                      <button className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[#e8eddf] whitespace-nowrap cursor-pointer hover:underline bg-transparent border-none p-0">
                        Manage
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-[32px] w-full p-[24px] rounded-[16px] border border-[var(--color\/border,#40403e)] border-dashed bg-[rgba(255,255,255,0.01)] flex flex-col items-center justify-center text-center gap-[12px]">
              <div className="w-[48px] h-[48px] rounded-full bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[#e8eddf]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
              </div>
              <h3 className="font-['Geist:Medium'] font-medium text-[16px] text-[#e8eddf] mt-[4px]">Bring your own tools</h3>
              <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2] max-w-[400px]">
                Have internal tools or custom databases? Add them as MCP servers to allow your agents to securely interact with them.
              </p>
              <Link href="/connections/add" className="mt-[8px] bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors border border-[var(--color\/border,#40403e)] rounded-[8px] px-[16px] py-[8px] text-[13.5px] font-['Geist:Medium'] font-medium text-[#e8eddf] no-underline inline-block">
                Add MCP server
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
