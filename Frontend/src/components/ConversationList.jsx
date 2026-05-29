import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getConversations, setSelectedUser } from "../features/chat/chatSlice";

const ConversationList = () => {
  const dispatch = useDispatch();

  const { conversations, unreadMessages } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return (
    <div className="mt-6">
      {/* TITLE */}

      <h2 className="inline-block text-[20px]  bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-8 px-2 font-bold">
        Direct Messages
      </h2>

      {/* LIST */}

      <div className="space-y-2">
        {conversations.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="group flex items-center gap-4 p-3 rounded-3xl cursor-pointer hover:bg-slate-100 transition duration-300"
          >
            {/* IMAGE */}

            <div className="relative shrink-0">
              <img
                src={user.profileImage}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* ONLINE DOT */}

              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* INFO */}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                {/* NAME */}

                <h2 className="font-black text-[18px] font-bold ">
                  {user.name.split(" ")[0]}
                </h2>

                {/* UNREAD COUNT */}

                {unreadMessages?.[user._id] > 0 && (
                  <div className="min-w-[28px] h-7 px-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {unreadMessages[user._id]}
                  </div>
                )}
              </div>

              {/* LAST MSG */}

              <p className="text-[12px] text-[#772FFE] truncate  font-semibold">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
