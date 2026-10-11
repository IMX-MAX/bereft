"use client";
import { useState, useCallback, useMemo } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar-custom.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const INITIAL_EVENTS = [
  { id: '1', title: "Reading a magazine", start: new Date(new Date().setHours(0, 0, 0, 0)), end: new Date(new Date().setHours(1, 0, 0, 0)), type: "focus" },
  { id: '2', title: "Talking about men", start: new Date(new Date().setHours(0, 0, 0, 0)), end: new Date(new Date().setHours(0, 30, 0, 0)), type: "meeting" },
  { id: '3', title: "A. G. Cook - Silver Thread Golden Needle", start: new Date(new Date().setHours(20, 0, 0, 0)), end: new Date(new Date().setHours(21, 0, 0, 0)), type: "spotify" },
  { id: '4', title: "Yoga", start: new Date(new Date().setHours(8, 0, 0, 0)), end: new Date(new Date().setHours(9, 0, 0, 0)), type: "ai" }
];

export default function CalendarPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  
  // Drag and drop state for outside tasks
  const [draggedEvent, setDraggedEvent] = useState(null);

  // Dynamic Sidebar State
  const [inboxTasks, setInboxTasks] = useState([
    { id: 'i1', title: 'To be upgraded', type: 'task', list: 'inbox' },
    { id: 'i2', title: 'Make friends', type: 'task', list: 'inbox' },
    { id: 'i3', title: 'Wake up!', type: 'task', list: 'inbox' },
  ]);
  const [todayTasks, setTodayTasks] = useState([
    { id: 't1', title: 'Make friends', type: 'meeting', list: 'today' },
    { id: 't2', title: 'Wake up!', type: 'focus', list: 'today' },
    { id: 't3', title: 'To be upgraded', type: 'task', list: 'today' },
  ]);
  const [noDateTasks, setNoDateTasks] = useState([
    { id: 'n1', title: 'Being so charming', type: 'task', list: 'noDate' },
    { id: 'n2', title: 'Move in', type: 'task', list: 'noDate' }
  ]);

  const addTask = (listName) => {
    const title = window.prompt("New Task Name:");
    if (!title) return;
    const newTask = { id: Math.random().toString(), title, type: 'task', list: listName };
    if (listName === 'inbox') setInboxTasks(prev => [...prev, newTask]);
    else if (listName === 'today') setTodayTasks(prev => [...prev, newTask]);
    else if (listName === 'noDate') setNoDateTasks(prev => [...prev, newTask]);
  };

  const removeTaskFromList = (task) => {
    if (task.list === 'inbox') setInboxTasks(prev => prev.filter(t => t.id !== task.id));
    else if (task.list === 'today') setTodayTasks(prev => prev.filter(t => t.id !== task.id));
    else if (task.list === 'noDate') setNoDateTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event Title");
    if (title) {
      setEvents(prev => [...prev, { id: Math.random().toString(), title, start, end, type: 'manual' }]);
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm(`Delete event '${event.title}'?`)) {
      setEvents(prev => prev.filter(e => e.id !== event.id));
    }
  };

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  const newEvent = useCallback(
    (event) => {
      setEvents((prev) => {
        return [...prev, { ...event, id: Math.random().toString() }];
      });
    },
    [setEvents]
  );

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      if (draggedEvent === null) return;
      
      let eventStart = start;
      let eventEnd = end;
      
      if (!end) {
        eventEnd = new Date(start.getTime() + 60 * 60 * 1000); // 1 hr default
      }

      const event = {
        title: draggedEvent.title,
        type: draggedEvent.type || 'task',
        start: eventStart,
        end: eventEnd,
        id: Math.random().toString()
      };
      
      newEvent(event);
      removeTaskFromList(draggedEvent);
      setDraggedEvent(null);
    },
    [draggedEvent, newEvent]
  );

  const handleDragStartOutside = (task) => {
    setDraggedEvent(task);
  };

  const dragFromOutsideItem = useCallback(() => {
    return draggedEvent;
  }, [draggedEvent]);

  // CUSTOM HEADER (Sun 7, Mon 8... Fri 12 red circle)
  const CustomHeader = ({ date }) => {
    const isToday = moment().isSame(date, 'day');
    const dayName = moment(date).format('ddd'); // Sun, Mon, Tue
    const dayNum = moment(date).format('D'); // 7, 8, 9
    
    return (
      <div className="flex items-center justify-center gap-1.5 font-medium text-[13px] py-1">
        <span className={isToday ? "text-[#333]" : "text-[#999]"}>{dayName}</span>
        <span className={isToday ? "bg-[#f43f5e] text-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm" : "text-[#999]"}>
          {dayNum}
        </span>
      </div>
    );
  };

  const CustomEvent = ({ event }) => {
    let bgColor = "#e0f2fe"; // default light blue
    let textColor = "#0369a1";
    let borderLeft = "3px solid #0ea5e9";
    
    if (event.type === 'meeting') {
      bgColor = "#f3e8ff"; // light purple to match image
      textColor = "#9333ea";
      borderLeft = "3px solid #c084fc";
    } else if (event.type === 'focus') {
      bgColor = "#cffafe"; // very light cyan
      textColor = "#0e7490";
      borderLeft = "3px solid #06b6d4";
    } else if (event.type === 'ai') {
      bgColor = "#dcfce7";
      textColor = "#15803d";
      borderLeft = "3px solid #22c55e";
    } else if (event.type === 'task') {
      bgColor = "#f3f4f6"; // light gray
      textColor = "#374151";
      borderLeft = "3px solid #6b7280";
    } else if (event.type === 'spotify') {
      bgColor = "#22c55e"; // spotify green
      textColor = "#fff";
      borderLeft = "3px solid #16a34a";
    }

    const [hover, setHover] = useState(false);

    return (
      <div 
        className="h-full w-full rounded-[4px] px-2 py-1 text-xs font-medium truncate flex flex-col justify-start relative transition-all duration-200 hover:brightness-95" 
        style={{ backgroundColor: bgColor, color: textColor, borderLeft }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex justify-between items-start w-full">
          <span className="truncate">{event.title}</span>
          {event.type === 'focus' && <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-50 shrink-0 ml-1 mt-0.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        </div>
        
        {/* Subtle time for taller events */}
        <div className="text-[10px] opacity-70 mt-0.5">
          {moment(event.start).format('h A')}
        </div>

        {/* Easter Egg Spotify Hover Card */}
        {event.type === 'spotify' && hover && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#282828] text-white p-2 rounded-lg shadow-xl w-[280px] flex gap-3 items-center" style={{ animation: 'fade-in 0.2s ease-out' }}>
            <div className="w-12 h-12 bg-black rounded shrink-0 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.69 14.4c-.18.3-.57.4-.87.21-2.38-1.46-5.38-1.79-8.91-.98-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.86-.88 7.18-.5 9.85 1.14.3.18.4.57.22.86zm1.3-3.15c-.23.37-.7.49-1.07.26-2.73-1.68-6.93-2.18-10.46-1.19-.42.12-.86-.13-.98-.55-.12-.42.13-.86.55-.98 4.04-1.14 8.71-.57 11.83 1.35.37.23.49.7.26 1.07zm.13-3.32C14.7 7.9 9.8 7.71 5.72 8.94c-.5.15-1.02-.13-1.17-.63-.15-.5.13-1.02.63-1.17 4.74-1.43 10.29-1.2 14.3 1.18.45.27.6.86.33 1.31-.27.45-.86.6-1.31.33z"/></svg>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-semibold text-sm truncate">{event.title}</span>
              <span className="text-xs text-[#b3b3b3]">Play on Spotify</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full h-full bg-[#f9f9f9] font-['Inter',sans-serif]">
      {/* Secondary Sidebar */}
      <div className="w-[280px] border-r border-[#ececec] flex flex-col bg-[#fdfdfd] pt-4">
        <div className="flex items-center gap-4 px-4 mb-6">
          <button className="bg-[#e5e5e5] text-[#333] px-2 py-1 rounded-md text-xs font-medium">All <span className="opacity-50">5</span></button>
          <button className="text-[#666] text-xs font-medium hover:text-[#333]">Inbox <span className="opacity-50">3</span></button>
          <button className="text-[#666] text-xs font-medium hover:text-[#333]">2 more</button>
          <div className="flex-1" />
          <button className="text-[#666] hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-6">
          {/* Inbox section */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2 group">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <h3 className="font-semibold text-sm text-[#333]">Inbox <span className="text-[#999] font-normal text-xs ml-1">{inboxTasks.length}</span></h3>
              </div>
              <div className="flex items-center gap-2 text-[#999] opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addTask('inbox')} className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
                <button className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
              </div>
            </div>
            <div className="space-y-[2px]">
              {inboxTasks.length === 0 && <p className="text-xs text-[#999] px-2 py-1">All clear! ✨</p>}
              {inboxTasks.map((task) => (
                <div 
                  key={task.id} 
                  draggable={true}
                  onDragStart={() => handleDragStartOutside(task)}
                  className="flex items-center justify-between p-2 hover:bg-[#f2f2f2] rounded-lg cursor-grab active:cursor-grabbing group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-[#ccc] group-hover:border-[#999] transition-colors" />
                    <span className="text-[13px] text-[#333]">{task.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today section */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2 group">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <h3 className="font-semibold text-sm text-[#333]">Today <span className="text-[#999] font-normal text-xs ml-1">{todayTasks.length}</span></h3>
              </div>
              <div className="flex items-center gap-2 text-[#999] opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addTask('today')} className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
                <button className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
              </div>
            </div>
            <div className="space-y-[2px]">
              {todayTasks.length === 0 && <p className="text-xs text-[#999] px-2 py-1">Time to chill! ☕</p>}
              {todayTasks.map((task) => (
                <div 
                  key={task.id}
                  draggable={true}
                  onDragStart={() => handleDragStartOutside(task)}
                  className="flex items-center justify-between p-2 hover:bg-[#f2f2f2] rounded-lg cursor-grab active:cursor-grabbing group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-[#ccc] group-hover:border-[#999] transition-colors" />
                    <span className="text-[13px] text-[#333]">{task.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* No termination date section */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2 mt-4 group">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e85d04" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <h3 className="font-semibold text-sm text-[#333]">No termination date <span className="text-[#999] font-normal text-xs ml-1">{noDateTasks.length}</span></h3>
              </div>
              <div className="flex items-center gap-2 text-[#999] opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addTask('noDate')} className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
                <button className="hover:text-[#333]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
              </div>
            </div>
            <div className="space-y-[2px]">
              {noDateTasks.map((task) => (
                <div 
                  key={task.id}
                  draggable={true}
                  onDragStart={() => handleDragStartOutside(task)}
                  className="flex items-center justify-between p-2 hover:bg-[#f2f2f2] rounded-lg cursor-grab active:cursor-grabbing group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-[#ccc] group-hover:border-[#999] transition-colors" />
                    <span className="text-[13px] text-[#333]">{task.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
           <div className="bg-[#f0f0f0] rounded-md px-3 py-1.5 flex items-center gap-2 text-[13px] font-semibold text-[#333] shadow-sm">
             {moment(date).format('MMM YYYY')} <span className="bg-white text-[#999] px-1 rounded text-[11px] font-medium">W{moment(date).week()}</span>
             <div className="flex items-center gap-1 ml-2 border-l border-[#ddd] pl-2">
               <button onClick={() => setDate(moment(date).subtract(1, 'week').toDate())} className="hover:text-black p-0.5 rounded hover:bg-[#e5e5e5]"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15 18l-6-6 6-6"/></svg></button>
               <button onClick={() => setDate(moment(date).add(1, 'week').toDate())} className="hover:text-black p-0.5 rounded hover:bg-[#e5e5e5]"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18l6-6-6-6"/></svg></button>
             </div>
           </div>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <div className="bg-white border border-[#eee] rounded-md px-3 py-1.5 flex items-center gap-2 text-[13px] font-medium text-[#333] shadow-sm">
             <div className="flex -space-x-1">
               <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
               <div className="w-3 h-3 rounded-full bg-[#f43f5e]"></div>
             </div>
             2 calendars
           </div>
           <button className="bg-white border border-[#eee] rounded-md px-3 py-1.5 text-[13px] font-medium text-[#333] shadow-sm hover:bg-[#f9f9f9]">Meet</button>
           <button className="bg-white border border-[#eee] rounded-md px-3 py-1.5 text-[13px] font-medium text-[#333] shadow-sm hover:bg-[#f9f9f9]">Share</button>
        </div>

        {/* Calendar */}
        <div className="flex-1 pt-14 pb-0 relative overflow-hidden custom-calendar-wrapper">
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            date={date}
            onNavigate={setDate}
            onView={setView}
            selectable
            resizable
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            onDropFromOutside={onDropFromOutside}
            dragFromOutsideItem={dragFromOutsideItem}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            components={{
              event: CustomEvent,
              header: CustomHeader
            }}
            toolbar={false}
            step={30}
            timeslots={2}
          />
        </div>
      </div>
    </div>
  );
}
