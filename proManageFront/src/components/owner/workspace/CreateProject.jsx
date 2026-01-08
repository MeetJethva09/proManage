import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";

export default function CreateProject() {
  const wid = useParams().wid;
  const navigate = useNavigate()
  const {register , handleSubmit} = useForm({})
  const [managers , setManagers] = useState([])

  const submitHandler = async(data) =>{
    data.createdBy = localStorage.getItem("id");
    data.workspaceId = wid;
    const res = await axios.post("/project/add-project" , data);
    console.log(res.data.data);
    
  }

  const getManagers = async () =>{
    const res = await axios.get("/user/managers");
    setManagers(res.data.data);
  }

useEffect(()=>{
    getManagers()
},[])

  return (
    <div className="min-h-screen m-auto bg-slate-50 p-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Create New Project
        </h1>
        <p className="text-slate-600 mt-1">
          Create a project and assign it to a manager
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-8xl bg-white rounded-lg shadow-sm border p-6">

        {/* Project Info */}
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Project Name
            </label>
            <input
            {...register("projectName")}
              type="text"
              placeholder="Backend API Revamp"
              className="mt-2 w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Deadline
            </label>
            <input
            {...register("deadline")}
              type="date"
              className="mt-2 w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700">
            Project Description
          </label>
          <textarea
          {...register("projectDesc")}
            rows="4"
            placeholder="Describe project scope and goals..."
            className="mt-2 w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* Assign Manager */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700">
            Assign Manager
          </label>

          <select className="mt-2 w-full rounded-md border px-4 py-2
           text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
           {...register("manager")}
           >
            <option disabled> Select</option>
            {managers.map((manager)=>{
                return (
                     <option value={manager._id}>{manager.username}</option>
                )
            })}
           
          </select>

          <p className="mt-2 text-xs text-slate-500">
            Manager will handle team members and tasks
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={()=> navigate(-1)}  className="px-5 py-2 text-sm rounded-md border text-slate-700 hover:bg-slate-100 transition">
            Cancel
          </button>

          <button type={'submit'} className="px-6 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 transition">
            Create Project
          </button>
        </div>
        
      </form>
      </div>
    </div>
  );
}
