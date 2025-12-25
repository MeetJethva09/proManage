import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function AddWorkspaceMembers() {
  const navigate = useNavigate();
    const [users , setUsers] = useState([]);
    const wid = useParams().wid;
    const {register , handleSubmit} = useForm({});   

    const submitHandler = async (data) =>{
      data.workspaceId = wid;
      const res = await axios.post("/add-member" , data);
      toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                setTimeout(()=>{
                    navigate("/navo/work-list")
                },2000)
    }

    const getUsers = async () =>{
        const res = await axios.get("/user/getallusers");
        setUsers(res.data.data);
    }

useEffect(()=>{
    getUsers()
},[])


  return (
    <>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />

    <div className="bg-white rounded-xl border shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Members to Workspace</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select users to grant access to this workspace
        </p>
      </div>
        <form onSubmit={handleSubmit(submitHandler)}>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* User List */}
      <div className="space-y-3 max-h-72 overflow-y-auto">

        {
            users.filter(u=>u.role !== 'Owner').
         map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                {user.username[0].toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              value={user._id}
              {...register("members")}
              className="w-4 h-4 accent-indigo-600"
            />
          </div>
        ))}

      </div>

      {/* Action */}
      <div className="flex justify-end pt-6">
        <button className="px-5 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          Add Selected Members
        </button>
      </div>
        </form>
    </div>
    </>
  );
}
