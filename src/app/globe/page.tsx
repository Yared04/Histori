"use client";
import React, { useState } from "react";
import Earth from "./Earth";
import TimeLapse from "./TimeLapse";
import TimeControl from "./timeline/TimeControl";
import Timeline from "./timeline/TimeSlider";
import SideBar from "../articles/SideBar";

const page = () => {
  const [openModals, setOpenModals] = useState<boolean[]>([]);

  return (
    <div className="relative">
      <div className="flex">
        <div className="basis-4/5">
          {" "}
          <Earth />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-2 ">
        <div className="w-full flex justify-start p-2">
          <TimeControl />
        </div>

        <div className="w-full h-14 bg-black shadow-white shadow-lg flex items-center justify-between">
          <Timeline />
          <div className="py-1 px-3">
            <TimeLapse />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
