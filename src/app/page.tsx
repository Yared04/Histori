"use client";
import Login from "@/app/auth/Login";
import Signup from "@/app/auth/Signup";
import React, { useState } from "react";

const index = () => {
  const [showlogin, setShowLogin] = useState(false);
  return (
    <div className="bg-[url('/Earth0230.png')] h-screen w-screen bg-contain bg-no-repeat bg-center py-10 px-16 flex justify-between">
      <div className=" flex flex-col justify-around">
        <div className=" flex justify-between basis1/3">
          <h1 className="text-white font-semibold text-6xl">
            HISTOR<span className="text-blue-600">I</span>
          </h1>
        </div>
        <div className="basis-2/3 content-center">
          <h3 className="text-white font-normal text-6xl leading-normal">
            Discover <br /> the world as <br /> it was
          </h3>
        </div>
      </div>
      <div className="self-center">
        {showlogin ? (
          <Login setShowLogin={setShowLogin} />
          ):(
            <Signup setShowLogin={setShowLogin} />
          )}
        
      </div>
    </div>
  );
};

export default index;
