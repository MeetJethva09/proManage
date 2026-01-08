import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export const Dashboard = () => {
    const [tasks , setTasks] = useState([]);
    const [workspaces , setWorkspaces] = useState([])
    const [recentTasks , setRecentTasks] = useState([])
    const [activeWorkspace, setActiveWorkspace] = useState(
    localStorage.getItem("activeWorkspaceId")
    );

    const getDashboardData = async () =>{
      const [userTaskRes,workspaceRes,recentTaskRes] = await Promise.all([await axios.get("/task/getallusertask/"+localStorage.getItem("id")),
                                                                                axios.get("/workspace/workspacebyuid/"+localStorage.getItem("id")),
                                                                                axios.get("/task/gettaskbyid/"+localStorage.getItem("id"))                       
      ])        
      setTasks(userTaskRes.data.data)
      setWorkspaces(workspaceRes.data.data)
      setRecentTasks(recentTaskRes.data.data)
    }
    

  useEffect(()=>{
      getDashboardData()
  },[])

  return (
    <div>
      {/* Workspace Selector */}
<section className="bg-white border rounded-lg p-4 mb-6">
  <p className="text-sm font-medium text-slate-700 mb-3">
    Select Workspace
  </p>

  <div className="flex flex-wrap gap-3">
    {workspaces.length <=0 ? <p className='text-sm text-red-500'>No workspace Assigned yet..</p> : workspaces.map((ws) => (
      <button
        key={ws._id}
        onClick={() => {
          localStorage.setItem("activeWorkspaceId", ws._id);
          setActiveWorkspace(ws._id);
        }}
        className={`px-4 py-2 text-sm rounded-md border transition
          ${
            activeWorkspace === ws._id
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
      >
        {ws.workspaceName}
      </button>
    ))}
  </div>
</section>

        
                 <main className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* My Tasks Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Assigned Tasks", value : tasks.length },
          { label: "Completed Tasks", value: tasks.filter(task=>task.status === 'Complete').length },
          { label: "Pending Tasks", value: tasks.filter(task=>task.status === 'Pending').length},
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

      {/* Activity Chart */}
      <section className="bg-white p-6 rounded-lg border">
        <p className="font-medium mb-1">Task Completion Trend</p>
        <p className="text-sm text-slate-500 mb-4">
          Last 6 weeks progress
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
              d="M 0 36 C 20 32, 40 28, 60 24 S 100 20, 120 18"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="1.6"
            />

            <circle cx="120" cy="18" r="2" fill="#4f46e5" />
          </svg>
        </div>
      </section>

      {/* Recent Tasks */}
      <section className="bg-white p-6 rounded-lg border">
        <p className="font-medium mb-4">Recent Tasks</p>

        <div className="space-y-3 text-sm">
          {   recentTasks.length > 0  ? recentTasks.map((task, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3 border rounded hover:bg-slate-50"
            >
              <span>{task.taskTitle}</span>
              <span className="text-xs border px-2 py-0.5 rounded">
                {task.status}
              </span>
            </div>
          )) : "You don't Have task Yet.."}
        </div>
      </section>

    </main>

       </div>
  )
}
