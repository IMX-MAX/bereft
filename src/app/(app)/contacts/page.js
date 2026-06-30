"use client";
import { useState } from "react";
import styles from "./Contacts.module.css";

const MOCK_PEOPLE = [
  { id: 1, name: "Sarah Chen", email: "sarah@acme.co", company: "Acme Corp", title: "CEO", lastInteraction: "2 days ago", tags: ["investor", "priority"], color: "#f5cb5c" },
  { id: 2, name: "Marcus Rodriguez", email: "marcus@techflow.io", company: "TechFlow", title: "CTO", lastInteraction: "1 week ago", tags: ["partner"], color: "#10b981" },
  { id: 3, name: "Emily Watson", email: "emily@designco.com", company: "DesignCo", title: "Head of Design", lastInteraction: "3 days ago", tags: ["client"], color: "#6366f1" },
  { id: 4, name: "James Kim", email: "james@startupx.com", company: "StartupX", title: "Founder", lastInteraction: "1 day ago", tags: ["investor", "warm-intro"], color: "#ec4899" },
  { id: 5, name: "Lisa Park", email: "lisa@cloudbase.dev", company: "CloudBase", title: "VP Engineering", lastInteraction: "5 days ago", tags: ["hiring"], color: "#8b5cf6" },
  { id: 6, name: "David Thompson", email: "david@ventures.capital", company: "Ventures Capital", title: "Partner", lastInteraction: "2 weeks ago", tags: ["investor"], color: "#f59e0b" },
  { id: 7, name: "Priya Patel", email: "priya@dataworks.ai", company: "DataWorks AI", title: "ML Lead", lastInteraction: "4 days ago", tags: ["partner", "technical"], color: "#0ea5e9" },
  { id: 8, name: "Alex Moreau", email: "alex@scaleup.co", company: "ScaleUp", title: "COO", lastInteraction: "1 week ago", tags: ["client"], color: "#ef4444" },
];

const MOCK_COMPANIES = [
  { id: 1, name: "Acme Corp", domain: "acme.co", industry: "Enterprise SaaS", contacts: 3, color: "#f5cb5c" },
  { id: 2, name: "TechFlow", domain: "techflow.io", industry: "Developer Tools", contacts: 2, color: "#10b981" },
  { id: 3, name: "DesignCo", domain: "designco.com", industry: "Design Agency", contacts: 1, color: "#6366f1" },
  { id: 4, name: "Ventures Capital", domain: "ventures.capital", industry: "Venture Capital", contacts: 2, color: "#f59e0b" },
  { id: 5, name: "DataWorks AI", domain: "dataworks.ai", industry: "AI/ML", contacts: 1, color: "#0ea5e9" },
];

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState("people");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredPeople = MOCK_PEOPLE.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = MOCK_COMPANIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      {/* Top Bar */}
      <div className="bg-[var(--color\/canvas,#242423)] border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center justify-between overflow-clip pl-[20px] pr-[18px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:stroke-[#e8eddf]"><path d="m15 18-6-6 6-6"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Contacts
          </p>
        </div>
        
        <div className="flex items-center gap-[12px]">
          <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] flex items-center px-[10px] py-[6px] w-[240px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[8px]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] text-[#e8eddf] placeholder:text-[#9fa8a2] w-full"
            />
          </div>
          <button className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New contact
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        <div className={`flex-1 flex flex-col overflow-y-auto ${selectedContact ? 'pr-[320px]' : ''} transition-all duration-300`}>
          
          {/* Tabs */}
          <div className="px-[24px] pt-[24px] pb-[16px]">
            <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[10px] p-[4px] inline-flex">
              <button 
                onClick={() => setActiveTab("people")}
                className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-['Geist:Medium'] font-medium transition-colors ${activeTab === "people" ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#cfdbd5] hover:text-[#e8eddf]"}`}
              >
                People
              </button>
              <button 
                onClick={() => setActiveTab("companies")}
                className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-['Geist:Medium'] font-medium transition-colors ${activeTab === "companies" ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#cfdbd5] hover:text-[#e8eddf]"}`}
              >
                Companies
              </button>
            </div>
          </div>

          {/* People View */}
          {activeTab === "people" && (
            <div className="px-[24px] pb-[24px]">
              <div className="border border-[var(--color\/border,#40403e)] rounded-[12px] overflow-hidden bg-[var(--color\/surface,#333533)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color\/border,#40403e)] text-[12px] font-['Geist:Medium'] font-medium text-[#9fa8a2]">
                      <th className="py-[12px] px-[16px] font-normal">Name</th>
                      <th className="py-[12px] px-[16px] font-normal">Email</th>
                      <th className="py-[12px] px-[16px] font-normal">Company</th>
                      <th className="py-[12px] px-[16px] font-normal">Title</th>
                      <th className="py-[12px] px-[16px] font-normal">Last Interaction</th>
                      <th className="py-[12px] px-[16px] font-normal">Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPeople.map((person, idx) => (
                      <tr 
                        key={person.id} 
                        onClick={() => setSelectedContact(person)}
                        className={`cursor-pointer transition-colors border-b border-[var(--color\/border,#40403e)] last:border-b-0 hover:bg-[rgba(255,255,255,0.03)] ${selectedContact?.id === person.id ? 'bg-[rgba(255,255,255,0.05)]' : ''}`}
                      >
                        <td className="py-[12px] px-[16px]">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-['Geist:SemiBold'] font-semibold text-[#242423]" style={{backgroundColor: person.color}}>
                              {getInitial(person.name)}
                            </div>
                            <span className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf]">{person.name}</span>
                          </div>
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#cfdbd5]">{person.email}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#cfdbd5]">{person.company}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#cfdbd5]">{person.title}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#cfdbd5]">{person.lastInteraction}</td>
                        <td className="py-[12px] px-[16px]">
                          <div className="flex gap-[6px] flex-wrap">
                            {person.tags.map(tag => (
                              <span key={tag} className="px-[8px] py-[2px] rounded-[4px] bg-[rgba(255,255,255,0.06)] text-[11px] text-[#cfdbd5] font-['Geist:Medium'] font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPeople.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-[32px] text-center text-[13px] text-[#9fa8a2]">No contacts found matching "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Companies View */}
          {activeTab === "companies" && (
            <div className="px-[24px] pb-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {filteredCompanies.map(company => (
                <div key={company.id} className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[12px] p-[20px] hover:border-[#4d4f4b] transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-[16px]">
                    <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-[18px] font-['Geist:SemiBold'] font-semibold text-[#242423] shadow-sm" style={{backgroundColor: company.color}}>
                      {getInitial(company.name)}
                    </div>
                    <button className="text-[#9fa8a2] opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </div>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[16px] text-[#e8eddf] mb-[4px]">{company.name}</h3>
                  <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2] mb-[12px]">{company.domain}</p>
                  
                  <div className="flex items-center justify-between pt-[12px] border-t border-[var(--color\/border,#40403e)]">
                    <span className="font-['Geist:Medium'] font-medium text-[12px] text-[#cfdbd5] bg-[rgba(255,255,255,0.06)] px-[8px] py-[2px] rounded-[4px]">{company.industry}</span>
                    <span className="font-['Geist:Regular'] font-normal text-[12px] text-[#9fa8a2]">{company.contacts} contact{company.contacts !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
              {filteredCompanies.length === 0 && (
                <div className="col-span-full py-[32px] text-center text-[13px] text-[#9fa8a2]">No companies found matching "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        {/* Contact Detail Panel */}
        {selectedContact && (
          <div className="absolute top-0 right-0 h-full w-[320px] bg-[var(--color\/surface,#333533)] border-l border-[var(--color\/border,#40403e)] shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.3)] flex flex-col z-20 transition-transform">
            <div className="p-[20px] border-b border-[var(--color\/border,#40403e)] flex items-center justify-between">
              <span className="font-['Geist:Medium'] font-medium text-[13px] text-[#9fa8a2]">Contact Details</span>
              <button onClick={() => setSelectedContact(null)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-[24px] flex-1 overflow-y-auto">
              <div className="flex flex-col items-center text-center mb-[24px]">
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[28px] font-['Geist:SemiBold'] font-semibold text-[#242423] mb-[16px] shadow-sm" style={{backgroundColor: selectedContact.color}}>
                  {getInitial(selectedContact.name)}
                </div>
                <h2 className="font-['Geist:SemiBold'] font-semibold text-[20px] text-[#e8eddf] mb-[4px]">{selectedContact.name}</h2>
                <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#cfdbd5]">{selectedContact.title} at {selectedContact.company}</p>
              </div>

              <div className="flex gap-[8px] mb-[32px]">
                <button className="flex-1 bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:Medium'] font-medium text-[13px] py-[8px] rounded-[8px] flex justify-center items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                  Email
                </button>
                <button className="flex-1 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[#e8eddf] font-['Geist:Medium'] font-medium text-[13px] py-[8px] rounded-[8px] flex justify-center items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Task
                </button>
              </div>

              <div className="space-y-[24px]">
                <section>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[12px]">About</h3>
                  <div className="space-y-[12px] text-[13px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#9fa8a2]">Email</span>
                      <span className="text-[#e8eddf]">{selectedContact.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#9fa8a2]">Phone</span>
                      <span className="text-[#e8eddf]">+1 (555) 019-2834</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#9fa8a2]">Location</span>
                      <span className="text-[#e8eddf]">San Francisco, CA</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[12px]">Tags</h3>
                  <div className="flex gap-[6px] flex-wrap">
                    {selectedContact.tags.map(tag => (
                      <span key={tag} className="px-[8px] py-[4px] rounded-[4px] bg-[rgba(255,255,255,0.06)] text-[12px] text-[#cfdbd5] font-['Geist:Medium'] font-medium">
                        {tag}
                      </span>
                    ))}
                    <button className="px-[8px] py-[4px] rounded-[4px] border border-dashed border-[#40403e] text-[12px] text-[#9fa8a2] hover:text-[#e8eddf] hover:border-[#9fa8a2] transition-colors">
                      + Add
                    </button>
                  </div>
                </section>

                <section>
                  <h3 className="font-['Geist:SemiBold'] font-semibold text-[12px] text-[#9fa8a2] uppercase tracking-wider mb-[16px]">Recent Activity</h3>
                  <div className="relative border-l border-[#40403e] ml-[8px] space-y-[20px] pb-[10px]">
                    
                    <div className="relative pl-[20px]">
                      <div className="absolute left-[-5px] top-[4px] w-[9px] h-[9px] rounded-full bg-[var(--color\/surface,#333533)] border-2 border-[#10b981]" />
                      <p className="text-[13px] text-[#e8eddf] mb-[2px]">Email sent: "Following up on renewal"</p>
                      <p className="text-[11px] text-[#9fa8a2]">{selectedContact.lastInteraction}</p>
                    </div>

                    <div className="relative pl-[20px]">
                      <div className="absolute left-[-5px] top-[4px] w-[9px] h-[9px] rounded-full bg-[var(--color\/surface,#333533)] border-2 border-[#6366f1]" />
                      <p className="text-[13px] text-[#e8eddf] mb-[2px]">Meeting: Q3 Strategy Sync</p>
                      <p className="text-[11px] text-[#9fa8a2]">2 weeks ago</p>
                    </div>

                    <div className="relative pl-[20px]">
                      <div className="absolute left-[-5px] top-[4px] w-[9px] h-[9px] rounded-full bg-[var(--color\/surface,#333533)] border-2 border-[#9fa8a2]" />
                      <p className="text-[13px] text-[#e8eddf] mb-[2px]">Added to Bereft</p>
                      <p className="text-[11px] text-[#9fa8a2]">1 month ago</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
