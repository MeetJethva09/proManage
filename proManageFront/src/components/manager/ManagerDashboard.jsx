import { useEffect, useState } from "react";
import axios from 'axios'


export default function ManagerDashboard() {
  const [recentTask, setRecentTask] = useState([])
  const [managerProject, setManagerProject] = useState({})
  
  const id = localStorage.getItem("id")
  const getDashboardData = async ()=>{
      const [recentTaskRes , managerProjectRes] = await Promise.all([axios.get("/task/gettaskbyid/"+id),
                                                                     axios.get("/project/manager-project/"+id)
      ])
      setRecentTask(recentTaskRes.data.data);
      setManagerProject(managerProjectRes.data.data);
      console.log(managerProjectRes.data.data)
  } 
useEffect(()=>{
    getDashboardData()
},[])

  return (
    <main className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Top Execution Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Projects", value : '1' },
          { label: "Tasks", value: "soon" },
          { label: "Team Members", value: "9" },
          { label: "Due This Week", value: "12" },
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

      {/* Workload + Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Team Progress Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <p className="font-medium mb-1">Team Task Progress</p>
          <p className="text-sm text-slate-500 mb-4">
            Completion trend (last 6 weeks)
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
                d="M 0 36 C 20 34, 40 28, 60 24 S 100 18, 120 14"
                fill="none"
                stroke="#0f172a"
                strokeWidth="1.6"
              />

              <circle cx="120" cy="14" r="2" fill="#0f172a" />
            </svg>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="bg-white p-6 rounded-lg border">
          <p className="font-medium mb-4">Recent Tasks</p>

          <div className="space-y-3 text-sm">
            {recentTask.map((task, i) => {
              return (
              <div
                key={i}
                className="p-3 border rounded hover:bg-slate-50"
              >
                {task.taskTitle}
              </div>
                )})}
          </div>
        </div>
      </section>

      {/* Projects & Team */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Projects */}
        <div className="bg-white p-6 rounded-lg border">
          <p className="font-medium mb-4">Active Projects</p>

          <div className="space-y-2 text-sm">
           
          
              <div
                
                className="flex justify-between items-center p-3 border rounded hover:bg-slate-50"
              >
                <span>{managerProject.projectName}</span>
                <span className="text-xs border px-2 py-0.5 rounded">
                  {managerProject.projectDesc}
                </span>
              </div>
          
          </div>
        </div>

        {/* Team */}
        <div className="bg-white p-6 rounded-lg border">
          <p className="font-medium mb-4">Team Members</p>

          <div className="space-y-3 text-sm">
            {[
              ["Aman Patel", "Backend"],
              ["Riya Shah", "Frontend"],
              ["Kunal Mehta", "QA"],
            ].map(([name, role], i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border rounded hover:bg-slate-50"
              >
                <span>{name}</span>
                <span className="text-xs text-slate-500">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
