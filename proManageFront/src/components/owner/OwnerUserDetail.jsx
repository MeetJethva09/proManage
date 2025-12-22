import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OwnerUserDetail() {
  const navigate = useNavigate()
  const id = useParams().id;
  const [user , setUser] = useState({});

  const getUser = async () =>{
    const res = await axios.get("/user/getbyid/"+id);
    setUser(res.data.data);
  }

  useEffect(()=>{
    getUser()
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
            <Link to={`/navo/modify-role/${user._id}`} className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 transition">
              Change Role
            </Link>
            <Link to={`/navo/assign-task/${user._id}`} className="px-4 py-2 text-sm rounded-md border hover:bg-slate-100 transition">
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
              <span className="font-medium">{user.createdAt}</span>
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
              <span className="font-medium">14</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Completed Tasks</span>
              <span className="font-medium">9</span>
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

    </main>
  );
}
