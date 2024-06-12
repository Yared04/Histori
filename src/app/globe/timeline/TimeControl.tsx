"use client";
import React, { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Tooltip from "../ToolTip";
import TimelineContext from "./TimelineContext";
import Loading from "@/app/components/Loading";

const TimeControl = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const {
    displayYear,
    setDisplayYear,
    selectedYear,
    setSelectedYear,
    sliderPosition,
    setSliderPosition,
    isYearTransitionPending,
  } = context;


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

  const handleYearChange = (e: any) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue)) {
      setDisplayYear(parsedValue);

      // Update selected year with AD/BC notation
      const formattedYear =
        parsedValue > 0 ? `${parsedValue} AD` : `${Math.abs(parsedValue)} BC`;
      setSelectedYear(formattedYear);

      // Adjust the slider position calculation
      const maxYear = 2500; // Assuming the range is from 3000 BC to 3000 AD
      const minYear = -3000;

      const clampedValue = Math.max(minYear, Math.min(maxYear, parsedValue));
      const newPosition =
        ((clampedValue - minYear) / (maxYear - minYear)) * 100;

      if (newPosition >= 0 && newPosition <= 100) {
        setSliderPosition(newPosition);
      }
    }
  };


  return (
    <div className="flex items-center space-x-2">
      <div className="flex gap-2 p-1 bg-white bg-opacity-5 rounded-full">
        <div className="text-white text-lg flex items-center p-1">
          <AiOutlineMinus />
        </div>

        <Button
          step="100"
          direction="left"
          size={3}
          sliderPosition={sliderPosition}
        />
        <Button
          step="10"
          direction="left"
          size={2}
          sliderPosition={sliderPosition}
        />
        <Button step="1" direction="left" sliderPosition={sliderPosition} />
      </div>
      <div className="w-20 flex justify-center">
        <input
          type="number"
          className="text-md text-white font-semibold w-16 -mx-2 self-center bg-transparent border-none text-center no-spinner focus:outline-none focus:ring-0"
          value={displayYear}
          onChange={handleYearChange}
        />
        <span className="text-md text-white font-semibold self-center">
          {selectedYear && selectedYear.split(" ")[1]}
        </span>
      </div>

      <div className="flex gap-2 p-1 bg-white bg-opacity-5 rounded-full">
        <Button step="1" direction="right" sliderPosition={sliderPosition} />
        <Button
          step="10"
          direction="right"
          size={2}
          sliderPosition={sliderPosition}
        />

        <Button
          step="100"
          direction="right"
          size={3}
          sliderPosition={sliderPosition}
        />

        <div className="text-white text-lg flex items-center p-1">
          <AiOutlinePlus />
        </div>
      </div>

      {isYearTransitionPending && <Loading />}
    </div>
  );
};

export default TimeControl;

interface ButtonProps {
  step: string;
  direction: string;
  sliderPosition: number;
  size?: number;
}
const Button = ({ step, direction, sliderPosition, size }: ButtonProps) => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const { updateYearAndSlider } = context;
  const handleClick = () => {
    // Convert the step value to a number (remove non-digit characters)
    const stepValue = Number(step.replace(/\D/g, ""));

    // Determine the direction of the change based on the button's direction prop
    const directionMultiplier = direction === "right" ? 1 : -1;

    // Calculate the new position and call the update function
    const newPosition =
      sliderPosition + stepValue * 0.0181818181818182 * directionMultiplier;

    if (newPosition < 0 || newPosition > 99.9818181818182) {
      return;
    }

    updateYearAndSlider(newPosition);
  };

  return (
    <Tooltip
      text={(direction === "right" ? "Add " : "Minus ") + step + " year"}
    >
      <div
        onClick={handleClick}
        className={`relative rounded-full w-8 h-8 bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer flex  justify-center items-center`}
      >
        <span className="text-white font-semibold text-[0.5rem] ">{step}</span>
      </div>
    </Tooltip>
  );
};
