import React from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

const Dashboard = () => {

  return (
    <div className="h-screen flex flex-col">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <ChatBox />

      </div>

    </div>
  );
};

export default Dashboard;