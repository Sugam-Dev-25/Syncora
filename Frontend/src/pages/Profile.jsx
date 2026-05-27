import React, { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getProfile,
} from "../features/user/userSlice";

import {
  Mail,
  Phone,
  MapPin,
  User,
  Sparkles,
} from "lucide-react";

const Profile = () => {

  const dispatch = useDispatch();

  const { profile } =
  useSelector((state)=>state.user);

  useEffect(()=>{

    dispatch(getProfile());

  },[dispatch]);

  if(!profile){

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-100">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 px-6 py-10">

      {/* MAIN CARD */}

      <div className="w-full max-w-7xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/60">

        {/* TOP BANNER */}

        <div className="h-[260px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative">

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-black/10"></div>

          {/* PROFILE IMAGE */}

          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-violet-400 blur-3xl opacity-40"></div>

              <img
                src={profile.profileImage}
                alt=""
                className="relative w-48 h-48 rounded-full object-cover border-[8px] border-white shadow-2xl"
              />

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="pt-32 pb-14 px-8 lg:px-16">

          {/* NAME */}

          <div className="text-center">

            <h1 className="text-5xl font-black text-slate-800">

              {profile.name}

            </h1>

            <div className="flex items-center justify-center gap-2 mt-4">

              <Sparkles
                size={18}
                className="text-violet-600"
              />

              <p className="font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">

                Premium Syncora User

              </p>

            </div>

          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">

            {/* EMAIL */}

            <div className="bg-slate-100 rounded-[30px] p-7 flex items-center gap-5 hover:shadow-xl transition duration-300">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-xl shrink-0">

                <Mail size={30} />

              </div>

              <div>

                <p className="text-slate-500 font-semibold text-sm">

                  Email Address

                </p>

                <h2 className="text-2xl font-bold text-slate-800 break-all">

                  {profile.email}

                </h2>

              </div>

            </div>

            {/* PHONE */}

            <div className="bg-slate-100 rounded-[30px] p-7 flex items-center gap-5 hover:shadow-xl transition duration-300">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-xl shrink-0">

                <Phone size={30} />

              </div>

              <div>

                <p className="text-slate-500 font-semibold text-sm">

                  Phone Number

                </p>

                <h2 className="text-2xl font-bold text-slate-800">

                  {profile.phone}

                </h2>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="bg-slate-100 rounded-[30px] p-7 flex items-start gap-5 hover:shadow-xl transition duration-300 lg:col-span-2">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-xl shrink-0">

                <MapPin size={30} />

              </div>

              <div>

                <p className="text-slate-500 font-semibold text-sm">

                  Address

                </p>

                <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">

                  {profile.address}

                </h2>

              </div>

            </div>

            {/* BIO */}

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-[35px] p-10 lg:col-span-2">

              <div className="flex items-center justify-center gap-3 mb-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-lg">

                  <User size={26} />

                </div>

                <h2 className="text-3xl font-black text-slate-800">

                  About Me

                </h2>

              </div>

              <p className="text-center text-slate-600 text-xl leading-relaxed max-w-4xl mx-auto">

                {profile.bio}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;