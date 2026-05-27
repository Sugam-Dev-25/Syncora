import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getRequests,
  acceptRequest,
  rejectRequest,
} from "../features/request/requestSlice";

const Requests = () => {

  const dispatch = useDispatch();

  const { requests } =
  useSelector((state)=>state.request);

  useEffect(()=>{

    dispatch(getRequests());

  },[]);

  return (

    <div className="mt-6">

      <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 px-2">

        Friend Requests

      </h2>

      <div className="space-y-2">

        {requests.map((req)=>(

          <div
            key={req._id}
            className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between hover:bg-slate-50 transition"
          >

            <div className="flex items-center gap-3">

              <div className="relative">

                <img
                  src={req.sender.profileImage}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="w-3 h-3 bg-red-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>

              </div>

              <div>

                <h2 className="font-bold text-slate-800">

                  {req.sender.name}

                </h2>

                <p className="text-sm text-slate-500">

                  Wants to connect

                </p>

              </div>

            </div>

            <div className="flex gap-2">

              <button
                onClick={()=>
                  dispatch(acceptRequest(req._id))
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold"
              >

                Accept

              </button>

              <button
                onClick={()=>
                  dispatch(rejectRequest(req._id))
                }
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-semibold"
              >

                Reject

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Requests;