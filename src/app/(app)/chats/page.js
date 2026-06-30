"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Chats.module.css';

const MOCK_MESSAGES = [
  { id: 1, role: 'user', content: 'Summarize my unread Slack and draft replies' },
  { id: 2, role: 'assistant', content: 'Done — I scanned your unread Slack, pulled context from Gmail and Notion, and drafted replies. Here\'s the rundown before anything sends.', metadata: { apps: 3, time: '12s' }, sections: [
    { title: 'What needs you', items: [
      { prefix: 'Slack', text: '4 threads need a reply. 2 are time-sensitive: the Acme renewal and the on-call handoff.' },
      { prefix: 'Gmail', text: "drafted 3 responses, matched to each thread's tone and prior history." },
      { prefix: 'Notion', text: 'logged the decisions from those threads into the Q3 planning doc.' }
    ]},
    { title: 'Queued and ready', type: 'numbered', items: [
      { prefix: 'Send all 3 drafts', text: '— reviewed for tone, nothing sends until you approve.' },
      { prefix: 'Snooze Acme', text: 'until the signed contract lands in Gmail.' },
      { prefix: 'Create 2 Linear tasks', text: 'from the on-call handoff action items.' }
    ]}
  ]}
];

export default function Chats() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const newUserMsg = { id: Date.now(), role: 'user', content: prompt };
    setMessages([...messages, newUserMsg]);
    setPrompt("");
    setShowSkills(false);
    setIsTyping(true);
    
    // Mock response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I've processed your request. Is there anything else you need help with?",
      }]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === '/') {
      setShowSkills(true);
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      if (prompt.length === 0) setShowSkills(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center justify-between overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <Link href="/home" className="text-[#cfdbd5] hover:text-[#e8eddf] transition-colors flex items-center gap-[4px] text-[13px] font-['Geist:Medium'] font-medium no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Home
          </Link>
          <span className="text-[14px] opacity-50 text-[#9fa8a2]">/</span>
          <span className="text-[14px] font-['Geist:Medium'] font-medium text-[#e8eddf] flex items-center gap-[6px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Summarize unread Slack
          </span>
          <button className="text-[#9fa8a2] hover:text-[#e8eddf] ml-[4px] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
        </div>
        <button className="bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[6px] text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf] flex items-center gap-[6px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-[40px] py-[30px] flex flex-col items-center">
        <div className="w-full max-w-[720px] flex flex-col gap-[24px]">
          {messages.map(msg => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'user' ? (
                <div className="bg-[var(--color\/surface,#333533)] px-[16px] py-[11px] rounded-[16px] max-w-[80%] border border-[var(--color\/border,#40403e)]">
                  <p className="font-['Geist:Medium'] font-medium text-[14.5px] text-[#e8eddf] leading-[24px]">
                    {msg.content}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-[12px] w-full">
                  {msg.metadata && (
                    <div className="bg-[var(--color\/surface-2,#3d3f3b)] inline-flex gap-[6px] items-center px-[10px] py-[6px] rounded-[8px] self-start cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                      <span className="text-[12px]">⚡</span>
                      <p className="font-['Geist:Medium'] font-medium text-[12.5px] text-[#cfdbd5] leading-[16px]">
                        Worked across {msg.metadata.apps} apps · {msg.metadata.time}
                      </p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  )}
                  
                  <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#e8eddf] leading-[25px]">
                    {msg.content}
                  </p>
                  
                  {msg.sections?.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-[10px]">
                      <div className="pt-[4px]">
                        <p className="font-['Geist:SemiBold'] font-semibold text-[16.5px] text-[#e8eddf] leading-[24px]">{section.title}</p>
                      </div>
                      <div className="flex flex-col gap-[8px]">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex gap-[10px] items-start">
                            {section.type === 'numbered' ? (
                              <span className="font-['Geist:SemiBold'] font-semibold text-[15px] text-[#cfdbd5] min-w-[16px]">{i+1}.</span>
                            ) : (
                              <div className="w-[4px] h-[24px] rounded-full bg-[#f5cb5c] shrink-0 mt-[1px]" />
                            )}
                            <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#cfdbd5] leading-[24px]">
                              <span className="font-['Geist:SemiBold'] font-semibold text-[#e8eddf]">{item.prefix} </span>
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-[8px] mt-[4px]">
                    <button className="p-[6px] rounded-[6px] text-[#9fa8a2] hover:bg-[var(--color\/surface,#333533)] hover:text-[#e8eddf] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                    <button className="p-[6px] rounded-[6px] text-[#9fa8a2] hover:bg-[var(--color\/surface,#333533)] hover:text-[#e8eddf] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                    </button>
                    <button className="bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] px-[10px] py-[4px] rounded-[6px] text-[12px] font-['Geist:Medium'] font-medium text-[#cfdbd5] ml-[4px] transition-colors">
                      Apply actions
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col gap-[12px] w-full animate-pulse">
              <div className="bg-[var(--color\/surface-2,#3d3f3b)] inline-flex gap-[6px] items-center px-[10px] py-[6px] rounded-[8px] self-start">
                <svg className="w-[14px] h-[14px] text-[#f5cb5c] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <p className="font-['Geist:Medium'] font-medium text-[12.5px] text-[#cfdbd5] leading-[16px]">Agent is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-[40px] pb-[30px] pt-[10px] flex justify-center bg-[var(--color\/canvas,#242423)]">
        <div className="w-full max-w-[720px] relative">
          
          {showSkills && (
            <div className="absolute bottom-[100%] left-0 w-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] mb-[10px] overflow-hidden flex flex-col z-20">
              <div className="px-[12px] py-[8px] border-b border-[var(--color\/border,#40403e)]">
                <span className="text-[12px] font-['Geist:Medium'] font-medium text-[#9fa8a2] uppercase tracking-wider">Skills</span>
              </div>
              <div className="max-h-[240px] overflow-y-auto p-[4px] flex flex-col">
                {[
                  { icon: '📝', name: 'Draft email', desc: 'Write a response based on context' },
                  { icon: '📅', name: 'Schedule meeting', desc: 'Find time and send invite' },
                  { icon: '📊', name: 'Create report', desc: 'Summarize metrics and activity' },
                  { icon: '🔍', name: 'Search contacts', desc: 'Find people and companies' }
                ].map((skill, i) => (
                  <button key={i} onClick={() => { setPrompt(`/${skill.name.toLowerCase()} `); setShowSkills(false); }} className="flex items-center gap-[12px] p-[10px] rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] text-left transition-colors">
                    <span className="text-[18px]">{skill.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[13.5px] font-['Geist:Medium'] font-medium text-[#e8eddf]">{skill.name}</span>
                      <span className="text-[12px] text-[#9fa8a2]">{skill.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[18px] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.35)] p-[16px] flex flex-col gap-[12px]">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask or do anything… (type '/' for skills)"
              className="bg-transparent border-none outline-none text-[15.5px] text-[#e8eddf] placeholder-[#9fa8a2] w-full font-['Geist:Regular'] font-normal"
            />
            <div className="flex items-center gap-[4px]">
              <button className="h-[30px] flex items-center justify-center rounded-[9px] hover:bg-[rgba(255,255,255,0.06)] transition-colors px-[6px] cursor-pointer text-[#9fa8a2] hover:text-[#e8eddf]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="h-[30px] flex items-center justify-center rounded-[9px] hover:bg-[rgba(255,255,255,0.06)] transition-colors px-[6px] cursor-pointer text-[#9fa8a2] hover:text-[#e8eddf]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
              <div className="flex-1" />
              <span className="text-[13px] text-[#cfdbd5] font-['Geist:Medium'] font-medium px-[10px] py-[4px] rounded-[8px] bg-[rgba(255,255,255,0.04)] cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                Agent · Pro
              </span>
              <button onClick={handleSubmit} disabled={!prompt.trim()} className={`h-[30px] w-[30px] flex items-center justify-center rounded-[9px] transition-colors ${prompt.trim() ? 'bg-[#f5cb5c] hover:bg-[#e3c456] text-[#242423]' : 'bg-[rgba(255,255,255,0.1)] text-[#9fa8a2]'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
