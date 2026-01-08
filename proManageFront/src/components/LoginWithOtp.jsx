import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const LoginWithOtp = () => {
    const navigate = useNavigate()
    const {register , handleSubmit , formState : { errors } } = useForm({})

    const submitHandler = async(data) =>{
      try{
        let mobile = sessionStorage.getItem("mobile");
        data.mobile = mobile;
        const res = await axios.post("/user/validate-otp" , data , {withCredentials : true});
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
                  else if(res.data.data.role === "Manager") navigate("/navm/manager-dashboard")
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
         } else {
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
    }

    const validators = {
        otpValidator : {
            required : {
                value : true,
                message : "*Otp requuired.."
            },
            minLength : {
                value : 4,
                message : "*Enter valid otp"
            },
            maxLength :{
                value : 4,
                message : "*Enter valid otp"
            }
        }
    }
  return (
    <div>
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
          Enter Otp 
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              OTP : 
            </label>
            <input
              type="Number"
              {...register("loginOtp" , validators.otpValidator)}
              placeholder="0000"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.loginOtp && <p className='text-red-500 text-sm'>{errors.loginOtp.message}</p>}
          </div>
              <button
            type="submit"
            className="w-full mt-4 rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Login
          </button>

          </form>
          </div>
          </div>

    </div>
  )
}
