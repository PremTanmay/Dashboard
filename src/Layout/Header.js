import React from "react";

import { HiQuestionMarkCircle } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";

export const Header = () => {
 
  return (
    <div className="md:h-14 md:flex justify-between item-center flex-wrap 
     bg-gradient-to-r from-white to-pink-50 px-4 sm:grid">
      <div className="flex flex-col justify-center ">
        <div className=" 	">welcome, </div>
        <div> Brooklyn simmons</div>
      </div>
      <div className=" flex items-center  ">
        <input
          name="searchinput"
          placeholder="Find Something"
          className=" border border-gray-300 rounded-lg md:w-[600px] p-2 shadow-sm shadow-slate-500/50   "
        />
      </div>

      <div className="flex items-center  space-x-2 rounded-full border-red-500 justify-center ">
        <div className="">
          {" "}
          <HiQuestionMarkCircle />{" "}
        </div>
        <div className=" ">
          <IoIosNotifications />
        </div>
      </div>
    </div>
  );
};
export default Header;
