import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function MemberTaskList() {
    const id = useParams().id;
    const [tasks , setTasks] = useState([]);
    
    const getUserTasks = async () =>{
        const res = await axios.get("/task/gettaskbyid/"+id);
        setTasks(res.data.data);
    }

useEffect(()=>{
    getUserTasks()
},[])

  return (
    <section className="max-w-5xl mx-auto p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Tasks</h2>

        <span className="text-sm text-slate-500">
          Total: {tasks.length}
        </span>
      </div>

      {/* Task Table */}
      <div className="bg-white border rounded-lg overflow-hidden">

        <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          <div className="col-span-4">Task</div>
          <div className="col-span-3">Due Date</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {tasks.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No tasks assigned yet
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task._id}
              className="grid grid-cols-12 px-4 py-4 border-t text-sm items-center hover:bg-slate-50 transition"
            >
              {/* Task Title */}
              <div className="col-span-4">
                <p className="font-medium">{task.taskTitle}</p>
                <p className="text-xs text-slate-500 truncate">
                  {task.taskDesc}
                </p>
              </div>

              {/* Due Date */}
              <div className="col-span-3 text-slate-600">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>

              {/* Priority */}
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${task.priority === 'High' && 'bg-red-100 text-red-700'}
                  ${task.priority === 'Medium' && 'bg-yellow-100 text-yellow-700'}
                  ${task.priority === 'Low' && 'bg-green-100 text-green-700'}
                `}>
                  {task.priority}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${task.status === 'Completed' && 'bg-green-100 text-green-700'}
                  ${task.status === 'Pending' && 'bg-slate-100 text-slate-700'}
                `}>
                  {task.status}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 text-right">
                <Link to={`/nav/taskdetail/${task._id}`} className="text-indigo-600 hover:underline text-xs">
                  View
                </Link>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}
