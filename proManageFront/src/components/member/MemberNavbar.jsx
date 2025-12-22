import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MemberNavbar() {
  const navigate = useNavigate();
  const [user , setUser] = useState({})

  const getData = async () =>{
    const res = await axios.get("/user/getbyid/" + localStorage.getItem('id'))
    setUser(res.data.data);
  }


useEffect(()=>{
  getData() 
} , []);

    const logoutAction = async () =>{
      localStorage.clear();
      try{
          const res = await axios.get("/user/logout" , {withCredentials:true});
          navigate("/login")
      }
      catch(err)
      {
        console.log("Error occured while logouot..")
      }
    }

  return (
    <>
    <header className="w-full h-14 bg-white border-b flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold">ProManage</h1>

        <nav className="hidden md:flex gap-4 text-sm text-slate-600">
          <Link to={`/nav/user-dashboard`} className="cursor-pointer hover:text-slate-900">
            Overview
          </Link>

          <Link to={`/nav/tasks/${user._id}`} className="cursor-pointer hover:text-slate-900">
            My Tasks
          </Link>
          <span className="cursor-pointer hover:text-slate-900">
            Activity
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

        {/* User */}
        <div className="flex items-center gap-3 ">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
            <img src="/src/assets/user.png" alt="no" height={20} width={20}/>
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-slate-500">
              {user.email}
            </span>
          </div>
        </div>
        <button onClick={()=>logoutAction()} className="bg-red-200 p-1 rounded border text-1xl">
          Logout
        </button>

      </div>
    </header>
    <Outlet/>
    </>
  );
}
