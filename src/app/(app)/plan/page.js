"use client";
import { useState } from "react";

export default function PlanPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, currentEvents: [] }) // We can pull actual events if needed
      });
      const data = await res.json();
      if (data.events) {
        setResponse(data.events);
        setPrompt("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-10 bg-white w-full h-full font-['Inter',sans-serif] overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#333] mb-6">AI Planner</h1>
        <p className="text-[#666] mb-8 text-sm">Describe how you want to plan your day, and the AI will draft calendar events for you.</p>
        
        <form onSubmit={handleAskAI} className="relative mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Schedule a team standup at 10am for 30 minutes, then 2 hours of focus time..."
            className="w-full text-sm bg-[#fdfdfd] border border-[#e5e5e5] rounded-xl p-4 pb-12 outline-none focus:border-[#ccc] shadow-sm resize-none h-[150px] text-[#333]"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-4 right-4 bg-white border border-[#e5e5e5] text-[#333] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#f9f9f9] disabled:opacity-50 shadow-sm transition-colors"
          >
            {loading ? "Drafting..." : "Draft Plan"}
          </button>
        </form>

        {response && (
          <div className="bg-[#fdfdfd] border border-[#e5e5e5] rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#333] mb-4">Drafted Events</h2>
            <div className="space-y-3">
              {response.map((ev, i) => (
                <div key={i} className="flex justify-between items-center bg-white border border-[#eee] p-3 rounded-lg">
                  <div>
                    <div className="font-medium text-[#333] text-sm">{ev.title}</div>
                    <div className="text-xs text-[#999] mt-1">{new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleTimeString()}</div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-[#f0f0f0] text-[#666] rounded-md">{ev.type}</div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-[#333] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#444] transition-colors">
              Add to Calendar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
