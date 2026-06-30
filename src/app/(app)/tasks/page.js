"use client";

import { useState } from "react";
import styles from "./Tasks.module.css";

const INITIAL_TASKS = [
  { id: 1, title: "Follow up with Acme on renewal", description: "Send renewal proposal to Acme Corp and schedule a call with their procurement team to discuss terms for next year.", priority: "urgent", due: "Jul 1", assignee: "Sarah Chen", status: "to_do", contacts: ["John Blake (Acme)", "Rita Gonzalez (Acme)"], activity: ["Created 2 days ago", "Priority changed to urgent", "Assigned to Sarah Chen", "Linked contact John Blake"] },
  { id: 2, title: "Review Q3 pipeline report", description: "Analyze pipeline numbers for Q3, identify bottlenecks and prepare summary for leadership sync.", priority: "high", due: "Jul 3", assignee: "Marcus Rodriguez", status: "in_progress", contacts: ["Marcus Rodriguez"], activity: ["Created 5 days ago", "Status changed to In Progress", "Assigned to Marcus Rodriguez"] },
  { id: 3, title: "Schedule investor demo", description: "Coordinate with product team to set up a live demo for Series B investors next week.", priority: "medium", due: "Jul 5", assignee: "Me", status: "to_do", contacts: ["David Liu (Sequoia)", "Anna Berg"], activity: ["Created 3 days ago", "Assigned to Me"] },
  { id: 4, title: "Update CRM contact tags", description: "Audit and update tagging taxonomy across all contacts to improve segmentation accuracy.", priority: "low", due: "Jul 8", assignee: "Emily Watson", status: "to_do", contacts: [], activity: ["Created 1 day ago", "Assigned to Emily Watson"] },
  { id: 5, title: "Prepare board deck", description: "Compile financial highlights, product milestones, and growth metrics for the upcoming board meeting.", priority: "urgent", due: "Jul 1", assignee: "James Kim", status: "in_progress", contacts: ["Board Members"], activity: ["Created 4 days ago", "Priority changed to urgent", "Status changed to In Progress", "Assigned to James Kim"] },
  { id: 6, title: "Send welcome email to new leads", description: "Draft and send a personalized welcome sequence to the 42 new leads from the webinar.", priority: "medium", due: "Jul 2", assignee: "Lisa Park", status: "to_do", contacts: ["Webinar Leads List"], activity: ["Created 1 day ago", "Assigned to Lisa Park"] },
  { id: 7, title: "Review hiring candidates", description: "Screen resumes and schedule first-round interviews for the two open SDR positions.", priority: "high", due: "Jul 4", assignee: "David Thompson", status: "to_do", contacts: ["HR Team"], activity: ["Created 3 days ago", "Assigned to David Thompson", "Priority changed to high"] },
  { id: 8, title: "Fix data pipeline issue", description: "Investigate and resolve the broken ETL job that is blocking nightly CRM sync.", priority: "urgent", due: "Jun 30", assignee: "Priya Patel", status: "in_progress", contacts: ["Engineering Team"], activity: ["Created today", "Priority set to urgent", "Status changed to In Progress", "Assigned to Priya Patel"] },
  { id: 9, title: "Write blog post draft", description: "Draft a thought-leadership post about AI-driven sales workflows for the company blog.", priority: "low", due: "Jul 10", assignee: "Alex Moreau", status: "to_do", contacts: [], activity: ["Created 2 days ago", "Assigned to Alex Moreau"] },
  { id: 10, title: "Onboard CloudBase team", description: "Set up accounts, send credentials, and walk through the platform with the new CloudBase customer team.", priority: "medium", due: "Jun 28", assignee: "Me", status: "done", contacts: ["Tom Reed (CloudBase)", "Sana Ali (CloudBase)"], activity: ["Created 5 days ago", "Assigned to Me", "Status changed to Done", "Completed Jun 28"] },
];

const PRIORITY_COLORS = { urgent: "#ef4444", high: "#f97316", medium: "#f5cb5c", low: "#6b7280" };
const PRIORITY_LABELS = { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" };
const STATUS_LABELS = { to_do: "To Do", in_progress: "In Progress", done: "Done", cancelled: "Cancelled" };
const FILTERS = [
  { key: "all", label: "All" },
  { key: "to_do", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

function PriorityBadge({ priority }) {
  return (
    <span className="px-[6px] py-[2px] rounded text-[11px] font-['Geist:Medium'] leading-none whitespace-nowrap" style={{ backgroundColor: PRIORITY_COLORS[priority] + "22", color: PRIORITY_COLORS[priority] }}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

function AvatarCircle({ name }) {
  const initial = name === "Me" ? "M" : name.charAt(0);
  return (
    <span title={name} className="w-[26px] h-[26px] rounded-full bg-[var(--color\/surface-2,#3d3f3b)] text-[var(--color\/text-secondary,#cfdbd5)] text-[11px] font-['Geist:SemiBold'] flex items-center justify-center shrink-0">
      {initial}
    </span>
  );
}

function CheckCircle({ checked, onClick }) {
  return (
    <button onClick={onClick} className="w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center shrink-0 cursor-pointer transition-colors" style={{ borderColor: checked ? "#f5cb5c" : "#4d4f4b", backgroundColor: checked ? "#f5cb5c" : "transparent" }}>
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5L5 8.5L9 3.5" stroke="#242423" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </button>
  );
}

function StatusDot({ status }) {
  const colors = { to_do: "#6b7280", in_progress: "#3b82f6", done: "#22c55e", cancelled: "#ef4444" };
  return <span className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: colors[status] }} />;
}

// ---------- Create Task Modal ----------
function CreateTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", due: "", assignee: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center bg-black/60`} onClick={onClose}>
      <div className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-xl w-full max-w-[520px] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[var(--color\/text-primary,#e8eddf)] text-[18px] font-['Geist:SemiBold'] mb-5">New Task</h2>

        <label className="block mb-4">
          <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium'] mb-1 block">Title</span>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Task title…" className="w-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-lg px-3 py-2 text-[14px] text-[var(--color\/text-primary,#e8eddf)] placeholder:text-[var(--color\/text-tertiary,#9fa8a2)] outline-none focus:border-[var(--color\/accent,#f5cb5c)]" />
        </label>

        <label className="block mb-4">
          <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium'] mb-1 block">Description</span>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Add a description…" className="w-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-lg px-3 py-2 text-[14px] text-[var(--color\/text-primary,#e8eddf)] placeholder:text-[var(--color\/text-tertiary,#9fa8a2)] outline-none resize-none focus:border-[var(--color\/accent,#f5cb5c)]" />
        </label>

        <div className="flex gap-3 mb-4">
          <label className="flex-1">
            <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium'] mb-1 block">Priority</span>
            <div className="flex gap-1">
              {["low", "medium", "high", "urgent"].map((p) => (
                <button key={p} onClick={() => set("priority", p)} className={`flex-1 py-[6px] rounded-md text-[12px] font-['Geist:Medium'] cursor-pointer transition-colors border ${form.priority === p ? "border-[var(--color\/accent,#f5cb5c)]" : "border-[var(--color\/border,#40403e)]"}`} style={{ backgroundColor: form.priority === p ? PRIORITY_COLORS[p] + "22" : "transparent", color: PRIORITY_COLORS[p] }}>
                  {PRIORITY_LABELS[p]}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="flex gap-3 mb-6">
          <label className="flex-1">
            <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium'] mb-1 block">Due date</span>
            <input value={form.due} onChange={(e) => set("due", e.target.value)} placeholder="e.g. Jul 5" className="w-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-lg px-3 py-2 text-[14px] text-[var(--color\/text-primary,#e8eddf)] placeholder:text-[var(--color\/text-tertiary,#9fa8a2)] outline-none focus:border-[var(--color\/accent,#f5cb5c)]" />
          </label>
          <label className="flex-1">
            <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium'] mb-1 block">Assignee</span>
            <input value={form.assignee} onChange={(e) => set("assignee", e.target.value)} placeholder="Name" className="w-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-lg px-3 py-2 text-[14px] text-[var(--color\/text-primary,#e8eddf)] placeholder:text-[var(--color\/text-tertiary,#9fa8a2)] outline-none focus:border-[var(--color\/accent,#f5cb5c)]" />
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-[7px] rounded-lg text-[13px] font-['Geist:Medium'] text-[var(--color\/text-secondary,#cfdbd5)] hover:bg-[var(--color\/surface,#333533)] cursor-pointer transition-colors">Cancel</button>
          <button onClick={() => { if (form.title.trim()) onCreate(form); }} className="px-4 py-[7px] rounded-lg text-[13px] font-['Geist:SemiBold'] bg-[var(--color\/accent,#f5cb5c)] text-[var(--color\/on-accent,#242423)] hover:brightness-110 cursor-pointer transition-colors">Create task</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Detail Panel ----------
function DetailPanel({ task, onClose, onUpdateStatus }) {
  if (!task) return null;
  return (
    <div className="w-[400px] shrink-0 border-l border-[var(--color\/border,#40403e)] bg-[var(--color\/canvas,#242423)] h-full overflow-y-auto">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color\/border,#40403e)]">
        <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium']">Task details</span>
        <button onClick={onClose} className="text-[var(--color\/text-tertiary,#9fa8a2)] hover:text-[var(--color\/text-primary,#e8eddf)] cursor-pointer text-[18px] leading-none">✕</button>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* title */}
        <input readOnly value={task.title} className="w-full bg-transparent text-[var(--color\/text-primary,#e8eddf)] text-[16px] font-['Geist:SemiBold'] outline-none border-b border-transparent focus:border-[var(--color\/border,#40403e)] pb-1" />

        {/* description */}
        <p className="text-[var(--color\/text-secondary,#cfdbd5)] text-[13px] font-['Geist:Regular'] leading-relaxed">{task.description}</p>

        {/* meta fields */}
        <div className="space-y-3">
          <MetaRow label="Status">
            <select value={task.status} onChange={(e) => onUpdateStatus(task.id, e.target.value)} className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-md px-2 py-1 text-[13px] text-[var(--color\/text-primary,#e8eddf)] outline-none cursor-pointer">
              {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </MetaRow>
          <MetaRow label="Priority"><PriorityBadge priority={task.priority} /></MetaRow>
          <MetaRow label="Due date"><span className="text-[var(--color\/text-primary,#e8eddf)] text-[13px] font-['Geist:Regular']">{task.due}</span></MetaRow>
          <MetaRow label="Assignee">
            <div className="flex items-center gap-2">
              <AvatarCircle name={task.assignee} />
              <span className="text-[var(--color\/text-primary,#e8eddf)] text-[13px]">{task.assignee}</span>
            </div>
          </MetaRow>
        </div>

        {/* linked contacts */}
        {task.contacts.length > 0 && (
          <div>
            <h4 className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[11px] font-['Geist:SemiBold'] uppercase tracking-wider mb-2">Linked Contacts</h4>
            <div className="space-y-1">
              {task.contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-[6px] rounded-md hover:bg-[var(--color\/surface,#333533)] transition-colors">
                  <span className="text-[14px]">👤</span>
                  <span className="text-[var(--color\/text-secondary,#cfdbd5)] text-[13px]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* activity */}
        <div>
          <h4 className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[11px] font-['Geist:SemiBold'] uppercase tracking-wider mb-2">Activity</h4>
          <div className="space-y-[6px]">
            {task.activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-[var(--color\/text-tertiary,#9fa8a2)] font-['Geist:Regular']">
                <span className="mt-[2px]">•</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, children }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Medium']">{label}</span>
      {children}
    </div>
  );
}

// ---------- Main Page ----------
export default function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = activeFilter === "all" ? tasks : tasks.filter((t) => t.status === activeFilter);
  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || null;

  const toggleDone = (id, e) => {
    e.stopPropagation();
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: t.status === "done" ? "to_do" : "done" } : t));
  };

  const handleCreate = (form) => {
    const newTask = { id: Date.now(), title: form.title, description: form.description || "No description.", priority: form.priority, due: form.due || "No date", assignee: form.assignee || "Me", status: "to_do", contacts: [], activity: ["Created just now"] };
    setTasks((prev) => [newTask, ...prev]);
    setShowCreateModal(false);
  };

  const handleUpdateStatus = (id, status) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color\/canvas,#242423)]">
      {/* Top bar */}
      <div className="bg-[var(--color\/canvas,#242423)] border-[var(--color\/border,#40403e)] border-b border-solid flex gap-[8px] items-center overflow-clip pl-[20px] pr-[18px] py-[12px] shrink-0 w-full">
        <h1 className="text-[var(--color\/text-primary,#e8eddf)] text-[16px] font-['Geist:SemiBold']">Tasks</h1>
        <div className="flex-1" />
        <button className="px-3 py-[6px] rounded-lg text-[13px] font-['Geist:Medium'] text-[var(--color\/text-secondary,#cfdbd5)] bg-[var(--color\/surface,#333533)] hover:bg-[var(--color\/surface-2,#3d3f3b)] cursor-pointer transition-colors flex items-center gap-1">
          <span className="text-[14px]">⚙</span> Filter
        </button>
        <button onClick={() => setShowCreateModal(true)} className="px-3 py-[6px] rounded-lg text-[13px] font-['Geist:SemiBold'] bg-[var(--color\/accent,#f5cb5c)] text-[var(--color\/on-accent,#242423)] hover:brightness-110 cursor-pointer transition-colors flex items-center gap-1">
          <span className="text-[15px]">＋</span> New task
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-5 py-2 border-b border-[var(--color\/border,#40403e)] shrink-0">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`px-3 py-[6px] rounded-md text-[13px] font-['Geist:Medium'] cursor-pointer transition-colors ${activeFilter === f.key ? "bg-[var(--color\/surface-2,#3d3f3b)] text-[var(--color\/text-primary,#e8eddf)]" : "text-[var(--color\/text-tertiary,#9fa8a2)] hover:text-[var(--color\/text-secondary,#cfdbd5)] hover:bg-[var(--color\/surface,#333533)]"}`}>
            {f.label}
          </button>
        ))}
        <span className="ml-2 self-center text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Regular']">{filtered.length} task{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Body: list + detail */}
      <div className="flex flex-1 overflow-hidden">
        {/* Task list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="flex items-center justify-center h-full text-[var(--color\/text-tertiary,#9fa8a2)] text-[14px] font-['Geist:Regular']">No tasks match this filter.</div>
          )}
          {filtered.map((task) => (
            <div key={task.id} onClick={() => setSelectedTaskId(task.id)} className={`${styles.taskRow} flex items-center gap-3 px-5 py-3 border-b border-[var(--color\/border,#40403e)] cursor-pointer ${selectedTaskId === task.id ? "bg-[var(--color\/surface,#333533)]" : "hover:bg-[var(--color\/surface,#333533)]/50"}`}>
              <CheckCircle checked={task.status === "done"} onClick={(e) => toggleDone(task.id, e)} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-[2px]">
                  <span className={`text-[14px] font-['Geist:Medium'] truncate ${task.status === "done" ? "line-through text-[var(--color\/text-tertiary,#9fa8a2)]" : "text-[var(--color\/text-primary,#e8eddf)]"}`}>{task.title}</span>
                </div>
                <p className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Regular'] truncate max-w-[400px]">{task.description}</p>
              </div>

              <PriorityBadge priority={task.priority} />

              <span className="text-[var(--color\/text-tertiary,#9fa8a2)] text-[12px] font-['Geist:Regular'] whitespace-nowrap w-[60px] text-right">{task.due}</span>

              <AvatarCircle name={task.assignee} />

              <StatusDot status={task.status} />
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selectedTask && <DetailPanel task={selectedTask} onClose={() => setSelectedTaskId(null)} onUpdateStatus={handleUpdateStatus} />}
      </div>

      {/* Create modal */}
      {showCreateModal && <CreateTaskModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />}
    </div>
  );
}
