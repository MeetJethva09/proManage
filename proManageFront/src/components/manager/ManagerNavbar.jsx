import { Outlet } from "react-router-dom";

export default function ManagerNavbar() {
  return (
    <>
    <header className="w-full h-14 bg-white border-b flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold">ProManage</h1>

        <nav className="hidden md:flex gap-4 text-sm text-slate-600">
          <span className="cursor-pointer hover:text-slate-900">
            Dashboard
          </span>
          <span className="cursor-pointer hover:text-slate-900">
            Projects
          </span>
          <span className="cursor-pointer hover:text-slate-900">
            Tasks
          </span>
          <span className="cursor-pointer hover:text-slate-900">
            Team
          </span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 text-sm">

        {/* Workspace */}
        <div className="hidden sm:flex flex-col leading-tight text-right">
          <span className="text-xs text-slate-500">Workspace</span>
          <span className="font-medium">Backend Core</span>
        </div>

        {/* Role */}
        <span className="px-3 py-1 text-xs rounded border text-slate-700">
          Manager
        </span>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
            MJ
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-medium">Meet Jethva</span>
            <span className="text-xs text-slate-500">
              manager@email.com
            </span>
          </div>
        </div>

      </div>
    </header>

    <Outlet/>
    </>
  );
}
