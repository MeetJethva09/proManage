import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MemberDetail() {
  const navigate = useNavigate()
  const id = useParams().id;
  const [user , setUser] = useState({});
  const [userTasks , setUserTasks] = useState([])

  const getDashboardData = async () =>{
    const [userRes,userTasksRes] = await Promise.all([await axios.get("/user/getbyid/"+id),
                                                            axios.get("/task/getallusertask/"+id),                                     
    ])
    setUser(userRes.data.data);
    setUserTasks(userTasksRes.data.data)
  }

   async function deleteTaskAction(id , status){
    try{
      if(status === "Pending"){
         await axios.delete("/task/deletetask/"+id);
         getDashboardData()
      } else {
        alert("Task not deleted..")
      }
    } catch(err) {console.log("Error occured while delete task..",err)}
    }

  useEffect(()=>{
    getDashboardData()
  },[])

  return (
    <main className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            User Details
          </h2>
          <p className="text-sm text-slate-500">
            View and manage user information
          </p>
        </div>

        <button onClick={()=> navigate(-1)} className="text-sm px-4 py-2 rounded-md border hover:bg-slate-100 transition"> 
          Back
        </button>
      </div>

      {/* User Profile Card */}
      <section className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-semibold">
            <img src="/src/assets/user.png" alt="" height={30} width={30}/>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800">
              {user.username}
            </h3>
            <p className="text-sm text-slate-500">
              {user.email}
            </p>

            <div className="flex gap-3 mt-3">
              <span className="px-3 py-1 text-xs rounded border">
                {user.role}
              </span>
              <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
                Active
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* <Link to={`/navo/modify-role/${user._id}`} className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 transition">
              Change Role
            </Link> */}
            <Link to={`/navm/manager-task-assign/${user._id}`} className="px-4 py-2 text-sm rounded-md border hover:bg-slate-100 transition">
              Assign Task
            </Link>
          </div>

        </div>
      </section>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Personal Info */}
        <div className="bg-white rounded-lg border p-5">
          <h4 className="font-medium mb-4 text-slate-700">
            Personal Information
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Username</span>
              <span className="font-medium">{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile</span>
              <span className="font-medium">{user.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Age</span>
              <span className="font-medium">{user.age}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Joined On</span>
              <span className="font-medium">{new Date(user.createdAt).toDateString()}</span>
            </div>
          </div>
        </div>

        {/* Workspace Info */}
        <div className="bg-white rounded-lg border p-5">
          <h4 className="font-medium mb-4 text-slate-700">
            Workspace Information
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Workspace</span>
              <span className="font-medium">Backend Core</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Role</span>
              <span className="font-medium">Member</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tasks Assigned</span>
              <span className="font-medium">{userTasks.length<=0?0:userTasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Completed Tasks</span>
              <span className="font-medium">{userTasks.filter(t=>t.status=='Complete').length}</span>
            </div>
          </div>
        </div>

      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-lg border p-5">
        <h4 className="font-medium mb-4 text-slate-700">
          Recent Activity
        </h4>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Completed task “JWT Auth Flow”</span>
            <span className="text-slate-500">2 days ago</span>
          </div>
          <div className="flex justify-between">
            <span>Assigned new task “RBAC Setup”</span>
            <span className="text-slate-500">5 days ago</span>
          </div>
          <div className="flex justify-between">
            <span>Joined workspace</span>
            <span className="text-slate-500">1 week ago</span>
          </div>
        </div>
      </section>
               <section className="max-w-5xl mx-auto p-6">

      

      {/* Task Table */}
      <div className="bg-white border rounded-lg overflow-hidden">

        <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          <div className="col-span-4">Task</div>
          <div className="col-span-3">Due Date</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {userTasks.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No tasks assigned yet
          </div>
        ) : (
          userTasks.map(task => (
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
                <button onClick={()=> deleteTaskAction(task._id , task.status)} className="text-indigo-600 hover:underline text-xs">
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
      

    </main>
  );
}
