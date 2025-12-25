 import axios from 'axios';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function CreateWorkspace() {
    const navigate = useNavigate()
    const {register , handleSubmit} = useForm({})
    const submitHandler = async(data) =>{
        try{
            const id = localStorage.getItem("id");
            data.createdBy = id;
            const res = await axios.post("/workspace/add-workspace" , data);
            localStorage.setItem( 'wid' ,res.data.data._id);
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
                        navigate('/navo/work-list')
                    },2000)
            } catch(err)
            {
                toast.error(err.response.data.msg, {
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
            }
        }

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

    <div className="min-h-[calc(100vh-56px)] bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl border shadow-sm p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Create Workspace</h2>
          <p className="text-sm text-slate-500 mt-1">
            Set up a new workspace to manage projects and tasks
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>

          {/* Workspace Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Workspace Name
            </label>
            <input
            {...register("workspaceName")}
              type="text"
              required
              placeholder="e.g. Backend Core Team"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
                {...register("workspaceDesc")}
              rows="3"
              required
              placeholder="Short description about this workspace"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Visibility */}
          
          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={()=>navigate(-1)}
              type="button"
              className="px-4 py-2 text-sm rounded-md border text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create Workspace
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
}
