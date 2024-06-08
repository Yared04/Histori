"use client";
import React, { useState, useEffect } from "react";
import EventItem from "../articles/ArticleItem";
import { Event } from "../types/Event";
import ArticleDetail from "../articles/ArticleDetail";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface SideBarProps {
  events: Event[];
}

const SideBar = ({ events }: SideBarProps) => {
  const [search, setSearch] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedEventIdx, setSelectedEventIdx] = useState<number | null>(null);

  const handleBackClick = () => {
    setSelectedEventIdx(null);
  };

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleSearch = (query: string) => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleSearch(search);
  }, [search, events]);

  return (
    <div className="flex flex-col gap-6">
      {selectedEventIdx === null && (
        <div className="flex items-center max-w-lg">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search articles..."
            />
          </div>
          <button
            type="button"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {selectedEventIdx === null
          ? filteredEvents?.map((event, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedEventIdx(idx);
                }}
              >
                <EventItem
                  title={event.title}
                  description={event.content}
                  image={event.image}
                  startYear={event.start_year}
                  endYear={event.end_year}
                />
              </div>
            ))
          : events.length > selectedEventIdx && (
              <div>
                <button
                  onClick={handleBackClick}
                  className="text-white text-xs hover:text-blue-700 mb-4"
                >
                  <span className="flex gap-2">
                    <FaLongArrowAltLeft className="self-center" />{" "}
                    <p>Back to articles</p>
                  </span>
                </button>
                <ArticleDetail
                  event={events[selectedEventIdx]}
                  startYear={events[selectedEventIdx].start_year}
                  endYear={events[selectedEventIdx].end_year}
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default SideBar;
