"use client";
import { useState } from "react";
import styles from "./Calendar.module.css";

const MOCK_EVENTS = [
  { id: 1, title: "Team Standup", dayOffset: 0, startHour: 9, startMinute: 0, durationMinutes: 30, attendees: 5, type: "internal", location: "Zoom" },
  { id: 2, title: "Acme Renewal Review", dayOffset: 0, startHour: 11, startMinute: 0, durationMinutes: 60, attendees: 3, type: "external", location: "Google Meet" },
  { id: 3, title: "1:1 with Sarah Chen", dayOffset: 0, startHour: 14, startMinute: 0, durationMinutes: 30, attendees: 2, type: "internal", location: "Zoom" },
  { id: 4, title: "Product Demo for Investors", dayOffset: 1, startHour: 10, startMinute: 0, durationMinutes: 90, attendees: 4, type: "external", location: "Zoom" },
  { id: 5, title: "Focus Time", dayOffset: 1, startHour: 13, startMinute: 0, durationMinutes: 120, attendees: 1, type: "focus", location: "No location" },
  { id: 6, title: "Design Review", dayOffset: 2, startHour: 9, startMinute: 30, durationMinutes: 60, attendees: 6, type: "internal", location: "Conference Room A" },
  { id: 7, title: "Hiring Committee", dayOffset: 3, startHour: 15, startMinute: 0, durationMinutes: 60, attendees: 4, type: "internal", location: "Zoom" },
  { id: 8, title: "Board Meeting Prep", dayOffset: 4, startHour: 10, startMinute: 0, durationMinutes: 120, attendees: 3, type: "internal", location: "Zoom" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

export default function CalendarPage() {
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Quick date logic for MVP (always shows current week based on today)
  const today = new Date();
  const currentDayOfWeek = today.getDay() || 7; // 1-7, where 1 is Monday
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - currentDayOfWeek + 1);

  const getWeekDays = () => {
    return DAYS.map((dayName, i) => {
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + i);
      const isToday = d.toDateString() === today.toDateString();
      return {
        name: dayName,
        date: d.getDate(),
        isToday,
        index: i
      };
    });
  };

  const weekDays = getWeekDays();

  const getEventStyle = (event) => {
    // Calculate position
    // Base hour is 8 AM (index 0)
    const startOffsetMinutes = ((event.startHour - 8) * 60) + event.startMinute;
    const topPx = (startOffsetMinutes / 60) * 60; // 60px per hour
    const heightPx = (event.durationMinutes / 60) * 60;
    
    // Determine column
    // For MVP, if today is Wed, dayOffset 0 is Wed
    const targetDayIndex = (currentDayOfWeek - 1 + event.dayOffset) % 7;
    
    let bgColor = "rgba(99, 102, 241, 0.15)";
    let borderColor = "#6366f1";
    
    if (event.type === "external") {
      bgColor = "rgba(16, 185, 129, 0.15)";
      borderColor = "#10b981";
    } else if (event.type === "focus") {
      bgColor = "rgba(168, 85, 247, 0.15)";
      borderColor = "#a855f7";
    }

    return {
      top: `${topPx + 1}px`,
      height: `${heightPx - 2}px`,
      backgroundColor: bgColor,
      borderLeft: `3px solid ${borderColor}`,
      gridColumn: targetDayIndex + 2 // +1 for time column, +1 for 1-based CSS grid
    };
  };

  const formatTime = (h, m) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : h;
    const displayM = m === 0 ? '00' : m.toString();
    return `${displayH}:${displayM} ${ampm}`;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[var(--color\/canvas,#242423)] relative">
      {/* Top Bar */}
      <div className="border-[var(--color\/border,#40403e)] border-b border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[20px] py-[12px] relative shrink-0 w-full z-10">
        <div className="flex items-center gap-[8px] mr-[16px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cfdbd5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap">
            Calendar
          </p>
        </div>
        
        {/* Date Nav */}
        <div className="flex items-center gap-[4px] ml-[8px]">
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors text-[#cfdbd5] cursor-pointer border border-[var(--color\/border,#40403e)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button className="px-[12px] h-[28px] flex items-center justify-center rounded-[6px] hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors text-[#cfdbd5] cursor-pointer text-[12.5px] font-['Geist:Medium'] font-medium border border-[var(--color\/border,#40403e)]">
            Today
          </button>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] hover:bg-[var(--color\/surface-2,#3d3f3b)] transition-colors text-[#cfdbd5] cursor-pointer border border-[var(--color\/border,#40403e)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <span className="ml-[12px] text-[14px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
            {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
          </span>
        </div>

        <div className="flex-1" />
        
        {/* View Toggle */}
        <div className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] p-[3px] inline-flex">
          {["Day", "Week", "Month"].map(v => (
            <button 
              key={v}
              onClick={() => setView(v.toLowerCase())}
              className={`px-[12px] py-[4px] rounded-[5px] text-[12px] font-['Geist:Medium'] font-medium transition-colors ${view === v.toLowerCase() ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] shadow-sm" : "text-[#9fa8a2] hover:text-[#e8eddf]"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header row (Days) */}
          <div className="flex border-b border-[var(--color\/border,#40403e)] bg-[var(--color\/canvas,#242423)] z-10 shrink-0">
            <div className="w-[60px] border-r border-[var(--color\/border,#40403e)] shrink-0" />
            <div className="flex-1 grid grid-cols-7">
              {weekDays.map(day => (
                <div key={day.name} className={`flex flex-col items-center justify-center py-[12px] border-r border-[var(--color\/border,#40403e)] last:border-r-0 ${day.isToday ? 'bg-[rgba(245,213,92,0.03)]' : ''}`}>
                  <span className={`text-[11px] font-['Geist:Medium'] font-medium uppercase tracking-wider ${day.isToday ? 'text-[#f5cb5c]' : 'text-[#9fa8a2]'}`}>{day.name}</span>
                  <div className={`mt-[4px] w-[32px] h-[32px] flex items-center justify-center rounded-full text-[16px] font-['Geist:Regular'] font-normal ${day.isToday ? "bg-[#f5cb5c] text-[#242423] font-['Geist:Medium']" : "text-[#e8eddf]"}`}>
                    {day.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Area */}
          <div className="flex-1 overflow-y-auto relative">
            <div className="flex relative" style={{ minHeight: `${HOURS.length * 60}px` }}>
              {/* Time column */}
              <div className="w-[60px] border-r border-[var(--color\/border,#40403e)] flex flex-col shrink-0 bg-[var(--color\/canvas,#242423)] relative z-10">
                {HOURS.map(hour => (
                  <div key={hour} className="h-[60px] relative">
                    <span className="absolute top-[-8px] right-[8px] text-[11px] font-['Geist:Regular'] font-normal text-[#9fa8a2]">{hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}</span>
                  </div>
                ))}
              </div>

              {/* Day columns wrapper */}
              <div className={styles.timeGrid}>
                {/* Horizontal grid lines */}
                <div className="col-start-1 col-end-8 row-start-1 h-full w-full absolute pointer-events-none">
                  {HOURS.map(hour => (
                    <div key={hour} className="h-[60px] border-b border-[var(--color\/border,#40403e)] w-full opacity-50" />
                  ))}
                </div>

                {/* Vertical day columns lines */}
                {weekDays.map((day, i) => (
                  <div key={i} className={`col-start-${i+2} h-full border-r border-[var(--color\/border,#40403e)] last:border-r-0 ${day.isToday ? 'bg-[rgba(245,213,92,0.02)]' : ''}`} style={{ gridColumn: i + 1 }} />
                ))}

                {/* Events */}
                {MOCK_EVENTS.map(event => {
                  const style = getEventStyle(event);
                  return (
                    <div 
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="absolute left-[2px] right-[2px] rounded-[6px] p-[6px] overflow-hidden cursor-pointer hover:brightness-110 transition-all z-20 shadow-sm"
                      style={style}
                    >
                      <p className="font-['Geist:SemiBold'] font-semibold text-[11.5px] text-[#e8eddf] leading-[14px] mb-[2px] truncate">{event.title}</p>
                      <p className="font-['Geist:Regular'] font-normal text-[10.5px] text-[#cfdbd5] opacity-80 truncate">
                        {formatTime(event.startHour, event.startMinute)} - {formatTime(event.startHour + Math.floor((event.startMinute + event.durationMinutes)/60), (event.startMinute + event.durationMinutes)%60)}
                      </p>
                    </div>
                  );
                })}

                {/* Current time indicator line (mock placement) */}
                <div className="absolute left-0 right-0 h-[2px] bg-[#f5cb5c] z-30 pointer-events-none" style={{ top: '210px' }}>
                  <div className="absolute left-[-4px] top-[-3px] w-[8px] h-[8px] rounded-full bg-[#f5cb5c]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedEvent && (
          <div className="w-[320px] border-l border-[var(--color\/border,#40403e)] bg-[var(--color\/surface,#333533)] flex flex-col z-20 relative">
            <div className="p-[16px] flex justify-end absolute top-0 right-0 z-30">
              <button onClick={() => setSelectedEvent(null)} className="text-[#9fa8a2] hover:text-[#e8eddf] transition-colors w-[28px] h-[28px] flex items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.06)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-[24px] pt-[40px] flex-1 overflow-y-auto">
              <div className="flex gap-[8px] mb-[16px]">
                <div className={`w-[12px] h-[12px] rounded-full mt-[4px] shrink-0 ${
                  selectedEvent.type === 'external' ? 'bg-[#10b981]' : 
                  selectedEvent.type === 'focus' ? 'bg-[#a855f7]' : 'bg-[#6366f1]'
                }`} />
                <div>
                  <h2 className="font-['Geist:SemiBold'] font-semibold text-[20px] text-[#e8eddf] mb-[6px] leading-tight">{selectedEvent.title}</h2>
                  <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#cfdbd5]">
                    {formatTime(selectedEvent.startHour, selectedEvent.startMinute)} - {formatTime(selectedEvent.startHour + Math.floor((selectedEvent.startMinute + selectedEvent.durationMinutes)/60), (selectedEvent.startMinute + selectedEvent.durationMinutes)%60)}
                  </p>
                  <p className="font-['Geist:Regular'] font-normal text-[13px] text-[#9fa8a2] mt-[2px]">
                    {weekDays[(currentDayOfWeek - 1 + selectedEvent.dayOffset) % 7]?.name}, {today.toLocaleString('default', { month: 'short' })} {weekDays[(currentDayOfWeek - 1 + selectedEvent.dayOffset) % 7]?.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-[8px] mb-[32px]">
                <button className="flex-1 bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:Medium'] font-medium text-[13px] py-[8px] rounded-[8px] flex justify-center items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.5 15.5 4.5 4.5"/><path d="m21 16-5-5"/><path d="M21 21v-5"/><path d="M21 21h-5"/><path d="M15.5 8.5 20 4"/><path d="m16 3 5 5"/><path d="M21 3v5"/><path d="M21 3h-5"/><path d="m8.5 15.5-4.5 4.5"/><path d="m3 16 5-5"/><path d="M3 21v-5"/><path d="M3 21h5"/><path d="m8.5 8.5-4.5-4.5"/><path d="m8 3-5 5"/><path d="M3 3v5"/><path d="M3 3h5"/></svg>
                  Join {selectedEvent.location.includes("Zoom") ? "Zoom" : "Meeting"}
                </button>
              </div>

              <div className="space-y-[24px]">
                <section>
                  <h3 className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf] mb-[12px] flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Location
                  </h3>
                  <p className="text-[13px] text-[#cfdbd5] ml-[24px]">{selectedEvent.location}</p>
                </section>

                <section>
                  <h3 className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf] mb-[12px] flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Attendees ({selectedEvent.attendees})
                  </h3>
                  <div className="ml-[24px] flex -space-x-2">
                    {Array.from({length: selectedEvent.attendees}).map((_, i) => (
                      <div key={i} className="w-[32px] h-[32px] rounded-full bg-[var(--color\/surface-2,#3d3f3b)] border-2 border-[var(--color\/surface,#333533)] flex items-center justify-center text-[12px] text-[#cfdbd5] font-['Geist:Medium'] font-medium z-[10] shadow-sm relative" style={{ zIndex: 10 - i }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf] mb-[12px] flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    Description & Notes
                  </h3>
                  <div className="ml-[24px] space-y-[12px]">
                    <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--color\/border,#40403e)] rounded-[8px] p-[12px] flex items-center gap-[12px] cursor-pointer hover:border-[#4d4f4b] transition-colors">
                      <div className="w-[32px] h-[32px] rounded-[6px] bg-[rgba(245,213,92,0.1)] text-[#f5cb5c] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-['Geist:Medium'] font-medium text-[13px] text-[#e8eddf]">Meeting Notes</p>
                        <p className="text-[11.5px] text-[#9fa8a2]">Auto-joins & records</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9fa8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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
