"use client";
import { useState } from "react";

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("sans");
  const [heading, setHeading] = useState("default");
  const [corners, setCorners] = useState("rounded");
  const [icons, setIcons] = useState("default");

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[500px]">
      <div>
        <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf] mb-[4px]">Appearance</h1>
        <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2]">Customize how the app looks and feels on this device.</p>
      </div>

      <div className="flex flex-col gap-[32px]">
        {/* Theme */}
        <div className="flex flex-col gap-[12px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Theme</label>
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Light */}
            <div 
              onClick={() => setTheme("light")}
              className={`cursor-pointer rounded-[12px] border-[2px] overflow-hidden ${theme === 'light' ? 'border-[#f5cb5c]' : 'border-[var(--color\/border,#40403e)] hover:border-[#9fa8a2]'} transition-colors`}
            >
              <div className="h-[80px] bg-white border-b border-[#e5e7eb] p-[12px] flex flex-col gap-[8px]">
                <div className="w-[60%] h-[8px] bg-[#f3f4f6] rounded-[4px]" />
                <div className="w-[40%] h-[8px] bg-[#f3f4f6] rounded-[4px]" />
                <div className="w-[80%] h-[8px] bg-[#f3f4f6] rounded-[4px]" />
              </div>
              <div className="bg-[var(--color\/canvas,#242423)] p-[10px] text-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#cfdbd5]">Light</span>
              </div>
            </div>

            {/* Dark */}
            <div 
              onClick={() => setTheme("dark")}
              className={`cursor-pointer rounded-[12px] border-[2px] overflow-hidden ${theme === 'dark' ? 'border-[#f5cb5c]' : 'border-[var(--color\/border,#40403e)] hover:border-[#9fa8a2]'} transition-colors`}
            >
              <div className="h-[80px] bg-[#242423] border-b border-[#40403e] p-[12px] flex flex-col gap-[8px]">
                <div className="w-[60%] h-[8px] bg-[#333533] rounded-[4px]" />
                <div className="w-[40%] h-[8px] bg-[#333533] rounded-[4px]" />
                <div className="w-[80%] h-[8px] bg-[#333533] rounded-[4px]" />
              </div>
              <div className="bg-[var(--color\/canvas,#242423)] p-[10px] text-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">Dark</span>
              </div>
            </div>

            {/* System */}
            <div 
              onClick={() => setTheme("system")}
              className={`cursor-pointer rounded-[12px] border-[2px] overflow-hidden ${theme === 'system' ? 'border-[#f5cb5c]' : 'border-[var(--color\/border,#40403e)] hover:border-[#9fa8a2]'} transition-colors`}
            >
              <div className="h-[80px] flex">
                <div className="flex-1 bg-white border-b border-r border-[#e5e7eb]" />
                <div className="flex-1 bg-[#242423] border-b border-[#40403e]" />
              </div>
              <div className="bg-[var(--color\/canvas,#242423)] p-[10px] text-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#cfdbd5]">System</span>
              </div>
            </div>

            {/* Hacker */}
            <div 
              onClick={() => setTheme("hacker")}
              className={`cursor-pointer rounded-[12px] border-[2px] overflow-hidden ${theme === 'hacker' ? 'border-[#f5cb5c]' : 'border-[var(--color\/border,#40403e)] hover:border-[#9fa8a2]'} transition-colors`}
            >
              <div className="h-[80px] bg-[#000000] border-b border-[#111111] p-[12px] flex flex-col gap-[8px]">
                <div className="w-[60%] h-[8px] bg-[#00ff00] opacity-30 rounded-[4px]" />
                <div className="w-[40%] h-[8px] bg-[#00ff00] opacity-30 rounded-[4px]" />
                <div className="w-[80%] h-[8px] bg-[#00ff00] opacity-30 rounded-[4px]" />
              </div>
              <div className="bg-[var(--color\/canvas,#242423)] p-[10px] text-center">
                <span className="text-[13px] font-['Geist:Medium'] font-medium text-[#cfdbd5]">Hacker</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[var(--color\/border,#40403e)] w-full my-[4px]" />

        {/* Font */}
        <div className="flex flex-col gap-[12px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Interface Font</label>
          <div className="flex bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] p-[4px]">
            <button 
              onClick={() => setFont("sans")}
              className={`flex-1 py-[8px] rounded-[6px] text-[13px] transition-colors ${font === 'sans' ? 'bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] font-['Geist:Medium'] font-medium shadow-sm' : 'text-[#9fa8a2] hover:text-[#e8eddf]'}`}
            >
              Sans Serif (Inter)
            </button>
            <button 
              onClick={() => setFont("mono")}
              className={`flex-1 py-[8px] rounded-[6px] text-[13px] transition-colors font-mono ${font === 'mono' ? 'bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] font-medium shadow-sm' : 'text-[#9fa8a2] hover:text-[#e8eddf]'}`}
            >
              Monospace
            </button>
          </div>
        </div>

        {/* Corners */}
        <div className="flex flex-col gap-[12px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Corners</label>
          <div className="flex bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] p-[4px]">
            <button 
              onClick={() => setCorners("rounded")}
              className={`flex-1 py-[8px] rounded-[6px] text-[13px] transition-colors ${corners === 'rounded' ? 'bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] font-['Geist:Medium'] font-medium shadow-sm' : 'text-[#9fa8a2] hover:text-[#e8eddf]'}`}
            >
              Rounded
            </button>
            <button 
              onClick={() => setCorners("sharp")}
              className={`flex-1 py-[8px] rounded-[6px] text-[13px] transition-colors ${corners === 'sharp' ? 'bg-[var(--color\/surface-2,#3d3f3b)] text-[#e8eddf] font-['Geist:Medium'] font-medium shadow-sm' : 'text-[#9fa8a2] hover:text-[#e8eddf]'}`}
            >
              Sharp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
