import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function OwnerChangeUserRole() {
    const navigate = useNavigate();
    const id = useParams().id;
    const {register , handleSubmit} = useForm({});

    const submitHandler = async (data) =>{
        const res = await axios.patch("/user/updaterole/"+id ,data , {withCredentials:true} );
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

      <section className="w-full max-w-md bg-white rounded-lg border p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Change User Role
          </h2>
          <p className="text-sm text-slate-500">
            Update permissions for this user
          </p>
        </div>

        {/* User Info */}
        

        {/* Role Selection */}
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
            <input type="radio" name="role" value={'Member'}{...register("role")}/>
            <div>
              <p className="font-medium">Member</p>
              <p className="text-xs text-slate-500">
                Can view and complete assigned tasks
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
            <input type="radio" name="role" value={'Manager'} {...register("role")}/>
            <div>
              <p className="font-medium">Manager</p>
              <p className="text-xs text-slate-500">
                Can assign and manage tasks
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
            <input type="radio" name="role"  value={'Owner'}{...register("role")}/>
            <div>
              <p className="font-medium">Owner</p>
              <p className="text-xs text-slate-500">
                Full access to workspace
              </p>
            </div>
          </label>
        </div>
        

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 text-sm rounded border hover:bg-slate-100 transition">
            Cancel
          </button>
          <button type={'submit'} className="px-4 py-2 text-sm rounded bg-slate-900 text-white hover:bg-slate-800 transition">
            Update Role
          </button>
        </div>
        </form>

      </section>

    </main>
    </>
  );
}
