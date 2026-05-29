import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../features/auth/authSlice";

import { MessageCircle, Upload, Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "profileImage") {
          formData.append(key, data[key]);
        }
      });
      console.log(data);
      console.log(data.profileImage);

      formData.append("profileImage", data.profileImage[0]);

      const result = await dispatch(registerUser(formData));

      if (result.payload) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full"></div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-8">
        {/* LOGO */}

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
            <MessageCircle size={32} className="text-white" />
          </div>

          <h1 className="text-4xl font-extrabold mt-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Syncora
          </h1>

          <p className="text-slate-500 mt-2">Create your account</p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}

          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PHONE */}

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* ADDRESS */}

          <div>
            <input
              type="text"
              placeholder="Address"
              {...register("address", {
                required: "Address is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400"
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* NATIONALITY */}

          <div>
            <input
              type="text"
              placeholder="Nationality"
              {...register("nationality", {
                required: "Nationality is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50"
            />

            {errors.nationality && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nationality.message}
              </p>
            )}
          </div>

          {/* DATE OF BIRTH */}

          <div>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50"
            />

            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* CITY */}

          <div>
            <input
              type="text"
              placeholder="City"
              {...register("city", {
                required: "City is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50"
            />

            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* STATE */}

          <div>
            <input
              type="text"
              placeholder="State"
              {...register("state", {
                required: "State is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50"
            />

            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* POSTCODE */}

          <div>
            <input
              type="text"
              placeholder="Postcode"
              {...register("postcode", {
                required: "Postcode is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50"
            />

            {errors.postcode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.postcode.message}
              </p>
            )}
          </div>

          {/* BIO */}

          <div>
            <textarea
              rows="3"
              placeholder="Write your bio..."
              {...register("bio", {
                required: "Bio is required",
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400 resize-none"
            />

            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* PASSWORD */}

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition bg-slate-50 placeholder:text-slate-400"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* IMAGE */}

          {/* IMAGE */}

          <div>
            <label className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-300 rounded-2xl p-5 cursor-pointer hover:border-blue-500 transition bg-slate-50 placeholder:text-slate-400">
              <Upload size={20} />

              <span className="text-slate-600">Upload Profile Image</span>

              <input
                type="file"
                accept="image/*"
                hidden
                {...register("profileImage", {
                  required: "Profile image is required",

                  onChange: (e) => {
                    const file = e.target.files?.[0];

                    console.log("SELECTED FILE =>", file);

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
              />
            </label>

            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* PREVIEW */}

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
            </div>
          )}

          {/* BUTTON */}

          <button
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] transition-all duration-300 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* LOGIN */}

        <p className="text-center text-slate-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
