import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer , Bounce ,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const {register , handleSubmit , formState : {  errors }} = useForm({})

    const submitHandler = async (data) =>{
      
        try{
            const res = await axios.post("/user/login" , data , {withCredentials : true} );
             localStorage.setItem('id' , res.data.data._id);
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
                if(res.data.data.role === 'Owner') navigate('/navo/owner-dashboard')
                else navigate('/nav/user-dashboard')
            },2000)
        }
        catch(err)
        {
           
            if(err.status === 401)
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
            else {
              toast.warning(err.response.data.msg, {
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
    }

    const allValidators = {
      emailValidator : {
        required : {
          value : true,
          message : "*Email is required.."
        }
      },
      passwordValidator : {
        required : {
          value: true,
          message : "*Password is required.."
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
          Welcome back to  Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email" , allValidators.emailValidator)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.email && 
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                }
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="JohnDoe"
              {...register("password" ,allValidators.passwordValidator)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.password && 
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                }
          </div>

           <button
            type="submit"
            className="w-full mt-4 rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Login
          </button>
        </form>

        {/* Redirect Text */}
        <p className="mt-4 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Signup
          </Link> <br />OR <br />
          <Link to='/loginwithotp' className='text-red-500 '>Login with Otp</Link>
        </p>

        </div>  
        </div>
        
</>
  )
}
