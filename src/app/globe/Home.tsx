"use client";
import React, { useState, useEffect, useContext } from "react";
import Earth from "./Earth";
import TimeLapse from "./TimeLapse";
import TimeControl from "./timeline/TimeControl";
import Timeline from "./timeline/TimeSlider";
import SideBar from "../articles/SideBar";
import TimelineContext from "./timeline/TimelineContext";
import { Event } from "../types/Event";
import { Avatar } from "flowbite-react";
import { userContext } from "../auth/UserContext";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [openModals, setOpenModals] = useState<boolean[]>([]);
  const context = useContext(TimelineContext);
  const { curUser } = useContext(userContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const { selectedYear, country } = context;

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/histories?year=${selectedYear}&country=${country}`
      );
      const events = await res.json();
      setOpenModals(new Array(events.length).fill(false));
      setEvents(events);
    };
    fetchEvents();
  }, [selectedYear, country]);

  return (
    <div className="relative">
      <div style={{ marginLeft: "-25%", marginTop: "-0.5%" }}>
        {/* Adjust the marginLeft value to move the Earth component to the left */}
        <Earth />
      </div>
      <div className="absolute right-0 top-0 bg-gray-800 opacity-70  pt-8 px-8 rounded-lg w-[46vw] h-[100vh]">
        <SideBar
          openModals={openModals}
          setOpenModals={setOpenModals}
          events={events}
        />
      </div>
      <div className="absolute bottom-0 left-0 flex flex-col">
        <div className="w-full flex justify-start p-2">
          <TimeControl />
        </div>

        <div className="w-[28rem] h-14 bg-transparent flex items-center justify-between">
          <Timeline />
          {/* <div className="px-3">
            <TimeLapse />
          </div> */}
        </div>
      </div>
      {curUser && (
        <div className="absolute top-7 left-5">
          <Avatar
            placeholderInitials={curUser?.email.charAt(0).toUpperCase()}
            rounded
          />
        </div>
      )}
    </div>
  );
};

export default Home;
