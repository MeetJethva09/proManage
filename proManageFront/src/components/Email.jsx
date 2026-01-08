import axios from 'axios'
import react from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const Email = () =>{
    const navigate = useNavigate()
    const {register , handleSubmit , formState : {errors}} = useForm({})

    const submitHandler = async (data) =>{
      try{
        const res = await axios.post("/user/validate-user" , data);
        sessionStorage.setItem("mobile" , res.data.data.mobile)
         toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 2200,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                setTimeout(()=>{
                    navigate("/loginwithotp")
                },2500)
              } catch(err)
              {
                toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 2200,
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

    const validator = {
        emailValidator : {
            required : {
                value : true,
                 message : "*Email required.."
            }
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


           <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Enter email to Get Otp
        </h2>

         <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email : 
            </label>
            <input
              type="email"
              {...register("email" , validator.emailValidator)}
              placeholder="abc@gmail.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />{
                    errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            }
              
          </div>
          <button
            type="submit"
            className="w-full mt-4 rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Submit
          </button>
          </form>
            </div>
            </div>
    </>
)
}