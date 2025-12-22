import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function OwnerUsersDashboard() {
  const [user , setUsers] = useState([]);

  const getAllUsers =async  () =>{
    try{
      const res = await axios.get("/user/getallusers");
      setUsers(res.data.data);
    }
    catch(err)
    {
      console.info("Error occured while fetch users",err);
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])


  return (
    <>
        <main className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Workspace Users
          </h2>
          <p className="text-sm text-slate-500">
            Manage members and managers in your workspace
          </p>
        </div>

        <button className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 transition">
          + Add User
        </button>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-slate-500">Total Users</p>
          <p className="text-2xl font-semibold">{user.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">  
          <p className="text-xs text-slate-500">Managers</p>
          <p className="text-2xl font-semibold">{user.filter(u=>u.role==='Manager').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-slate-500">Members</p>
          <p className="text-2xl font-semibold">{user.filter(u=>u.role==='Member').length}</p>
        </div>
      </section>

      {/* Users Table */}
      <section className="bg-white rounded-lg border overflow-hidden">

        {/* Table Head */}
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-slate-500 border-b bg-slate-50">
          <div className="col-span-4">User</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Mobile</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Row */}
        {user.map((user, i) => (
          <div
            key={i}
            className="grid grid-cols-12 px-4 py-3 text-sm border-b hover:bg-slate-50 transition"
          >
            {/* User */}
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                {user.username[0].toUpperCase()}
              </div>
              <span className="font-medium text-slate-700">
                {user.username}
              </span>
            </div>

            {/* Email */}
            <div className="col-span-3 text-slate-600">
              {user.email}
            </div>

            {/* Role */}
            <div className="col-span-2">
              {
                user.role === 'Member' ? 
              (<span className="px-2 py-1 text-xs rounded border text-slate-700 bg-yellow-100">{user.role}</span>) 
               : user.role === 'Owner' ? ( <span className="px-2 py-1 text-xs rounded border text-slate-700 bg-blue-100">{user.role}</span> )
               :  (<span className="px-2 py-1 text-xs rounded border text-slate-700 bg-green-100">{user.role}</span>)
              }
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span
                className={`px-2 py-1 text-xs rounded ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.mobile}
              </span>
            </div>

            {/* Action */}
            <div className="col-span-1 text-right">
              <Link to={`/navo/user/${user._id}`}className="text-xs text-slate-500 hover:text-slate-900">
                View
              </Link>
            </div>
          </div>
        ))}
      </section>

    </main>
    <Outlet/>
    </>
  );
}
