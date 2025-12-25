import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'

export const LoginWithOtp = () => {
    const {register , handleSubmit , formState : { errors } } = useForm({})

    const submitHandler = async(data) =>{
        let mobile = sessionStorage.getItem("mobile");
        data.mobile = mobile;
        const res = await axios.post("/user/validate-otp" , data);
        console.log(res.data.msg)
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
