import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function OwnerDashboard() {
   const [user , setUser] = useState([]);
   const [recentUsers , setRecentUsers] = useState([]);
   const [workspace , setWorkspace] = useState([])
   const [limitWorkspace , setLimitWorkspace] = useState([])
    const getAllUser = async () =>{
      const res = await axios.get("/user/getallusers");
      const res2 = await axios.get("/user/recentuser");
      const workspaces = await axios.get("/workspace/allworkspaces");
      const workspacesLimit = await axios.get("/workspace/limitworkspace");
      setUser(res.data.data);
      setRecentUsers(res2.data.data);
      setWorkspace(workspaces.data.data);
      setLimitWorkspace(workspacesLimit.data.data);
    }

  useEffect(()=>{
      getAllUser()
  },[])

  return (

    <>
    <main className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Top Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value :  user.length},
          { label: "Active Workspaces", value: workspace.length },
          { label: "Projects", value: "42" },
          { label: "Monthly Growth", value: "+18%" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg border"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-semibold mt-1">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <p className="font-medium mb-1">Platform Analytics</p>
          <p className="text-sm text-slate-500 mb-4">
            User activity overview
          </p>

          <div className="h-48">
            <svg
              viewBox="0 0 120 50"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {[10, 20, 30, 40].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="120"
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="0.4"
                />
              ))}

              <path
                d="M 0 38 C 20 30, 40 26, 60 20 S 100 14, 120 18"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="1.6"
              />

              <circle cx="120" cy="18" r="2" fill="#4f46e5" />
            </svg>
          </div>
        </div>

        {/* System Summary */}
        <div className="bg-white p-6 rounded-lg border space-y-4">
          <p className="font-medium">System Summary</p>

          {[
            ["Pending Invites", "4"],
            ["Managers", user.filter(u => u.role === 'Manager').length],
            ["Members", user.filter(u => u.role === 'Member').length],
            ["Storage Used", "62%"],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Workspaces & Users */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Workspaces */}
        <div className="bg-white p-6 rounded-lg border">
          <p className="font-medium mb-4">Workspaces</p>

          <div className="space-y-3 text-sm">
            {limitWorkspace.map((w, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded border hover:bg-slate-50"
              >
                <span>{w.workspaceName}</span>
                <span className="text-xs text-slate-500">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-lg border">
          <p className="font-medium mb-4">Recent Users</p>

          <div className="space-y-3 text-sm">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded border hover:bg-slate-50"
              >
                <span>{user.username}</span>
                <span className="text-xs border px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    
    </>
  );
}
