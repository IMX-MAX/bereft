"use client";

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[500px]">
      <div>
        <h1 className="font-['Geist:SemiBold'] font-semibold text-[24px] text-[#e8eddf] mb-[4px]">Profile</h1>
        <p className="font-['Geist:Regular'] font-normal text-[14px] text-[#9fa8a2]">Manage your personal information and preferences.</p>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Photo */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Profile Photo</label>
          <div className="flex items-center gap-[20px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] flex items-center justify-center text-[28px] font-['Geist:Medium'] font-medium text-[#e8eddf] shadow-sm">
              B
            </div>
            <div className="flex gap-[12px]">
              <button className="bg-[var(--color\/surface-2,#3d3f3b)] hover:bg-[rgba(255,255,255,0.08)] transition-colors border border-[var(--color\/border,#40403e)] rounded-[8px] px-[16px] py-[8px] text-[13px] font-['Geist:Medium'] font-medium text-[#e8eddf]">
                Upload new
              </button>
              <button className="text-[13px] font-['Geist:Medium'] font-medium text-[#9fa8a2] hover:text-[#e8eddf] transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[var(--color\/border,#40403e)] w-full my-[4px]" />

        {/* Name */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Name</label>
          <input 
            type="text" 
            defaultValue="Brett" 
            className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] w-full outline-none focus:border-[#cfdbd5] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Email</label>
          <input 
            type="email" 
            defaultValue="brett@bereft.ai" 
            readOnly
            className="bg-[var(--color\/surface,#333533)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#9fa8a2] w-full outline-none cursor-not-allowed"
          />
        </div>

        <div className="h-[1px] bg-[var(--color\/border,#40403e)] w-full my-[4px]" />

        {/* Timezone */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Timezone</label>
          <select className="bg-[var(--color\/canvas,#242423)] border border-[var(--color\/border,#40403e)] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#e8eddf] w-full outline-none focus:border-[#cfdbd5] transition-colors appearance-none">
            <option>Eastern Time (UTC-5)</option>
            <option>Pacific Time (UTC-8)</option>
            <option>Central Time (UTC-6)</option>
            <option>London (UTC+0)</option>
          </select>
        </div>

        {/* Start of Week */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['Geist:Medium'] font-medium text-[13px] text-[#cfdbd5]">Start of Week</label>
          <div className="flex gap-[12px]">
            <label className="flex items-center gap-[8px] cursor-pointer group">
              <div className="w-[18px] h-[18px] rounded-full border border-[#f5cb5c] flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-[#f5cb5c]" />
              </div>
              <span className="text-[14px] text-[#e8eddf]">Monday</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer group">
              <div className="w-[18px] h-[18px] rounded-full border border-[var(--color\/border,#40403e)] flex items-center justify-center group-hover:border-[#9fa8a2] transition-colors">
              </div>
              <span className="text-[14px] text-[#cfdbd5] group-hover:text-[#e8eddf] transition-colors">Sunday</span>
            </label>
          </div>
        </div>

      </div>

      <div className="pt-[16px]">
        <button className="bg-[var(--color\/accent,#f5cb5c)] hover:bg-[#e3c456] transition-colors text-[var(--color\/on-accent,#242423)] font-['Geist:SemiBold'] font-semibold text-[13px] px-[16px] py-[10px] rounded-[8px]">
          Save changes
        </button>
      </div>

    </div>
  );
}
