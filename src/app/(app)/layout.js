import Sidebar from "../../components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="bg-[#242423] content-stretch flex items-start relative h-screen w-full">
      <Sidebar />
      <div className="bg-[#242423] content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-clip relative">
        {children}
      </div>
    </div>
  );
}
