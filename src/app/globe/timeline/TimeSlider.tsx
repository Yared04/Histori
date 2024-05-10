"use client";
import React, { useContext, useState } from "react";
import TimelineContext from "./TimelineContext";

const Timeline = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const { selectedYear, sliderPosition, updateYearAndSlider } = context;
  const years = [];
  for (let year = -3000; year <= 2500; year += 100) {
    if (year < 0) {
      years.push(`${Math.abs(year)} BC`);
    } else if (year === 0) {
      years.push("1 AD");
    } else {
      years.push(`${year} AD`);
    }
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = Number(event.target.value);
    updateYearAndSlider(newPosition);
  };

  return (
    <div className="flex w-full justify-start items-center">
      <div className="relative h-4 w-[40%] mx-4 flex flex-col justify-center space-y-2">
        <input
          type="range"
          min="0"
          max="100"
          step="0.0181818181818182"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="slider-input z-10 w-full h-[1px] appearance-none bg-opacity-50 bg-gray-300 rounded-lg cursor-pointer slider-thumb"
        />

        <div className="flex justify-between opacity-100 ">
          {years.map((year, idx) => {
            let currentYear = Number(year.split(" ")[0]);
            if (year.split(" ")[1] === "BC") {
              currentYear = -currentYear;
            }
            return (
              <div key={idx}>
                <span
                  className={`flex border-l  flex-shrink-0 flex-grow-0 w-0 items-center justify-center ${
                    currentYear % 500 === 0 || currentYear === 1
                      ? " h-2 "
                      : " h-1 "
                  } border-gray-300 `}
                ></span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between opacity-100 ">
          <span className="text-[0.5rem]">{years[0]}</span>
          <span className="text-[0.5rem]">{years[years.length - 1]}</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
