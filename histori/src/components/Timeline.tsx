import React, { useContext, useState } from "react";
import { YearContext, EventsContext } from "@/pages/_app";


const Timeline = () => {

  const { selectedYear, setSelectedYear } = useContext(YearContext);

  const years = [
    "3000 BC",
    "2500 BC",
    "2000 BC",
    "1500 BC",
    "1000 BC",
    "500 BC",
    "1 AD",
    "500 AD",
    "1000 AD",
    "1500 AD",
    "2000 AD",
    "2500 AD",
  ];

  const [sliderPosition, setSliderPosition] = useState(0);
  const updateYearAndSlider = (newPosition: number) => {
    setSliderPosition(newPosition);

    // Calculate the new year based on the slider's position
    var currentYear;
    var newCurrentYear = 54.99999999999995 * newPosition;
    newCurrentYear < 3000
      ? (currentYear = Math.round(3000 - newCurrentYear).toString() + " BC")
      : (currentYear = Math.round(newCurrentYear - 3000).toString() + " AD");

    setSelectedYear(currentYear);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = Number(event.target.value);
    updateYearAndSlider(newPosition);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button
          step="&nbsp;100"
          direction="left"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
        <Button
          step="&nbsp;&nbsp;10"
          direction="left"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
        <Button
          step="&nbsp;&nbsp;&nbsp;1"
          direction="left"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
      </div>
      <p className="text-3xl text-white font-bold self-center">{selectedYear}</p>
      <div className="flex gap-2">
        <Button
          step="1&nbsp;&nbsp;&nbsp;"
          direction="right"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
        <Button
          step="10&nbsp;&nbsp;"
          direction="right"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
        <Button
          step="100&nbsp;"
          direction="right"
          sliderPosition={sliderPosition}
          updateYearAndSlider={updateYearAndSlider}
        />
      </div>
      <div className="relative h-6 w-4/6 mx-12">
        <input
          type="range"
          min="0"
          max="100"
          step="0.0181818181818182"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="slider-input absolute top-3 z-10 w-full h-4 appearance-none bg-blue-400 bg-opacity-50 rounded-sm cursor-pointer"
        />

        <div className="flex justify-between opacity-100 ">
          {years.map((year, idx) => {
            return (
              <div key={idx}>
                <span className="relative flex border bg-white border-white h-10 w-1">
                  <p className="absolute top-12 text-white font-medium">
                    {year}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface ButtonProps {
  step: string;
  direction: string;
  sliderPosition: number;
  updateYearAndSlider: (newPosition: number) => void;
}
const Button = ({
  step,
  direction,
  sliderPosition,
  updateYearAndSlider,
}: ButtonProps) => {
  const handleClick = () => {

    // Convert the step value to a number (remove non-digit characters)
    const stepValue = Number(step.replace(/\D/g, ""));

    // Determine the direction of the change based on the button's direction prop
    const directionMultiplier = direction === "right" ? 1 : -1;

    // Calculate the new position and call the update function
    const newPosition =
      sliderPosition + stepValue * 0.0181818181818182 * directionMultiplier;

      if (newPosition < 0 || newPosition > 99.9818181818182){
        return;
      }
    console.log(newPosition);
    updateYearAndSlider(newPosition);
  };

  return (
    <button
      className={` relative z-10 w-0 h-0 
        border-t-[25px] border-t-transparent
        ${
          direction === "right"
            ? "border-l-[35px] border-l-blue-500"
            : "border-r-[35px] border-r-blue-500"
        }
        border-b-[25px] border-b-transparent
        active:opacity-50 


      `}
      onClick={handleClick}
   
    >
      <p
        className={`absolute text-white text-xs font-bold ${
          direction === "left" ? " left-2 -top-2.5 " : "right-2 -top-2.5"
        }`}
      >
        {step}
      </p>
    </button>
  );
};

export default Timeline;
