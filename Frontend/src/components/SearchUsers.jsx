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
} from "lucide-react";

const SearchUsers = () => {

  const [search, setSearch] =
  useState("");

  const dispatch = useDispatch();

  const { users } =
  useSelector((state)=>state.user);

  const handleSearch = () => {

    dispatch(searchUsers(search));

  };

  return (

    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">

      {/* SEARCH BAR */}

      <div className="flex items-center gap-3">

        <div className="flex-1 relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-100 outline-none border border-slate-200 focus:border-blue-400"
          />

        </div>

        <button
          onClick={handleSearch}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center shadow-lg"
        >

          <Search size={20} />

        </button>

      </div>

      {/* SEARCH RESULTS */}

      {users.length > 0 && (

        <div className="mt-6 space-y-3">

          <h2 className="text-sm font-bold text-slate-500 uppercase">

            Search Results

          </h2>

          {users.map((user)=>(

            <div
              key={user._id}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 transition"
            >

              <div className="flex items-center gap-3">

                <div className="relative">

                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>

                </div>

                <div>

                  <h2 className="font-bold text-slate-800">

                    {user.name}

                  </h2>

                  <p className="text-sm text-slate-500 truncate w-[120px]">

                    {user.email}

                  </p>

                </div>

              </div>

              <button
                onClick={()=>
                  dispatch(sendRequest(user._id))
                }
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center"
              >

                <UserPlus size={18} />

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default SearchUsers;