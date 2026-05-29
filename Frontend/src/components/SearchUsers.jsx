import React, { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  searchUsers,
} from "../features/user/userSlice";

import {
  sendRequest,
} from "../features/request/requestSlice";

import {
  Search,
  UserPlus,
  Check,
} from "lucide-react";

const SearchUsers = () => {

  const [search, setSearch] =
  useState("");

  const [sentRequestIds, setSentRequestIds] =
  useState([]);

  const dispatch = useDispatch();

  const { users } =
  useSelector((state)=>state.user);

  const handleSearch = () => {

    if(!search.trim()) return;

    dispatch(
      searchUsers(search)
    );

  };

  const handleSendRequest =
  async (userId)=>{

    const result =
    await dispatch(
      sendRequest(userId)
    );

    if(result.payload?.success){

      setSentRequestIds((prev)=>
        [...prev, userId]
      );

    }

  };

  return (

    <div className="relative w-[520px] xl:w-[700px]">

      {/* SEARCH BAR */}

      <div className="flex items-center gap-4">

        {/* INPUT */}

        <div className="flex-1 relative">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            onKeyDown={(e)=>{

              if(e.key === "Enter"){

                handleSearch();

              }

            }}
            className="w-full h-12 pl-14 pr-5 rounded-full bg-slate-100 border border-slate-200 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition text-slate-700 placeholder:text-slate-400 text-lg"
          />

        </div>

        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition duration-300 shrink-0"
        >

          <Search size={22} />

        </button>

      </div>

      {/* RESULTS */}

      {users.length > 0 && (

        <div className="absolute top-[85px] left-0 w-full bg-white rounded-[32px] shadow-2xl border border-slate-100 p-4 z-[999]">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-5 px-2">

            <h2 className="text-xs font-black tracking-[3px] text-slate-400 uppercase">

              Search Results

            </h2>

            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full">

              {users.length} Found

            </span>

          </div>

          {/* USER LIST */}

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">

            {users.map((user)=>(

              <div
                key={user._id}
                className="group flex items-center justify-between p-4 rounded-3xl hover:bg-slate-100 transition duration-300"
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  {/* IMAGE */}

                  <div className="relative">

                    <img
                      src={user.profileImage}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />

                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>

                  </div>

                  {/* INFO */}

                  <div>

                    <h2 className="font-bold text-slate-800 text-[16px] leading-none">

                      {user.name}

                    </h2>

                    <p className="text-sm text-slate-500 mt-2 truncate w-[240px]">

                      {user.email}

                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                {sentRequestIds.includes(
                  user._id
                ) ? (

                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg">

                    <Check size={20} />

                  </div>

                ) : (

                  <button
                    onClick={()=>
                      handleSendRequest(
                        user._id
                      )
                    }
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >

                    <UserPlus size={18} />

                  </button>

                )}

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

};

export default SearchUsers;