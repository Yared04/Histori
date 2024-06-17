"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import TimeControl from "../globe/timeline/TimeControl";
import TimeSlider from "../globe/timeline/TimeSlider";
import Header from "./Header";
import Footer from "./Footer";

const Earth = dynamic(() => import("../globe/Earth"), { ssr: false });

interface ClientComponentProps {
  children: React.ReactNode;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ children }) => {

  return (
    <div className="flex flex-col bg-[url('/stars.png')]">
      <Header />
      <div className="relative">
        <div style={{ marginLeft: "-25%", marginTop: "-4%" }}>
          <Earth />
        </div>
        <div className="lg:absolute lg:right-[2%] lg:top-[3%] bg-gray-100 opacity-95 px-8 rounded-lg w-[46vw] h-[86vh] overflow-y-auto">
          {children}
        </div>
        <div className="lg:absolute lg:-bottom-2 lg:left-0 flex flex-col">
          <div className="w-full flex justify-start px-2">
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
      <Footer />
    </div>
  );
};

export default ClientComponent;
