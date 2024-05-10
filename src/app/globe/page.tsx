import React from "react";
import Earth from "./Earth";
import TimeLapse from "./TimeLapse";
import TimeControl from "./timeline/TimeControl";
import Timeline from "./timeline/TimeSlider";

const page = () => {
  return (
    <div className="relative">
      <Earth />

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
