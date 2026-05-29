import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* TOP PROFILE */}

        <div className="flex flex-col items-center justify-center mb-12">
          <img
            src={profile?.profileImage}
            alt=""
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />

          <h1 className="text-[38px] font-bold text-[#202020] mt-4 text-center">
            {profile?.name}
          </h1>

          <p className="text-slate-500 text-lg mt-1 break-all text-center">
            {profile?.email}
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}

          <div className="space-y-8">
            {/* PERSONAL DETAILS */}

            <div className="bg-white rounded-[24px] border border-[#ececec] p-8 shadow-sm">
              <h2 className="inline-block text-[20px]  bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-8 font-bold">
                Personal Details
              </h2>

              <div className="space-y-5">
                {/* FULL NAME */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Full Name:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.name}
                  </h3>
                </div>

                {/* DOB */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Date Of Birth:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.dateOfBirth?.slice(0, 10)}
                  </h3>
                </div>

                {/* NATIONALITY */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Nationality:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.nationality}
                  </h3>
                </div>

                {/* ADDRESS */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Address:</p>

                  <h3 className="font-semibold text-[#202020] text-right max-w-[280px]">
                    {profile?.address}
                  </h3>
                </div>

                {/* PHONE */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Phone Number:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.phone}
                  </h3>
                </div>

                {/* EMAIL */}

                <div className="flex justify-between gap-5">
                  <p className="text-slate-500">Email:</p>

                  <h3 className="font-semibold text-[#202020] text-right break-all">
                    {profile?.email}
                  </h3>
                </div>
              </div>
            </div>

            {/* SECURITY */}

            <div className="bg-white rounded-[24px] border border-[#ececec] p-8 shadow-sm">
              <h2 className="inline-block text-[20px] font-bold  bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Security Settings
              </h2>

              <div className="space-y-5">
                {/* ACCOUNT EMAIL */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">Account Email:</p>

                  <h3 className="font-semibold text-[#202020] break-all text-right">
                    {profile?.email}
                  </h3>
                </div>

                {/* PHONE */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">Phone Number:</p>

                  <h3 className="font-semibold text-[#202020]">
                    {profile?.phone}
                  </h3>
                </div>

                {/* ACCOUNT STATUS */}

                <div className="flex justify-between">
                  <p className="text-slate-500">Account Status:</p>

                  <span
                    className={`text-sm px-3 py-1 rounded-lg font-medium ${
                      profile?.online
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {profile?.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-8">
            {/* ACCOUNT DETAILS */}

            <div className="bg-white rounded-[24px] border border-[#ececec] p-8 shadow-sm">
              <h2 className="inline-block text-[20px] font-bold  bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Account Details
              </h2>

              <div className="space-y-5">
                {/* DISPLAY NAME */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Display Name:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.name?.toLowerCase()?.replaceAll(" ", "_")}
                  </h3>
                </div>

                {/* ACCOUNT CREATED */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Account Created:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.createdAt?.slice(0, 10)}
                  </h3>
                </div>

                {/* USER ID */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">User ID:</p>

                  <h3 className="font-semibold text-[#202020] text-right break-all">
                    {profile?._id}
                  </h3>
                </div>

                {/* ONLINE STATUS */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3 gap-5">
                  <p className="text-slate-500">Online Status:</p>

                  <span
                    className={`text-sm px-3 py-1 rounded-lg font-medium ${
                      profile?.online
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {profile?.online ? "Online" : "Offline"}
                  </span>
                </div>

                {/* UPDATED */}

                <div className="flex justify-between gap-5">
                  <p className="text-slate-500">Last Updated:</p>

                  <h3 className="font-semibold text-[#202020] text-right">
                    {profile?.updatedAt?.slice(0, 10)}
                  </h3>
                </div>
              </div>
            </div>

            {/* PREFERENCES */}

            <div className="bg-white rounded-[24px] border border-[#ececec] p-8 shadow-sm">
              <h2 className="inline-block text-[20px] font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Preferences
              </h2>

              <div className="space-y-5">
                {/* CITY */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">City:</p>

                  <h3 className="font-semibold text-[#202020]">
                    {profile?.city}
                  </h3>
                </div>

                {/* STATE */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">State:</p>

                  <h3 className="font-semibold text-[#202020]">
                    {profile?.state}
                  </h3>
                </div>

                {/* POSTCODE */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">Postcode:</p>

                  <h3 className="font-semibold text-[#202020]">
                    {profile?.postcode}
                  </h3>
                </div>

                {/* FRIENDS */}

                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <p className="text-slate-500">Total Friends:</p>

                  <h3 className="font-semibold text-[#202020]">
                    {profile?.friends?.length || 0}
                  </h3>
                </div>

                {/* BIO */}

                <div className="flex justify-between items-start gap-5">
                  <p className="text-slate-500">Bio:</p>

                  <h3 className="font-semibold text-[#202020] text-right max-w-[280px] leading-relaxed">
                    {profile?.bio}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
