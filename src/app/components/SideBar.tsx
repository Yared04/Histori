"use client";
import React, { useState } from "react";
import EventItem from "../articles/ArticleItem";
import { Event } from "../types/Event";
import ArticleDetail from "../articles/ArticleDetail";

interface SideBarProps {
  events: Event[];
  openModals: boolean[];
  setOpenModals: (openModals: boolean[]) => void;
}

const SideBar = ({ events, openModals, setOpenModals }: SideBarProps) => {
  //  const events = [
  //     {
  //       title: "The First World War",
  //       content:
  //         "The First World War was a global war originating in Europe that lasted from 28 July 1914 to 11 November 1918.",
  //       image: "",
  //       start_year: 1914,
  //       end_year: 1918,
  //       categories: ["war"],
  //       _id: "1",
  //     },
  //     {
  //       title: "The Second World War",
  //       content:
  //         "The Second World War was a global war that lasted from 1939 to 1945.",
  //       image: "",
  //       start_year: 1939,
  //       end_year: 1945,
  //       categories: ["war"],
  //       _id: "2",
  //     },
  //     {
  //       title: "The Cold War",
  //       content:
  //         "The Cold War was a period of geopolitical tension between the Soviet Union and the United States and their respective allies.",
  //       image: "",
  //       start_year: 1947,
  //       end_year: 1991,
  //       categories: ["war"],
  //       _id: "3",
  //     },
  //   ];

  return (
    <div className="flex flex-col gap-6">
      <form className="flex items-center max-w-lg">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search articles..."
            required
          />
        </div>
        <button
          type="submit"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <div className=" flex flex-col gap-3">
        {events?.map((event, idx: number) =>
          !openModals[idx] ? (
            <div key={idx}>
              <EventItem
                title={event.title}
                description={event.content}
                image={event.image}
                startYear={event.start_year}
                endYear={event.end_year}
                openModals={openModals}
                setOpenModals={setOpenModals}
                idx={idx}
              />
            </div>
          ) : (
            <div key={idx}>
              <ArticleDetail
                event={event}
                openModals={openModals}
                setOpenModals={setOpenModals}
                startYear={event.start_year}
                endYear={event.end_year}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
