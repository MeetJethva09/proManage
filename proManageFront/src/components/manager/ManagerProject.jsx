import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
export default function ManagerProject() {

    const [project, setProject] = useState({});
     const [members , setMembers] = useState([])
     const {register , handleSubmit} = useForm({})
     const [projectTasks , setProjectTasks] = useState([])
     const [projectMembers , setProjectMembers] = useState([])
    

    const getProject = async () =>{
        const id = localStorage.getItem("id")
        const res = await axios.get("/project/manager-project/"+id);
        localStorage.setItem("pid" , res.data.data._id)
        setProject(res.data.data);
        setProjectMembers(res.data.data.members)
    }

    const getProjectTasks = async () =>{
        const response = await axios.get("/task/taskbypid/"+localStorage.getItem("pid"));
        setProjectTasks(response.data.data);
    }

     const submitHandler =async (data) =>{
        const res = await axios.post("/project/add-members/"+localStorage.getItem("pid"), data.members);
        getProject();
     }

    const getAllMembers =  async () =>{
            const res = await axios.get("/user/members");
            setMembers(res.data.data);       
    }

useEffect(()=>{
    getProject(),
    getAllMembers()
    getProjectTasks()
},[])

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Your Project
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your assigned project and team members
        </p>
      </div>

      {/* Project Card */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-10">

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
             {project.projectName}
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl">
                {project.projectDesc}
            </p>
          </div>

          <span className="px-3 py-1 text-xs rounded border text-slate-700">
            Active
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="rounded-md bg-slate-100 p-4">
            <p className="text-slate-500">Members</p>
            <p className="text-lg font-semibold">{project.members?.length <= 0 ? 0 : project.members?.length}</p>
          </div>

          <div className="rounded-md bg-slate-100 p-4">
            <p className="text-slate-500">Tasks</p>
            <p className="text-lg font-semibold">{projectTasks.length}</p>
          </div>

          <div className="rounded-md bg-slate-100 p-4">
            <p className="text-slate-500">Completed</p>
            <p className="text-lg font-semibold">{projectTasks.filter(p=>p.status === 'Complete').length}</p>
          </div>

          <div className="rounded-md bg-slate-100 p-4">
            <p className="text-slate-500">Deadline</p>
            <p className="text-lg font-semibold">30 Sep</p>
          </div>
        </div>

      </div>

      {/* Assign Members Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6">

        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Assign Members
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Select members and add them to this project
        </p>

        {/* Member Selection */}
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Select Member
            </label>

           <div className="max-h-44 overflow-y-auto rounded-md border p-2 space-y-2">
    {members.length === 0 && (
      <p className="text-sm text-slate-400">No users found</p>
    )}

    {members.map((member) => (
      <label
        key={member._id}
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <input
          type="checkbox"
          value={member._id}
          {...register("members")}
          className="accent-indigo-600"
        />
        
        <span className="text-slate-700">
          {/* {user.name} ({user.email}) */}
          {member.username} 
        </span>
      </label>
    ))}
  </div>
          </div>

          <div className="flex items-end">
            <button className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 transition">
              Add to Project
            </button>
          </div>

        </div>
        </form>

        {/* Assigned Members List */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            Project Members
          </h4>

          <div className="space-y-3">
            {projectMembers.length <= 0 ? "" : projectMembers.map((projectMember, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border p-3 text-sm"
              >
                <span>{projectMember.username}</span>

              <div className="flex gap-10">
                <Link to={`/navm/manager-member/${projectMember._id}`} className="text-xs text-green-800 hover:underline">
                  View
                </Link>

                <button  className="text-xs text-red-600 hover:underline">
                  Remove
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
