import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function OwnerNavbar() {
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const getData = async () =>{
      const res = await axios.get("/user/getbyid/" + localStorage.getItem('id'))
      setUser(res.data.data);
    }

     const logoutAction = async () =>{
          localStorage.clear();
          try{
              const res = await axios.get("/user/logout" , {withCredentials:true});
              navigate("/login")
          }
          catch(err)
          {
            console.log("Error occured while logouot..",err)
          }
        }
        
useEffect(()=>{
  getData()
},[])

  return (
    <>
    <header className="w-full h-14 bg-white border-b flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold">ProManage</h1>

        <nav className="hidden md:flex gap-4 text-sm text-slate-600">
          <Link to={'/navo/owner-dashboard'} className="cursor-pointer hover:text-slate-900">
            Overview
          </Link>
          <Link to={'/navo/all-users'} className="cursor-pointer hover:text-slate-900">
            Users
          </Link>
          <Link to={'/navo/task-list'} className="cursor-pointer hover:text-slate-900">
            Tasks
          </Link>
          <Link to={'/navo/work-list'} className="cursor-pointer hover:text-slate-900">
            Workspaces
          </Link>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-8 text-sm">

        {/* Workspace */}
        <div className="hidden sm:flex flex-col leading-tight text-right">
          <span className="text-xs text-slate-500">Workspace</span>
          <span className="font-medium">ProManage Org</span>
        </div>

        {/* Role */}
        <span className="px-3 py-1 text-xs rounded border text-slate-700">
          Owner
        </span>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
            <img src="/src/assets/user.png" alt="" height={10} width={10}/>
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-slate-500">
              {user.email}
            </span>
          </div>

           <button onClick={()=>logoutAction()} className="bg-red-200 p-1 rounded border text-1xl">
          Logout
           </button>

        </div>

      </div>
      
    </header>
    
    
    <Outlet>
        
    </Outlet>
</>
    
  );
}
