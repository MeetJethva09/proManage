import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreateTeam = () => {
    const navigate = useNavigate()

    const [projectMembers , setProjectMembers] = useState([])
    const [projects , setProjects] = useState([]);
    const {register , handleSubmit} = useForm({});

    const getMembers = async () =>{
        const response = await axios.get("/project/manager-project/"+localStorage.getItem("id"));
        console.log(response.data.data)
        setProjectMembers(response.data.data.members)
        setProjects(response.data.data)
    }

    const submitHandler = async (data) =>{
        const id = localStorage.getItem("id");
        data.createdBy = id;
        const res = await axios.post("/team/create-team" , data);
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
                    navigate(-1);
                },2000)
    }
    
useEffect(()=>{
    getMembers()
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
        
            <div className="max-w-xl mx-auto bg-white border rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">Create Team</h2>

  {/* Team Name */}
  <form onSubmit={handleSubmit(submitHandler)}>
  <div className="mb-4">
    <label className="block text-sm text-slate-600 mb-1">
      Team Name
    </label>
    <input
      type="text"
      {...register('teamName')}
      placeholder="Enter team name"
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
    />
  </div>

  {/* Project Select */}
  <div className="mb-4">
    <label className="block text-sm text-slate-600 mb-1">
      Project
    </label>
    <select {...register('project')} className="w-full px-3 py-2 border rounded-md bg-white">
      <option disabled>Select project</option>

       <option value={projects._id}>{projects.projectName}</option>
    </select>
  </div>

  {/* Members */}
  <div className="mb-4">
   
    <div className="space-y-2">
      <div>
            <label className="block text-sm font-medium text-slate-700">
              Select Member
            </label>

           <div className="max-h-44 overflow-y-auto rounded-md border p-2 space-y-2">
    {projectMembers.length === 0 && (
      <p className="text-sm text-slate-400">No users found</p>
    )}

    {projectMembers.map((member) => (
      <label
        key={member._id}
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <input
          type="checkbox"
          value={member._id}
          {...register('members')}
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
    </div>
  </div>

  {/* Submit */}
  <div className="text-right">
    <button type='submit' className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
      Create Team
    </button>
  </div>
  </form>
</div>
    </>
  )
}
