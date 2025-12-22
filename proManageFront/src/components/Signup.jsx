import React from 'react'
import { useState , useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {ToastContainer , toast , Bounce} from 'react-toastify'

export const Signup = () => {
    const navigate = useNavigate();
    const {register , handleSubmit , formState : {errors}} = useForm({})

    const submitHandler = async (data) =>{
        try{
          
            const res = await axios.post('/user/add-user' , data);
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
                navigate('/login')
            },2000)
        }
        catch(err){
            console.log("Error occured while signup" ,err);
        }
    }

    const allValidators = {
      emailValiator : {
          required : {
            value : true,
            message : '*Email is required'
          }
      },
      usernameValidator : {
          required : {
            value : true ,
            message : "*Username is required"
          }
      },
      passwordValidator : {
        required : {
          value : true,
          message : "*Password is required"
        }
      },
      ageValdator : {
        required : {
          value : true,
          message : "*Age is required"
        }
      },
      mobileValidator :{
        required : {
          value : true,
          maxLength : 10,
          minLength : 10,
          message : "*Mobile Number required"
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
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email" , allValidators.emailValiator)}
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
              Username
            </label>
            <input
              type="text"
              placeholder="JohnDoe"
              {...register("username" , allValidators.usernameValidator)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.username && 
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                }
         
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password" , allValidators.passwordValidator)}
              placeholder="********"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.password && 
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                }
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Age
            </label>
            <input
              type="number"
              {...register("age" , allValidators.ageValdator)}
              placeholder="25"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.age && 
                  <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                }
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mobile
            </label>
            <input
              type="tel"
              placeholder="1234567890"
              {...register("mobile" , allValidators.mobileValidator)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.mobile && 
                  <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                }
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect Text */}
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}
