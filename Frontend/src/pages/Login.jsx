import React from "react";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../features/auth/authSlice";

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const result =
    await dispatch(loginUser(data));

    if(result.payload){

      navigate("/");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-slate-200">

        {/* Logo */}

        <div className="text-center mb-8">

          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">

            Syncora

          </h1>

          <p className="text-slate-500 mt-2 text-lg">

            Welcome back

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <input
              type="email"

              {...register("email", {
                required: "Email is required",
              })}

              placeholder="Email Address"

              className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition placeholder:text-slate-400"
            />

            {errors.email && (

              <p className="text-red-500 text-sm mt-1">

                {errors.email.message}

              </p>

            )}

          </div>

          {/* Password */}

          <div>

            <input
              type="password"

              {...register("password", {
                required: "Password is required",
              })}

              placeholder="Password"

              className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-500 transition placeholder:text-slate-400"
            />

            {errors.password && (

              <p className="text-red-500 text-sm mt-1">

                {errors.password.message}

              </p>

            )}

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
          >

            Login

          </button>

        </form>

        {/* Footer */}

        <p className="text-center text-slate-500 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;