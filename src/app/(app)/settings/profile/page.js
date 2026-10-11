"use client";

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[500px] font-['Inter',sans-serif]">
      <div>
        <h1 className="font-semibold text-[24px] text-[#333] mb-[4px]">Profile</h1>
        <p className="font-normal text-[14px] text-[#666]">Manage your personal information and preferences.</p>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Photo */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-[13px] text-[#333]">Profile Photo</label>
          <div className="flex items-center gap-[20px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#f3f4f6] border border-[#e5e5e5] flex items-center justify-center text-[28px] font-medium text-[#666] shadow-sm">
              B
            </div>
            <div className="flex gap-[12px]">
              <button className="bg-white hover:bg-[#f9f9f9] transition-colors border border-[#e5e5e5] rounded-[8px] px-[16px] py-[8px] text-[13px] font-medium text-[#333] shadow-sm">
                Upload new
              </button>
              <button className="text-[13px] font-medium text-[#999] hover:text-[#f43f5e] transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#ececec] w-full my-[4px]" />

        {/* Name */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-[13px] text-[#333]">Name</label>
          <input 
            type="text" 
            defaultValue="Brett" 
            className="bg-white border border-[#e5e5e5] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#333] w-full outline-none focus:border-[#ccc] shadow-sm transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-[13px] text-[#333]">Email</label>
          <input 
            type="email" 
            defaultValue="brett@bereft.ai" 
            readOnly
            className="bg-[#f9f9f9] border border-[#ececec] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#999] w-full outline-none cursor-not-allowed shadow-sm"
          />
        </div>

        <div className="h-[1px] bg-[#ececec] w-full my-[4px]" />

        {/* Timezone */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-[13px] text-[#333]">Timezone</label>
          <select className="bg-white border border-[#e5e5e5] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#333] w-full outline-none focus:border-[#ccc] shadow-sm transition-colors appearance-none">
            <option>Eastern Time (UTC-5)</option>
            <option>Pacific Time (UTC-8)</option>
            <option>Central Time (UTC-6)</option>
            <option>London (UTC+0)</option>
          </select>
        </div>

        {/* Start of Week */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-[13px] text-[#333]">Start of Week</label>
          <div className="flex gap-[12px]">
            <label className="flex items-center gap-[8px] cursor-pointer group">
              <div className="w-[18px] h-[18px] rounded-full border border-[#f5cb5c] flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-[#f5cb5c]" />
              </div>
              <span className="text-[14px] text-[#333]">Monday</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer group">
              <div className="w-[18px] h-[18px] rounded-full border border-[#e5e5e5] flex items-center justify-center group-hover:border-[#ccc] transition-colors">
              </div>
              <span className="text-[14px] text-[#666] group-hover:text-[#333] transition-colors">Sunday</span>
            </label>
          </div>
        </div>

      </div>

      <div className="pt-[16px]">
        <button className="bg-[#333] hover:bg-[#444] shadow-sm transition-colors text-white font-medium text-[13px] px-[16px] py-[10px] rounded-[8px]">
          Save changes
        </button>
      </div>

    </div>
  );
}
