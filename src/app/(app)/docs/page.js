"use client";
import { useState } from "react";
import styles from "./Docs.module.css";

const MOCK_DOCS = [
  { id: 1, title: "Q3 Strategy Planning", type: "note", typeLabel: "Note", icon: "📝", preview: "Key priorities for Q3 include expanding the enterprise segment, launching the API...", modified: "2 hours ago", author: "JB", authorColor: "#f5cb5c" },
  { id: 2, title: "Acme Renewal Call Notes", type: "meeting_doc", typeLabel: "Meeting Doc", icon: "📋", preview: "Discussed renewal terms, pricing adjustments, and new feature requests...", modified: "1 day ago", author: "SC", authorColor: "#10b981" },
  { id: 3, title: "Email Templates", type: "snippet", typeLabel: "Snippet", icon: "✂️", preview: "Standard follow-up template: Hi {name}, Thanks for taking the time...", modified: "3 days ago", author: "Me", authorColor: "#3d3f3b" },
  { id: 4, title: "Investor Meeting — Ventures Capital", type: "meeting_doc", typeLabel: "Meeting Doc", icon: "📋", preview: "Pitch deck walkthrough, questions on unit economics, follow-up items...", modified: "1 week ago", author: "DT", authorColor: "#f59e0b" },
  { id: 5, title: "Product Roadmap Notes", type: "note", typeLabel: "Note", icon: "📝", preview: "V2 features: AI autofill, deep search, meeting bot improvements...", modified: "4 days ago", author: "PP", authorColor: "#0ea5e9" },
  { id: 6, title: "Onboarding Checklist", type: "snippet", typeLabel: "Snippet", icon: "✂️", preview: "Welcome sequence: Day 1 — account setup, Day 2 — connect integrations...", modified: "2 weeks ago", author: "Me", authorColor: "#3d3f3b" },
  { id: 7, title: "Sarah Chen Dossier", type: "dossier", typeLabel: "Dossier", icon: "📊", preview: "CEO at Acme Corp. Previously VP Product at TechGiant. Stanford MBA...", modified: "5 days ago", author: "SC", authorColor: "#10b981" },
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredDocs = MOCK_DOCS.filter(doc => 
    (activeTab === "all" || doc.type === activeTab) &&
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedDoc) {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)]">
        {/* Detail Top Bar */}
        <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
          <button onClick={() => setSelectedDoc(null)} className="text-[#cfdbd5] hover:text-[#e8eddf] transition-colors mr-[8px] flex items-center gap-[4px] text-[13px] font-['Geist:Medium'] font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
          <span className="text-[14px] opacity-50 text-[#9fa8a2]">/</span>
          <span className="text-[16px] mr-[8px]">{selectedDoc.icon}</span>
          <input 
            type="text" 
            defaultValue={selectedDoc.title}
            className="bg-transparent border-none outline-none font-['Geist:Medium'] font-medium text-[15px] text-[#e8eddf] w-[300px]"
          />
          <div className="flex-1" />
          <span className="bg-[rgba(255,255,255,0.06)] px-[8px] py-[4px] rounded-[6px] text-[12px] font-['Geist:Medium'] font-medium text-[#cfdbd5] mr-[12px]">
            {selectedDoc.typeLabel}
          </span>
          <button className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex flex-1 overflow-hidden relative">
          <div className="flex-1 flex flex-col items-center overflow-y-auto pb-[100px]">
            
            {/* Toolbar */}
            <div className="sticky top-[16px] bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] shadow-sm flex items-center gap-[4px] p-[4px] mb-[40px] z-20">
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5] font-['Geist:Bold'] font-bold text-[14px]">B</button>
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5] italic font-serif text-[14px]">I</button>
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5] underline text-[14px]">U</button>
              <div className="w-[1px] h-[16px] bg-[#40403e] mx-[4px]" />
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5] font-['Geist:Medium'] font-medium text-[13px]">H1</button>
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5] font-['Geist:Medium'] font-medium text-[13px]">H2</button>
              <div className="w-[1px] h-[16px] bg-[#40403e] mx-[4px]" />
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button className="w-[28px] h-[28px] rounded-[4px] hover:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#cfdbd5]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>

            {/* Content Mockup */}
            <div className="w-full max-w-[700px] px-[20px]">
              <h1 className="text-[32px] font-['Geist:SemiBold'] font-semibold text-[#e8eddf] mb-[24px] outline-none" contentEditable suppressContentEditableWarning>{selectedDoc.title}</h1>
              
              <div className="space-y-[16px] text-[16px] text-[#cfdbd5] font-['Geist:Regular'] font-normal leading-[1.6] outline-none" contentEditable suppressContentEditableWarning>
                <p>This is a mockup of the document editor. You can click here and start typing.</p>
                <p>{selectedDoc.preview}</p>
                <p>In a real implementation, this would use a rich text editor like Tiptap or ProseMirror with collaborative editing support via CRDTs.</p>
                
                {selectedDoc.type === 'meeting_doc' && (
                  <>
                    <h3 className="text-[20px] font-['Geist:Medium'] font-medium text-[#e8eddf] mt-[32px] mb-[12px]">Action Items</h3>
                    <ul className="list-none space-y-[8px] pl-[4px]">
                      <li className="flex items-center gap-[10px]"><input type="checkbox" className="w-[16px] h-[16px] rounded-[4px] accent-[#f5cb5c]" /> Follow up with the design team</li>
                      <li className="flex items-center gap-[10px]"><input type="checkbox" className="w-[16px] h-[16px] rounded-[4px] accent-[#f5cb5c]" /> Update the Q3 roadmap</li>
                      <li className="flex items-center gap-[10px]"><input type="checkbox" className="w-[16px] h-[16px] rounded-[4px] accent-[#f5cb5c]" defaultChecked /> Send meeting notes</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Metadata) */}
          <div className="w-[280px] border-l border-[var(--color\/border,#40403e)] bg-[var(--color\/canvas,#242423)] flex flex-col py-[24px] px-[20px]">
            <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[20px]">Properties</h3>
            
            <div className="space-y-[16px] text-[13px]">
              <div className="flex flex-col gap-[6px]">
                <span className="text-[#9fa8a2]">Created By</span>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[9px] font-['Geist:Medium'] font-medium text-[#242423]" style={{backgroundColor: selectedDoc.authorColor}}>{selectedDoc.author}</div>
                  <span className="text-[#e8eddf]">John Doe</span>
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <span className="text-[#9fa8a2]">Last Modified</span>
                <span className="text-[#e8eddf]">{selectedDoc.modified}</span>
              </div>

              <div className="flex flex-col gap-[6px]">
                <span className="text-[#9fa8a2]">Linked People</span>
                <div className="flex items-center gap-[8px]">
                  {selectedDoc.author !== "Me" ? (
                    <div className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] cursor-pointer px-[8px] py-[4px] rounded-[6px] transition-colors">
                      <div className="w-[16px] h-[16px] rounded-full flex items-center justify-center text-[8px] font-['Geist:Medium'] font-medium text-[#242423]" style={{backgroundColor: selectedDoc.authorColor}}>{selectedDoc.author}</div>
                      <span className="text-[12px] text-[#cfdbd5]">View contact</span>
                    </div>
                  ) : (
                    <span className="text-[#9fa8a2] italic">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      {/* Top Bar */}
      <div className="bg-[var(--color\/canvas,#242423)] border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center justify-between overflow-clip pl-[20px] pr-[18px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Docs
          </p>
        </div>
        
        <div className="flex items-center gap-[12px]">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] flex items-center px-[10px] py-[6px] w-[240px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[8px]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search docs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] text-[#e8eddf] placeholder:text-[#9fa8a2] w-full"
            />
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            New doc
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative px-[32px] pt-[24px]">
        
        {/* Tabs */}
        <div className="mb-[24px]">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[10px] p-[4px] inline-flex">
            {[
              { id: "all", label: "All Docs" },
              { id: "note", label: "Notes" },
              { id: "meeting_doc", label: "Meetings" },
              { id: "snippet", label: "Snippets" }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-['Geist:Medium'] font-medium transition-colors ${activeTab === tab.id ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#cfdbd5] hover:text-[#e8eddf]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Docs Grid */}
        <div className="flex-1 overflow-y-auto pb-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {filteredDocs.map(doc => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoc(doc)} 
                className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] flex flex-col hover:border-[#4d4f4b] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[20px]">{doc.icon}</span>
                    <span className="bg-[rgba(255,255,255,0.06)] px-[6px] py-[2px] rounded-[4px] text-[11px] font-['Geist:Medium'] font-medium text-[#9fa8a2]">{doc.typeLabel}</span>
                  </div>
                  <button className="text-[#9fa8a2] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </div>
                
                <h3 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf] mb-[8px] line-clamp-1">{doc.title}</h3>
                <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2] mb-[16px] line-clamp-2 flex-1">{doc.preview}</p>
                
                <div className="flex items-center justify-between pt-[16px] border-t border-[var(--color\/border,#40403e)]">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[8px] font-['Geist:Medium'] font-medium text-[#242423]" style={{backgroundColor: doc.authorColor}}>{doc.author}</div>
                  </div>
                  <span className="font-['Geist:Regular'] font-normal text-[11px] text-[#9fa8a2]">{doc.modified}</span>
                </div>
              </div>
            ))}
          </div>
          {filteredDocs.length === 0 && (
            <div className="py-[60px] text-center flex flex-col items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#40403e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-[16px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              <p className="text-[14px] text-[#cfdbd5] font-['Geist:Medium'] font-medium mb-[4px]">No documents found</p>
              <p className="text-[13px] text-[#9fa8a2]">Try a different search or create a new document.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border-strong,#4d4f4b)] rounded-[16px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] w-full max-w-[500px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-[24px] py-[16px] border-b border-[var(--color\/border,#40403e)] flex justify-between items-center">
              <h2 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf]">Create new document</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-[24px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Document Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Q4 Product Roadmap" 
                  className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] placeholder:text-[#9fa8a2] outline-none focus:border-[#cfdbd5] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Document Type</label>
                <div className="grid grid-cols-2 gap-[10px]">
                  {[
                    { id: 'note', icon: '📝', label: 'Note' },
                    { id: 'meeting', icon: '📋', label: 'Meeting Doc' },
                    { id: 'snippet', icon: '✂️', label: 'Snippet' },
                    { id: 'dossier', icon: '📊', label: 'Dossier' }
                  ].map(type => (
                    <button key={type.id} className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] hover:border-[#9fa8a2] rounded-[8px] p-[12px] flex items-center gap-[10px] transition-colors text-left group focus:border-[#f5cb5c]">
                      <span className="text-[18px]">{type.icon}</span>
                      <span className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf]">{type.label}</span>
                    </button>
                  ))}
                </div>
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
                Create document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
