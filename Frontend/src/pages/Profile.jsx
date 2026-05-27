import React, { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getProfile,
} from "../features/user/userSlice";

const Profile = () => {

  const dispatch = useDispatch();

  const { profile } =
  useSelector((state)=>state.user);

  useEffect(()=>{

    dispatch(getProfile());

  },[]);

  if(!profile){
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">

        <img
          src={profile.profileImage}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />

        <h2 className="text-3xl font-bold text-center mt-4">
          {profile.name}
        </h2>

        <p className="text-center text-gray-300 mt-2">
          {profile.email}
        </p>

        <p className="text-center mt-2">
          {profile.phone}
        </p>

        <p className="text-center mt-2">
          {profile.address}
        </p>

        <p className="text-center mt-4">
          {profile.bio}
        </p>

      </div>

    </div>
  );
};

export default Profile;