"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  
  const emails = [
    {
      id: 1,
      sender: "Sarah Chen",
      email: "sarah@acme.co",
      subject: "Re: Acme Renewal Proposal",
      preview: "Thanks for sending this over. The team reviewed the new pricing tiers and we have a few questions about the API rate limits before we sign.",
      time: "10:24 AM",
      unread: true,
      labels: ["Acme", "Priority"]
    },
    {
      id: 2,
      sender: "Marcus Rodriguez",
      email: "marcus@techflow.io",
      subject: "Q3 Roadmap alignment",
      preview: "Looking forward to our call tomorrow. I've attached the rough draft of what we're planning to build. Let me know if anything stands out.",
      time: "Yesterday",
      unread: true,
      labels: ["TechFlow"]
    },
    {
      id: 3,
      sender: "Stripe",
      email: "receipts@stripe.com",
      subject: "Payment successful",
      preview: "Your payment of $49.00 for the Pro plan was successful. You can download your invoice from the dashboard.",
      time: "Yesterday",
      unread: false,
      labels: []
    },
    {
      id: 4,
      sender: "GitHub",
      email: "notifications@github.com",
      subject: "[bereft] Dependabot alert: 2 high severity vulnerabilities",
      preview: "We found 2 vulnerabilities in dependencies in your repository. Please review the security tab for more details.",
      time: "Oct 12",
      unread: false,
      labels: []
    },
    {
      id: 5,
      sender: "James Kim",
      email: "james@startupx.com",
      subject: "Intro: James <> Alex",
      preview: "Alex, meet James. James is building a really cool AI startup and I thought you two should connect given your recent post about agentic workflows.",
      time: "Oct 10",
      unread: false,
      labels: ["Intro"]
    }
  ];

  const filteredEmails = emails.filter(email => {
    if (activeTab === 'Unread') return email.unread;
    return true; // Inbox shows all
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      {/* Top Bar */}
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center justify-between overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Email
          </p>
        </div>
        
        <div className="flex bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] p-[2px]">
          {['Inbox', 'Unread', 'Drafts', 'Sent'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[12px] py-[4px] rounded-[6px] text-[13px] font-['Geist:Medium'] font-medium transition-colors ${activeTab === tab ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#9fa8a2] hover:text-[#e8eddf]"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowCompose(true)}
          className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
          Compose
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Email List */}
        <div className={`flex flex-col border-r border-[var(--color\/border,#40403e)] overflow-y-auto ${selectedEmail ? 'w-[360px] shrink-0 hidden md:flex' : 'w-full'}`}>
          <div className="p-[16px] border-b border-[var(--color\/border,#40403e)] bg-[var(--color\/surface,#333533)] sticky top-0 z-10 flex gap-[8px]">
            <input 
              type="text" 
              placeholder="Search emails..." 
              className="flex-1 bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[8px] text-[13px] text-[#e8eddf] outline-none focus:border-[#cfdbd5] transition-colors"
            />
            <button className="bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[10px] text-[#9fa8a2] hover:text-[#e8eddf] transition-colors flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </button>
          </div>
          
          <div className="flex flex-col">
            {filteredEmails.map(email => (
              <div 
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`flex flex-col p-[16px] border-b border-[var(--color\/border,#40403e)] cursor-pointer transition-colors ${selectedEmail?.id === email.id ? 'bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(255,255,255,0.02)]'}`}
              >
                <div className="flex items-center justify-between mb-[4px]">
                  <span className={`font-['Geist:SemiBold'] font-semibold text-[14px] ${email.unread ? 'text-[#e8eddf]' : 'text-[#cfdbd5]'}`}>
                    {email.sender}
                  </span>
                  <span className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">{email.time}</span>
                </div>
                <div className="flex items-center gap-[6px] mb-[6px]">
                  {email.unread && <div className="w-[8px] h-[8px] rounded-full bg-[#f5cb5c] shrink-0" />}
                  <span className={`font-['Geist:Medium'] font-medium text-[13px] truncate ${email.unread ? 'text-[#e8eddf]' : 'text-[#cfdbd5]'}`}>
                    {email.subject}
                  </span>
                </div>
                <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2] line-clamp-2 leading-[1.4]">
                  {email.preview}
                </p>
                {email.labels.length > 0 && (
                  <div className="flex gap-[6px] mt-[10px]">
                    {email.labels.map(label => (
                      <span key={label} className="bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] px-[6px] py-[2px] rounded-[4px] text-[11px] font-['Geist:Medium'] font-medium text-[#cfdbd5]">
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Email Detail Panel */}
        {selectedEmail ? (
          <div className="flex-1 flex flex-col bg-[var(--color\/canvas,#242423)] relative">
            <div className="flex items-center justify-between p-[16px] border-b border-[var(--color\/border,#40403e)] shrink-0">
              <div className="flex items-center gap-[12px]">
                <button onClick={() => setSelectedEmail(null)} className="md:hidden text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[4px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="flex items-center gap-[4px]">
                  <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[6px] rounded-[6px] hover:bg-[var(--color\/surface-2,#3d3f3b)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </button>
                  <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[6px] rounded-[6px] hover:bg-[var(--color\/surface-2,#3d3f3b)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                  </button>
                  <button className="text-[#9fa8a2] hover:text-[#ef4444] transition-colors p-[6px] rounded-[6px] hover:bg-[rgba(239,68,68,0.1)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <Link href="/email/thread" className="text-[12px] font-['Geist:Medium'] font-medium text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                  Open full thread ↗
                </Link>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-[32px]">
              <div className="max-w-[700px] mx-auto">
                <h1 className="font-['Geist:SemiBold'] font-semibold text-[22px] text-[#e8eddf] mb-[24px]">
                  {selectedEmail.subject}
                </h1>
                
                <div className="flex items-center justify-between mb-[32px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[var(--color\/surface-2,#3d3f3b)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[16px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
                      {selectedEmail.sender[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-[6px]">
                        <span className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">{selectedEmail.sender}</span>
                        <span className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2]">&lt;{selectedEmail.email}&gt;</span>
                      </div>
                      <div className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">to me · {selectedEmail.time}</div>
                    </div>
                  </div>
                  <button className="bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors border border-[var(--color\/border,#40403e)] rounded-[6px] px-[10px] py-[4px] text-[12px] font-['Geist:Medium'] font-medium text-[#e8eddf] flex items-center gap-[4px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                    Reply
                  </button>
                </div>

                <div className="font-['Geist:Regular'] font-normal text-[14px] text-[#cfdbd5] leading-[1.6] whitespace-pre-wrap">
                  {selectedEmail.preview}
                  {"\n\n"}
                  Let me know if we can hop on a quick 15-minute call to go over the details. I'm available anytime tomorrow afternoon.
                  {"\n\n"}
                  Best,
                  {"\n"}
                  {selectedEmail.sender.split(' ')[0]}
                </div>
                
                {/* Inline Reply Box */}
                <div className="mt-[40px] border border-[var(--color\/border,#40403e)] rounded-[12px] overflow-hidden bg-[var(--color\/surface,#333533)]">
                  <div className="p-[12px] border-b border-[var(--color\/border,#40403e)] bg-[rgba(0,0,0,0.1)] flex items-center gap-[8px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                    <span className="font-['Geist:Medium'] font-medium text-[13px] text-[#9fa8a2]">Reply to {selectedEmail.sender}</span>
                  </div>
                  <textarea 
                    placeholder="Write your reply..."
                    className="w-full bg-transparent border-none outline-none p-[16px] text-[14px] text-[#e8eddf] min-h-[100px] resize-none"
                  />
                  <div className="p-[12px] border-t border-[var(--color\/border,#40403e)] flex justify-between items-center bg-[rgba(0,0,0,0.1)]">
                    <div className="flex gap-[8px]">
                      <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[4px]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
                      </button>
                      <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors p-[4px]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                      </button>
                    </div>
                    <button className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[16px] py-[6px] rounded-[6px]">
                      Send
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-[var(--color\/canvas,#242423)] relative">
            <div className="flex flex-col items-center gap-[16px] text-center max-w-[300px]">
              <div className="w-[64px] h-[64px] rounded-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[#cfdbd5]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h2 className="font-['Geist:SemiBold'] font-semibold text-[18px] text-[#e8eddf]">No email selected</h2>
              <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2]">Select an email from the list to view its contents and reply.</p>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal Overlay */}
      {showCompose && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-[20px]">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[16px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] w-full max-w-[600px] h-[500px] flex flex-col overflow-hidden">
            <div className="px-[16px] py-[12px] bg-[var(--color\/surface-2,#3d3f3b)] border-b border-[var(--color\/border,#40403e)] flex justify-between items-center">
              <span className="font-['Geist:SemiBold'] font-semibold text-[14px] text-[#e8eddf]">New Message</span>
              <button onClick={() => setShowCompose(false)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="flex flex-col flex-1 bg-[var(--color\/canvas,#242423)]">
              <div className="px-[16px] py-[10px] border-b border-[var(--color\/border,#40403e)] flex items-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#9fa8a2] w-[40px]">To:</span>
                <input type="text" className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#e8eddf]" />
              </div>
              <div className="px-[16px] py-[10px] border-b border-[var(--color\/border,#40403e)] flex items-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#9fa8a2] w-[40px]">Subj:</span>
                <input type="text" className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#e8eddf]" />
              </div>
              <div className="flex-1 p-[16px]">
                <textarea 
                  className="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#e8eddf] resize-none"
                  placeholder="Type your message..."
                />
              </div>
            </div>

            <div className="px-[16px] py-[12px] bg-[var(--color\/surface-2,#3d3f3b)] border-t border-[var(--color\/border,#40403e)] flex justify-between items-center">
              <div className="flex gap-[12px]">
                <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors" title="AI Draft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
                </button>
                <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors" title="Attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
              </div>
              <div className="flex items-center gap-[12px]">
                <button onClick={() => setShowCompose(false)} className="text-[13px] font-['Geist:Medium'] font-medium text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                  Discard
                </button>
                <button onClick={() => setShowCompose(false)} className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[16px] py-[6px] rounded-[6px]">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
