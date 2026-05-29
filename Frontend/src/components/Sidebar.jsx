import React from "react";

import SearchUsers from "./SearchUsers";
import Requests from "./Requests";
import ConversationList from "./ConversationList";

const Sidebar = () => {

  return (

    <div className="w-[300px] overflow-y-auto border-r border-slate-200 bg-white shadow-xl">

      <div className="min-h-screen p-4">

        {/* <SearchUsers /> */}

        {/* <Requests /> */}

        <ConversationList />

      </div>

    </div>

  );

};

export default Sidebar;