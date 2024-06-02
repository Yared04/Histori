"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import SideBar from "../components/SideBar";
import TimelineContext from "./timeline/TimelineContext";
import { Event } from "../types/Event";
import ClientComponent from "../components/ClientComponent";
import { useDebouncedValue } from "./Earth";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [openModals, setOpenModals] = useState<boolean[]>([]);
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }

  const { selectedYear, country, isYearTransitionPending } = context;

  const fetchEvents = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/histories?year=${selectedYear}&country=${country}`
    );
    console.log(res);
    const events = await res.json();
    setOpenModals(new Array(events.length).fill(false));
    setEvents(events);
  };

  const debouncedYear = useDebouncedValue(selectedYear, 1000);

  useEffect(() => {
    fetchEvents();
  }, [debouncedYear, country]);

  return (
    <ClientComponent>
      <SideBar
        openModals={openModals}
        setOpenModals={setOpenModals}
        events={events}
      />
    </ClientComponent>
  );
};

export default Home;
