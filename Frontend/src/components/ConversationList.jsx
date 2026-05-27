import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getConversations,
  setSelectedUser,
} from "../features/chat/chatSlice";

const ConversationList = () => {

  const dispatch = useDispatch();

  const { conversations } =
  useSelector((state)=>state.chat);

  useEffect(()=>{

    dispatch(getConversations());

  },[]);

  return (

    <div className="mt-6">

      <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 px-2">

        Direct Messages

      </h2>

      <div className="space-y-2">

        {conversations.map((user)=>(

          <div
            key={user._id}

            onClick={()=>
              dispatch(
                setSelectedUser(user)
              )
            }

            className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-slate-100 transition"
          >

            {/* IMAGE */}

            <div className="relative">

              <img
                src={user.profileImage}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>

            </div>

            {/* INFO */}

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h2 className="font-bold text-slate-800">

                  {user.name}

                </h2>

                <span className="text-xs text-slate-400">

                  Just now

                </span>

              </div>

              <p className="text-sm text-slate-500 truncate">

                Tap to start chatting...

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ConversationList;