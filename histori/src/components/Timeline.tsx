import React, { useState } from "react";

const Timeline = () => {
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
  ];

  const [currentYear, setCurrentYear] = useState("2024");
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleSliderChange = (event: any) => {
    const newPosition = event.target.value;
    console.log(newPosition);
    setSliderPosition(newPosition);

    // Calculate the current year based on the slider position and the total number of years
    const totalYears = years.length - 1;
    const yearIndex = Math.round((newPosition / 100) * totalYears);
    var newCurrentYear = years[yearIndex];
    var temp = newCurrentYear && newCurrentYear.split(" ");

    newPosition < 60
      ? (newCurrentYear = (3000 - newPosition * 50).toString() + " BC")
      : (newCurrentYear = (newPosition * 50 - 3000).toString() + " AD");
    setCurrentYear(newCurrentYear.toString());
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button step="&nbsp;100" direction="left" />
        <Button step="&nbsp;&nbsp;10" direction="left" />
        <Button step="&nbsp;&nbsp;&nbsp;Y" direction="left" />
      </div>
      <p className="text-3xl text-white font-bold self-center">{currentYear}</p>
      <div className="flex gap-2">
        <Button step="Y&nbsp;&nbsp;&nbsp;" direction="right" />
        <Button step="10&nbsp;&nbsp;" direction="right" />
        <Button step="100&nbsp;" direction="right" />
      </div>
      <div className="relative h-6 w-4/6 mx-12">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="slider-input absolute z-10 top-2 w-full h-4 appearance-none bg-blue-400 bg-opacity-50 rounded-sm cursor-pointer"
        />

        <div className="flex justify-between opacity-100">
          {years.map((year, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-3 items-center">
                <span className="border bg-white border-white h-8 w-1"></span>
                <p className="text-white font-medium">{year}</p>
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
}

const Button = ({ step, direction }: ButtonProps) => {
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
      `}
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
