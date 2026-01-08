import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function OwnerNavbar() {
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const [openMenu, setOpenMenu] = useState(false);

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
   <header className="w-full bg-white border-b px-4 sm:px-6">
  <div className="h-14 flex items-center justify-between">

    {/* Left */}
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-semibold">ProManage</h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4 text-sm text-slate-600">
        <Link to="/navo/owner-dashboard" className="hover:text-slate-900">
          Overview
        </Link>
        <Link to="/navo/all-users" className="hover:text-slate-900">
          Users
        </Link>
        <Link to="/navo/task-list" className="hover:text-slate-900">
          Tasks
        </Link>
        <Link to="/navo/work-list" className="hover:text-slate-900">
          Workspaces
        </Link>
      </nav>
    </div>

    {/* Right */}
    <div className="flex items-center gap-4 text-sm">

      {/* Workspace (hidden on mobile) */}
      <div className="hidden sm:flex flex-col text-right">
        <span className="text-xs text-slate-500">Workspace</span>
        <span className="font-medium">ProManage Org</span>
      </div>

      {/* Role */}
      <span className="hidden sm:inline px-3 py-1 text-xs rounded border text-slate-700">
        Owner
      </span>

      {/* Desktop User */}
      <div className="hidden sm:flex items-center gap-3">
        <img
          src="/src/assets/user.png"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-medium">{user.username}</span>
          <span className="text-xs text-slate-500">
            {user.email}
          </span>
        </div>
        <button
          onClick={logoutAction}
          className="bg-red-200 px-2 py-1 rounded border"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="md:hidden text-xl"
      >
        ☰
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {openMenu && (
    <div className="md:hidden border-t bg-white py-3 space-y-2 text-sm">
      <Link to="/navo/owner-dashboard" className="block px-4">
        Overview
      </Link>
      <Link to="/navo/all-users" className="block px-4">
        Users
      </Link>
      <Link to="/navo/task-list" className="block px-4">
        Tasks
      </Link>
      <Link to="/navo/work-list" className="block px-4">
        Workspaces
      </Link>

      <div className="px-4 pt-2 border-t">
        <p className="font-medium">{user.username}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs border rounded">
          Owner
        </span>
        <button
          onClick={logoutAction}
          className="mt-2 w-full bg-red-200 py-1 rounded border"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</header>

        
     <Outlet>
        
    </Outlet>
</>
    
  );
}
