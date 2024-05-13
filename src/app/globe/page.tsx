"use client";
import React, { useState, useEffect, useContext } from "react";
import Earth from "./Earth";
import TimeLapse from "./TimeLapse";
import TimeControl from "./timeline/TimeControl";
import Timeline from "./timeline/TimeSlider";
import SideBar from "../articles/SideBar";
import TimelineContext from "./timeline/TimelineContext";
import { Event } from "../types/Event";


const page = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [openModals, setOpenModals] = useState<boolean[]>([]);
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const { selectedYear, country } = context;


  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `https://histori.onrender.com/api/history?year=${selectedYear}&country=${country}`
      );
      const events = await res.json();
      setOpenModals(new Array(events.length).fill(false));
      setEvents(events);
    };
    fetchEvents();
  }, [selectedYear, country]);

  return (
    <div className="relative">
      <div style={{ marginLeft: "-15%"}}>
        {/* Adjust the marginLeft value to move the Earth component to the left */}
        <Earth />
      </div>
      <div className="absolute right-10 top-20">
        <SideBar
          openModals={openModals}
          setOpenModals={setOpenModals}
          events={events}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-2">
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
