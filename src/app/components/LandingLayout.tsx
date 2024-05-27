"use client";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../auth/UserContext";
import { useRouter } from "next/navigation";

const Landing = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const context = useContext(userContext);

  const { showLogin, setShowLogin } = context;
  const handleClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    setShowLogin!(true);
  }, []);

  return (
    <div className="bg-[url('/Earth0230.png')] h-screen w-screen bg-contain bg-no-repeat bg-center py-10 px-16 flex justify-between">
      <div className=" flex flex-col justify-around">
        <div className=" flex justify-between basis1/3">
          <h1
            onClick={() => {
              router.push("/");
            }}
            className="text-white cursor-pointer font-semibold text-6xl"
          >
            HISTOR<span className="text-blue-600">I</span>
          </h1>
        </div>
        <div className="basis-2/3 content-center">
          <h3 className="text-white font-normal text-6xl leading-normal">
            Discover <br /> the world as <br /> it was
          </h3>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <button
          onClick={handleClick}
          className="text-white font-normal text-xl leading-normal text-end"
        >
          {showLogin ? "Login" : ""}
        </button>

        {children}
        <div></div>
      </div>
    </div>
  );
};

export default Landing;
