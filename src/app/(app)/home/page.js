"use client";
import { useState } from 'react';
import Link from 'next/link';

const stats = [
  { label: 'Unread Emails', value: '12', icon: '📧', change: '+3 today', color: '#6366f1' },
  { label: "Today's Meetings", value: '4', icon: '📅', change: 'Next in 45m', color: '#10b981' },
  { label: 'Open Tasks', value: '8', icon: '✅', change: '2 urgent', color: '#f59e0b' },
  { label: 'Active Deals', value: '6', icon: '💰', change: '$240K pipeline', color: '#ec4899' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Standup', time: '9:00 AM', duration: '30m', attendees: 5, type: 'internal' },
  { id: 2, title: 'Acme Renewal Review', time: '11:00 AM', duration: '1h', attendees: 3, type: 'external' },
  { id: 3, title: '1:1 with Sarah Chen', time: '2:00 PM', duration: '30m', attendees: 2, type: 'internal' },
];

const recentActivity = [
  { id: 1, type: 'email_sent', text: 'Sent follow-up to Marcus Rodriguez', time: '15 min ago', icon: '📤' },
  { id: 2, type: 'task_done', text: 'Completed "Onboard CloudBase team"', time: '1 hour ago', icon: '✅' },
  { id: 3, type: 'email_received', text: 'New email from Sarah Chen — Acme renewal', time: '2 hours ago', icon: '📥' },
  { id: 4, type: 'meeting', text: 'Meeting notes added for Design Review', time: '3 hours ago', icon: '📝' },
  { id: 5, type: 'contact', text: 'Added Lisa Park from CloudBase', time: '5 hours ago', icon: '👤' },
];

export default function HomePage() {
  const [aiInput, setAiInput] = useState('');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[var(--color\/canvas,#242423)] border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[20px] pr-[18px] py-[12px] relative shrink-0 w-full">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13.5px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
          Home
        </p>
        <div className="flex-[1_0_0] h-[10px] min-w-px relative" />
        <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap">
          {dateStr}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[900px] mx-auto px-[40px] py-[30px] flex flex-col gap-[28px]">

          {/* Greeting */}
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf] tracking-[-0.24px]">
              Good morning, Brett
            </h1>
            <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#9fa8a2]">
              Here's what's happening today.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-[12px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[16px] flex flex-col gap-[8px] hover:border-[#4d4f4b] transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-[20px]">{stat.icon}</span>
                  <span className="text-[11px] text-[#9fa8a2] font-['Geist:Medium'] font-medium bg-[rgba(255,255,255,0.06)] px-[6px] py-[2px] rounded-[4px]">{stat.change}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="font-['Geist:Bold'] font-bold text-[28px] text-[#e8eddf] tracking-[-0.5px]">{stat.value}</p>
                  <p className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column: Upcoming Events + Recent Activity */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Upcoming Events */}
            <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex flex-col gap-[16px]">
              <div className="flex items-center justify-between">
                <h3 className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">Upcoming today</h3>
                <Link href="/calendar" className="text-[12px] text-[#f5cb5c] font-['Geist:Medium'] font-medium hover:underline no-underline">View all →</Link>
              </div>
              <div className="flex flex-col gap-[8px]">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-[12px] p-[10px] rounded-[8px] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer">
                    <div className={`w-[3px] h-[36px] rounded-full ${event.type === 'external' ? 'bg-[#10b981]' : 'bg-[#6366f1]'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-['Geist:Medium'] font-medium text-[13.5px] text-[#e8eddf] truncate">{event.title}</p>
                      <p className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">{event.time} · {event.duration} · {event.attendees} people</p>
                    </div>
                    <div className="flex -space-x-1">
                      {Array.from({length: Math.min(event.attendees, 3)}).map((_, i) => (
                        <div key={i} className="w-[22px] h-[22px] rounded-full bg-[#3d3f3b] border-2 border-[#333533] flex items-center justify-center text-[9px] text-[#cfdbd5]">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex flex-col gap-[16px]">
              <h3 className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">Recent activity</h3>
              <div className="flex flex-col gap-[4px]">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-[10px] p-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer">
                    <span className="text-[16px] shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#cfdbd5] truncate">{item.text}</p>
                    </div>
                    <p className="font-['Geist:Regular'] font-normal text-[11px] text-[#9fa8a2] whitespace-nowrap shrink-0">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat Section */}
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">AI Assistant</h3>

            {/* Conversation */}
            <div className="flex flex-col gap-[20px]">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-[var(--color\/surface,#333533)] px-[16px] py-[11px] rounded-[16px] max-w-[80%]">
                  <p className="font-['Geist:Medium'] font-medium text-[14.5px] text-[#e8eddf] leading-[24px]">
                    Summarize my unread Slack and draft replies
                  </p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex flex-col gap-[12px]">
                <div className="bg-[var(--color\/surface-2,#3d3f3b)] inline-flex gap-[6px] items-center px-[10px] py-[6px] rounded-[8px] self-start">
                  <span className="text-[12px]">⚡</span>
                  <p className="font-['Geist:Medium'] font-medium text-[12.5px] text-[#cfdbd5] leading-[16px]">
                    Worked across 3 apps · 12s
                  </p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#e8eddf] leading-[25px]">
                  Done — I scanned your unread Slack, pulled context from Gmail and Notion, and drafted replies. Here's the rundown before anything sends.
                </p>
                <div className="pt-[4px]">
                  <p className="font-['Geist:SemiBold'] font-semibold text-[16.5px] text-[#e8eddf] leading-[24px]">What needs you</p>
                </div>
                {[
                  { label: 'Slack', text: '4 threads need a reply. 2 are time-sensitive: the Acme renewal and the on-call handoff.' },
                  { label: 'Gmail', text: "drafted 3 responses, matched to each thread's tone and prior history." },
                  { label: 'Notion', text: 'logged the decisions from those threads into the Q3 planning doc.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-[10px] items-start">
                    <div className="w-[4px] h-[24px] rounded-full bg-[#f5cb5c] shrink-0 mt-[1px]" />
                    <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#cfdbd5] leading-[24px]">
                      <span className="font-['Geist:SemiBold'] font-semibold text-[#e8eddf]">{item.label} — </span>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[18px] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.35)] p-[16px] flex flex-col gap-[12px]">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask or do anything…"
              className="bg-transparent border-none outline-none text-[15.5px] text-[#e8eddf] placeholder-[#9fa8a2] w-full font-['Geist:Regular'] font-normal"
            />
            <div className="flex items-center gap-[4px]">
              <button className="h-[30px] flex items-center justify-center rounded-[9px] hover:bg-[rgba(255,255,255,0.06)] transition-colors px-[6px] cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="h-[30px] flex items-center justify-center rounded-[9px] hover:bg-[rgba(255,255,255,0.06)] transition-colors px-[6px] cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
              <div className="flex-1" />
              <span className="text-[13px] text-[#cfdbd5] font-['Geist:Medium'] font-medium px-[10px] py-[4px] rounded-[8px] bg-[rgba(255,255,255,0.04)]">
                Agent · Pro
              </span>
              <button className="h-[30px] w-[30px] flex items-center justify-center rounded-[9px] bg-[#f5cb5c] hover:bg-[#e3c456] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#242423" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
