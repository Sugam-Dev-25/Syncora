import React from "react";

import { useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

import { Link } from "react-router-dom";

import {
  LogOut,
  User,
  MessageCircleMore,
} from "lucide-react";

const Navbar = () => {

  const dispatch = useDispatch();

  return (

    <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">

      {/* LOGO */}

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">

          <MessageCircleMore
            size={24}
            className="text-white"
          />

        </div>

        <div>

          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">

            Syncora

          </h1>

          <p className="text-xs text-slate-500 -mt-1">

            Real-time chat app

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-4">

        <Link
          to="/profile"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition font-semibold text-slate-700"
        >

          <User size={18} />

          Profile

        </Link>

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>

  );

};

export default Navbar;