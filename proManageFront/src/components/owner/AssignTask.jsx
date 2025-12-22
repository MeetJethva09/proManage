import axios from "axios";
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AssignTask() {
        const navigate = useNavigate();
        const assignedToId = useParams().id;
        const [users ,setUsers] = useState([]);
        const {register , handleSubmit} = useForm({})

        const submitHandler = async (data) =>{
          try{
              const createdByUserId = localStorage.getItem('id');
              data.createdBy = createdByUserId;
              data.assignedTo = assignedToId; 
              const res = await axios.post("/task/add-task", data , {withCredentials: true});
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
                    navigate("/navo/all-users")
                },2000)
            }
            catch(err)
            {
              console.log("Error occured while task assigned",err);
            }
        }

        // const getAllUsers =async  () =>{
        //     try{
        //       const res = await axios.get("/user/getallusers");
        //       setUsers(res.data.data);
        //     }
        //     catch(err)
        //     {
        //       console.info("Error occured while fetch users",err);
        //     }
        //   }
        
        //   useEffect(()=>{
        //     getAllUsers()
        //   },[])

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


        <main className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">

      <section className="w-full max-w-lg bg-white rounded-lg border p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Assign Task
          </h2>
          <p className="text-sm text-slate-500">
            Assign a task to a team member
          </p>
        </div>

        {/* Task Title */}
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Task Title
          </label>
          <input required
            type="text"
            {...register("taskTitle")}
            placeholder="Enter task title"
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Description
          </label>
          <textarea
            {...register("taskDesc")} required
            rows="3"
            placeholder="Describe the task"
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Assign To */}
        {/* <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Assign To
          </label>
          <select {...register("assignedTo")} required
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option defaultChecked disabled>Select Members</option>
             {users.filter(u => u.role != 'Owner').map(user=>{ return ( <option value={user._id}>{user.username} - {user.role}</option> ) })  }
          </select>
        </div> */}

        {/* Priority */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Priority
          </label>
          <select {...register("priority")} required
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-600">
            Due Date
          </label>
          <input required
          {...register("dueDate")}
            type="date"
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={()=>navigate(-1)} className="px-4 py-2 text-sm rounded border hover:bg-slate-100 transition">
            Cancel
          </button>
          <button type = {'submit'} className="px-4 py-2 text-sm rounded bg-slate-900 text-white hover:bg-slate-800 transition">
            Assign Task
          </button>
        </div>
        </form>

      </section>

    </main>
    </>
  );
}
