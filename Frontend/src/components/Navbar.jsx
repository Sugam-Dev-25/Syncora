import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";

import { getProfile } from "../features/user/userSlice";

import { getRequests } from "../features/request/requestSlice";

import { Link } from "react-router-dom";

import { LogOut, UserPlus } from "lucide-react";

import SearchUsers from "./SearchUsers";

import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  const { requests } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getProfile());

    dispatch(getRequests());
  }, [dispatch]);

  return (
    <div className="w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
      {/* LEFT SIDE */}

      <div className="flex items-center gap-14 flex-1">
        {/* LOGO */}

        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />

          <h1 className="text-3xl font-bold font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
            SynCora
          </h1>
        </Link>

        {/* SEARCH */}

        <div className="hidden lg:block w-full max-w-[700px]">
          <SearchUsers />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-5 ml-8">
        {/* FRIEND REQUEST */}

        <Link
          to="/friend-requests"
          className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition duration-300"
        >
          <UserPlus size={24} />

          {requests?.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
              {requests.length}
            </span>
          )}
        </Link>

        {/* PROFILE */}

        <Link
          to="/profile"
          className="flex items-center gap-3 pl-5 border-l border-slate-300"
        >
          <img
            src={profile?.profileImage}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-violet-500 shadow-md"
          />

          <div>
            <h2 className="font-bold text-xl text-slate-800 leading-none">
              {profile?.name?.split(" ")[0]}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {profile?.nationality}
            </p>
          </div>
        </Link>

        {/* LOGOUT */}

        <button
          onClick={() => dispatch(logout())}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
