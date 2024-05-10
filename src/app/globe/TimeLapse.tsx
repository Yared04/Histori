import React from "react";
import { MdTimeline } from "react-icons/md";
import Tooltip from "./ToolTip";

const TimeLapse: React.FC = () => {
  return (
    <Tooltip text="Time Lapse">
      <div className="group rounded-full hover:bg-white hover:bg-opacity-20 cursor-pointer text-xl p-2">
        <MdTimeline />
      </div>
    </Tooltip>
  );
};

export default TimeLapse;
