import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getMessages,
  sendMessage,
  addMessage,
} from "../features/chat/chatSlice";

import socket from "../socket/socket";

const ChatBox = () => {

  const dispatch = useDispatch();

  const bottomRef = useRef();

  const {
    selectedUser,
    messages,
  } = useSelector(
    (state)=>state.chat
  );

  const { user } =
  useSelector(
    (state)=>state.auth
  );

  const [text, setText] =
  useState("");

  const [file, setFile] =
  useState(null);

  // LOAD MESSAGES

  useEffect(()=>{

    if(
      selectedUser?.conversationId
    ){

      dispatch(
        getMessages(
          selectedUser.conversationId
        )
      );

    }

  },[
    selectedUser,
    dispatch
  ]);

  // SOCKET

  useEffect(()=>{

    if(!user?._id) return;

    socket.emit(
      "join",
      user._id
    );

    socket.on(
      "receiveMessage",
      (message)=>{

        dispatch(
          addMessage(message)
        );

      }
    );

    return ()=>{

      socket.off(
        "receiveMessage"
      );

    };

  },[
    user,
    dispatch
  ]);

  // AUTO SCROLL

  useEffect(()=>{

    bottomRef.current
    ?.scrollIntoView({
      behavior:"smooth",
    });

  },[messages]);

  // SEND MESSAGE

  const handleSend =
  async ()=>{

    if(
      !text &&
      !file
    ) return;

    if(
      !selectedUser
      ?.conversationId
    ) return;

    const formData =
    new FormData();

    formData.append(
      "conversationId",
      selectedUser.conversationId
    );

    formData.append(
      "text",
      text
    );

    if(file){

      formData.append(
        "file",
        file
      );

    }

    const result =
    await dispatch(
      sendMessage(formData)
    );

    if(result.payload){

      socket.emit(
        "sendMessage",
        {

          conversationId:
          selectedUser.conversationId,

          sender:
          user._id,

          receiver:
          selectedUser._id,

          text,

          file:
          result.payload.message.file,

          fileType:
          result.payload.message.fileType,

        }
      );

    }

    setText("");

    setFile(null);

  };

  // NO USER

  if(!selectedUser){

    return (

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-100">

        <h1 className="text-4xl font-bold text-slate-400">

          Select User

        </h1>

      </div>

    );

  }

  return (

    <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 via-white to-violet-100">

      {/* HEADER */}

      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4 flex items-center gap-4 shadow-sm">

        <img
          src={
            selectedUser.profileImage
          }
          alt=""
          className="w-14 h-14 rounded-full object-cover border-2 border-violet-300"
        />

        <div>

          <h2 className="font-bold text-xl text-slate-800">

            {selectedUser.name}

          </h2>

          <p className="text-sm text-green-500 font-medium">

            Online

          </p>

        </div>

      </div>

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {messages.map((msg,index)=>{

          const senderId =

            typeof msg.sender ===
            "object"

              ? String(
                  msg.sender._id
                )

              : String(
                  msg.sender
                );

          const isMe =

            senderId ===
            String(user?._id);

          return (

            <div
              key={index}

              className={`flex ${
                isMe
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[350px] px-5 py-3 rounded-3xl shadow-md ${
                  isMe

                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"

                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >

                {/* TEXT */}

                {msg.text && (

                  <p className="text-[15px] leading-relaxed">

                    {msg.text}

                  </p>

                )}

                {/* FILE */}

                {msg.file && (

                  <>
                    {msg.fileType?.includes(
                      "image"
                    ) ? (

                      <img
                        src={msg.file}
                        alt=""
                        className="w-56 rounded-2xl mt-3"
                      />

                    ) : (

                      <a
                        href={msg.file}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-sm"
                      >
                        Download File
                      </a>

                    )}
                  </>

                )}

              </div>

            </div>

          );

        })}

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}

      <div className="bg-white/80 backdrop-blur-lg border-t border-slate-200 p-4 flex gap-3 items-center">

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e)=>
            setText(
              e.target.value
            )
          }
          className="flex-1 p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition placeholder:text-slate-400"
        />

        <input
          type="file"
          onChange={(e)=>
            setFile(
              e.target.files[0]
            )
          }
          className="text-sm text-slate-600"
        />

        <button
          onClick={handleSend}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
        >

          Send

        </button>

      </div>

    </div>

  );

};

export default ChatBox;