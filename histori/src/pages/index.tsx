import SideBar from "@/components/SideBar";
import Timeline from "@/components/Timeline";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { YearContext, EventsContext } from "./_app";
import * as d3 from "d3";

// Dynamically import the Earth component, which presumably uses the problematic package
const Earth = dynamic(
  () => import("@/components/Earth"), // replace with the actual path to your Earth component
  { ssr: false } // This will load the component only on client side
);

const Home: React.FC = () => {
  const { selectedYear } = useContext(YearContext);
  const { events } = useContext(EventsContext);
  const [displayYear, setDisplayYear] = useState(-3000);
  const availableyears = [
    -123000, -10000, -8000, -5000, -4000, -3000, -2000, -1500, -1000, -700,
    -500, -400, -323, -300, -200, -100, -1, 100, 200, 300, 400, 500, 600, 700,
    800, 900, 1000, 1100, 1200, 1300, 1400, 1492, 1500, 1530, 1600, 1650, 1700,
    1715, 1783, 1800, 1815, 1880, 1900, 1914, 1920, 1938, 1945, 1960, 1994,
    2000, 2010,
  ];

  useEffect(() => {
    // const fetchAfterDelay = setTimeout(() => {
    const [year, time] = selectedYear.split(" ");
    let tempYear = time === "BC" ? -parseInt(year, 10) : parseInt(year, 10);

    const closestYearIdx = d3.bisectRight(availableyears, tempYear);
    setDisplayYear(
      availableyears[closestYearIdx] - tempYear <
        tempYear - availableyears[closestYearIdx - 1]
        ? availableyears[closestYearIdx]
        : availableyears[closestYearIdx - 1]
    );

  }, [selectedYear]);

  return (
    <div className="pt-10 px-8">
      <div className="relative z-10 w-full">
        <Timeline />
      </div>
      <div className="flex items-center">
        <div className="basis-3/5">
          <Earth selectedYear={displayYear} />
        </div>

        <div className="basis-2/5 mt-12">
          <SideBar events={events} />
        </div>
      </div>
    </div>
  );
};

export default Home;
