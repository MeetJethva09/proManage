import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function TaskDetail() {
    const navigate = useNavigate()
    const id = useParams().id;
    const [task ,setTask] = useState({})

    const {register , handleSubmit} = useForm({})
    
    const submitHandler = async (data) =>{
         const res = await axios.patch("/task/updatetask/" + id , data)
         getTaskByTaskId()
    }

    const getTaskByTaskId = async () =>{
        const res = await axios.get("/task/taskbytid/"+id);
        setTask(res.data.data)
    }

useEffect(()=>{
        getTaskByTaskId()
},[])

  return (
    <section className="max-w-3xl mx-auto p-6">

      <h2 className="text-xl font-semibold mb-6">
        Task Details
      </h2>

      <div className="bg-white border rounded-lg p-6 space-y-4">

        <div>
          <p className="text-sm text-slate-500">Title</p>
          <p className="font-medium">{task.taskTitle}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Description</p>
          <p className="text-slate-700">
            {task.taskDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Priority</p>
            <p className="font-medium">{task.priority}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium">{task.status}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">Due Date</p>
          <p className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Assigned By :</p>
          <p className="font-medium">{task.createdBy?.username}</p>
        </div>

        {/* Optional Action */}
        <form onSubmit={handleSubmit(submitHandler)}>
            { task.status === 'Complete' ? "" :
        <div className="pt-4 flex gap-3">
          <button type={'submit'} className="px-4 py-2 text-sm border rounded  bg-green-400 text-black" value={'Complete'} {...register("status")}>
            Mark Completed
          </button>
          </div>
            }
          </form>

          <button onClick={()=>navigate(-1)} className="px-4 py-2 text-sm border rounded hover:bg-slate-50">
            Back to Tasks
          </button>
        </div>

     
    </section>
  );
}
