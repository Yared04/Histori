"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import TimeControl from "../globe/timeline/TimeControl";
import TimeSlider from "../globe/timeline/TimeSlider";
import Header from "./Header";

const Earth = dynamic(() => import("../globe/Earth"), { ssr: false });

interface ClientComponentProps {
  children: React.ReactNode;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ children }) => {

  return (
    <div className="flex flex-col">
      <Header />
      <div className="relative">
        <div style={{ marginLeft: "-25%", marginTop: "-4%" }}>
          <Earth />
        </div>
        <div className="lg:absolute lg:right-[2%] lg:top-[5%] bg-zinc-800 px-8 rounded-lg w-[46vw] h-[85vh] overflow-y-auto">
          {children}
        </div>
        <div className="lg:absolute lg:bottom-0 lg:left-0 flex flex-col">
          <div className="w-full flex justify-start p-2">
            <TimeControl />
          </div>
          <div className="w-[28rem] h-14 bg-transparent flex items-center justify-between">
            <TimeSlider />
            {/* <div className="px-3">
            <TimeLapse />
          </div> */}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ClientComponent;
