"use client";
import { useState, useEffect } from 'react';
import { databases } from '@/lib/appwrite';

export default function AgentsPage() {
  const [agents, setAgents] = useState([
    {
      $id: '1',
      name: 'Inbox Triage Pro',
      instructions: 'Reads Slack + Gmail, drafts replies, logs to Notion.',
      status: 'Running'
    },
    {
      $id: '2',
      name: 'Sales Meeting Researcher',
      instructions: 'Scrapes LinkedIn and company website for upcoming meeting participants.',
      status: 'Scheduled'
    },
    {
      $id: '3',
      name: 'Weekly Report Generator',
      instructions: 'Gathers metrics from Stripe, Linear, and Zendesk to draft the Monday update.',
      status: 'Draft'
    },
    {
      $id: '4',
      name: 'CRM Auto-updater',
      instructions: 'Syncs new contacts from Gmail signatures into the Contacts database.',
      status: 'Paused'
    }
  ]);
  const [activeTab, setActiveTab] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const filteredAgents = agents.filter(a => activeTab === 'All' || a.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'text-[#4ade80] bg-[rgba(74,222,128,0.1)]';
      case 'Scheduled': return 'text-[#e8eddf] bg-[rgba(255,255,255,0.1)]';
      case 'Draft': return 'text-[#f5cb5c] bg-[rgba(245,213,92,0.1)]';
      case 'Paused': return 'text-[#9fa8a2] bg-[rgba(255,255,255,0.05)]';
      default: return 'text-[#cfdbd5] bg-[rgba(255,255,255,0.05)]';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Running': return 'bg-[#4ade80]';
      case 'Scheduled': return 'bg-[#e8eddf]';
      case 'Draft': return 'bg-[#f5cb5c]';
      case 'Paused': return 'bg-[#9fa8a2]';
      default: return 'bg-[#9fa8a2]';
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      {/* Top Bar */}
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Agents
          </p>
        </div>
        <div className="flex-1" />
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          New agent
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col items-center overflow-y-auto px-[48px] py-[40px]">
          <div className="w-full max-w-[1000px] flex flex-col gap-[24px]">
            
            <div className="flex flex-col gap-[8px]">
              <h1 className="font-['Geist:SemiBold'] font-semibold text-[28px] text-[#e8eddf] tracking-[-0.02em]">Agents</h1>
              <p className="font-['Geist:Regular'] font-normal text-[15px] text-[#9fa8a2] max-w-[600px]">
                Create your own agents, that run on their own individual instructions. This is best for when you need to run repetitive actions.
              </p>
            </div>

            <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[10px] p-[4px] inline-flex self-start">
              {['All', 'Running', 'Scheduled', 'Draft', 'Paused'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-['Geist:Medium'] font-medium transition-colors ${activeTab === tab ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#cfdbd5] hover:text-[#e8eddf]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col border border-[var(--color\/border,#40403e)] rounded-[16px] overflow-hidden bg-[var(--color\/surface,#333533)]">
              {filteredAgents.map(agent => (
                <div 
                  key={agent.$id} 
                  onClick={() => setSelectedAgent(agent)}
                  className="flex items-center gap-[16px] p-[20px] border-b border-[var(--color\/border,#40403e)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                >
                  <div className="w-[48px] h-[48px] bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[12px] flex items-center justify-center text-[#e8eddf]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Geist:SemiBold'] font-semibold text-[15px] text-[#e8eddf] mb-[2px]">{agent.name}</h3>
                    <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2] truncate">{agent.instructions}</p>
                  </div>

                  <div className="flex flex-col items-end gap-[8px]">
                    <span className={`px-[10px] py-[4px] rounded-[100px] text-[11px] font-['Geist:Medium'] font-medium flex items-center gap-[6px] ${getStatusColor(agent.status)}`}>
                      <div className={`w-[6px] h-[6px] rounded-full ${getStatusDot(agent.status)}`} />
                      {agent.status}
                    </span>
                    <span className="text-[12px] text-[#9fa8a2] font-['Geist:Regular'] font-normal">Last run 2h ago</span>
                  </div>
                </div>
              ))}
              {filteredAgents.length === 0 && (
                <div className="p-[40px] text-center text-[#9fa8a2] text-[14px]">No agents found.</div>
              )}
            </div>

          </div>
        </div>

        {/* Detail Panel */}
        {selectedAgent && (
          <div className="w-[360px] border-l border-[var(--color\/border,#40403e)] bg-[var(--color\/surface,#333533)] flex flex-col z-20 shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.3)] absolute top-0 right-0 h-full transition-transform">
            <div className="p-[20px] border-b border-[var(--color\/border,#40403e)] flex items-center justify-between">
              <span className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Agent Details</span>
              <button onClick={() => setSelectedAgent(null)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-[24px] flex-1 overflow-y-auto">
              <div className="flex flex-col items-center text-center mb-[24px]">
                <div className="w-[64px] h-[64px] bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[16px] flex items-center justify-center text-[#f5cb5c] mb-[16px]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                </div>
                <h2 className="font-['Geist:SemiBold'] font-semibold text-[18px] text-[#e8eddf] mb-[8px]">{selectedAgent.name}</h2>
                <span className={`px-[10px] py-[4px] rounded-[100px] text-[11px] font-['Geist:Medium'] font-medium flex items-center gap-[6px] ${getStatusColor(selectedAgent.status)}`}>
                  <div className={`w-[6px] h-[6px] rounded-full ${getStatusDot(selectedAgent.status)}`} />
                  {selectedAgent.status}
                </span>
              </div>

              <div className="flex gap-[8px] mb-[32px]">
                <button className="flex-1 bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[#e8eddf] border border-[var(--color\/border,#40403e)] font-['Geist:Medium'] font-medium text-[13px] py-[8px] rounded-[8px] flex justify-center items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
                  Edit
                </button>
                <button className="flex-1 bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[#e8eddf] border border-[var(--color\/border,#40403e)] font-['Geist:Medium'] font-medium text-[13px] py-[8px] rounded-[8px] flex justify-center items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  {selectedAgent.status === 'Running' ? 'Pause' : 'Run now'}
                </button>
              </div>

              <div className="space-y-[24px]">
                <section>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[12px]">Instructions</h3>
                  <p className="text-[14px] text-[#cfdbd5] bg-[rgba(255,255,255,0.03)] border border-[var(--color\/border,#40403e)] p-[12px] rounded-[8px] leading-[1.6]">
                    {selectedAgent.instructions}
                  </p>
                </section>

                <section>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[12px]">Recent Runs</h3>
                  <div className="space-y-[12px]">
                    {[
                      { status: 'Success', time: '2 hours ago', duration: '12s' },
                      { status: 'Success', time: 'Yesterday', duration: '14s' },
                      { status: 'Failed', time: '2 days ago', duration: '3s' },
                    ].map((run, i) => (
                      <div key={i} className="flex justify-between items-center text-[13px] py-[8px] border-b border-[var(--color\/border,#40403e)] last:border-0">
                        <div className="flex items-center gap-[8px]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={run.status === 'Success' ? '#10b981' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {run.status === 'Success' ? <path d="M20 6 9 17l-5-5"/> : <path d="M18 6 6 18M6 6l12 12"/>}
                          </svg>
                          <span className="text-[#cfdbd5]">{run.time}</span>
                        </div>
                        <span className="text-[#9fa8a2]">{run.duration}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            
            <div className="p-[16px] border-t border-[var(--color\/border,#40403e)] flex justify-center">
              <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors px-[16px] py-[8px] rounded-[6px] w-full">
                Delete Agent
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[16px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] w-full max-w-[500px] overflow-hidden flex flex-col">
            <div className="px-[24px] py-[16px] border-b border-[var(--color\/border,#40403e)] flex justify-between items-center">
              <h2 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf]">Create new agent</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-[24px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Agent Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Weekly Report Generator" 
                  className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] placeholder:text-[#9fa8a2] outline-none focus:border-[#cfdbd5] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Instructions</label>
                <textarea 
                  rows={4}
                  placeholder="What should this agent do? Be specific about the tools it should use." 
                  className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] placeholder:text-[#9fa8a2] outline-none focus:border-[#cfdbd5] transition-colors resize-none"
                />
              </div>
              
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Schedule (Optional)</label>
                <select className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] outline-none focus:border-[#cfdbd5] transition-colors appearance-none">
                  <option>Manual only</option>
                  <option>Every hour</option>
                  <option>Every day at 9:00 AM</option>
                  <option>Every Monday at 9:00 AM</option>
                </select>
              </div>
            </div>

            <div className="px-[24px] py-[16px] bg-[rgba(0,0,0,0.2)] border-t border-[var(--color\/border,#40403e)] flex justify-end gap-[10px]">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-[16px] py-[8px] rounded-[8px] font-['Geist:Medium'] font-medium text-[13.5px] text-[#cfdbd5] hover:text-[#e8eddf] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13.5px] px-[16px] py-[8px] rounded-[8px]"
              >
                Create agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
