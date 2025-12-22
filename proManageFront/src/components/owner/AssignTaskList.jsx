import { useEffect, useState } from "react";
import axios from 'axios'

export default function AssignTaskList() {
    const [tasks , setTasks] = useState([]);

    const getTasks = async () =>{
      const res = await axios.get("/task/alltask");
      setTasks(res.data.data);
    }

    useEffect(()=>{
      getTasks()
    },[])

  return (
    <section className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Assigned Tasks</h2>

        <span className="text-sm text-slate-500">
          Showing all assigned tasks
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">

        {/* Table Head */}
        <div className="grid grid-cols-11 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          <div className="col-span-3">Task</div>
          <div className="col-span-2">Assigned To</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Due Date</div>
          
        </div>

        {/* Row */}
        {tasks.map((task,i) => (
          <div
            key={i}
            className="grid grid-cols-11 px-4 py-4 border-t text-sm items-center hover:bg-slate-50 transition"
          >
            {/* Task Info */}
            <div className="col-span-3">
              <p className="font-medium">{task.taskTitle}</p>
              <p className="text-xs text-slate-500 truncate">
                {task.taskDesc}
              </p>
            </div>

            {/* Assigned User */}
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                {task.assignedTo?.username[0]}
              </div>
              <span>{task.assignedTo?.username}</span>
            </div>

            {/* Priority */}
                 <div className="col-span-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-yellow-700">
                {task.priority}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-yellow-700">
                {task.status}
              </span>
            </div>

            {/* Due Date */}
            <div className="col-span-2 text-slate-600">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>

          
          </div>
        ))}
        
      </div>
    </section>
  );
}
