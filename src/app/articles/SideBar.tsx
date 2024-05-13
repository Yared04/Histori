"use client";
import React, { useState } from "react";
import EventItem from "./EventItem";
import { Modal, FloatingLabel } from "flowbite-react";
import Image from "next/image";
import { Event } from "../types/Event";

interface SideBarProps {
  events: Event[];
  openModals: boolean[];
  setOpenModals: (openModals: boolean[]) => void;
}

const SideBar = ({ events, openModals, setOpenModals }: SideBarProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [reason, setReason] = useState("");

  const handleEventClick = (index: number) => {
    const updatedModals = [...openModals];
    updatedModals[index] = true; // Open the modal for the clicked event
    setOpenModals(updatedModals);
  };

  const handleModalClose = (index: number) => {
    const updatedModals = [...openModals];
    updatedModals[index] = false; // Close the modal for the clicked event
    setOpenModals(updatedModals);
  };

  const handleReportSubmit = () => {
    console.log(reason);
    setOpenModal2(false);
  };

  return (
    <div className="bg-gray-800 opacity-75 w-full  p-8 flex flex-col gap-6 rounded-lg">
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

      <div className="min-h-96 max-h-[28rem] w-[30rem] overflow-y-scroll no-scrollbar flex flex-col gap-3">
        {events?.map((event, idx: number) => (
          <>
            <div
              onClick={() => handleEventClick(idx)}
              key={idx}
              className="flex flex-col gap-3 cursor-pointer"
            >
              <EventItem
                title={event.title}
                description={event.content}
                image={event.image}
              />
            </div>
            <Modal
              className="scroll-auto no-scrollbar"
              show={openModals[idx]}
              onClose={() => handleModalClose(idx)}
            >
              <Modal.Header className="p-5">{event.title}</Modal.Header>
              <Modal.Body className="p-5 border border-t-gray-200 no-scrollbar">
                <div className="space-y-6">
                  <div className="">
                    {event.image && (
                      <Image
                        src={event.image}
                        alt="Picture of the article"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {event.content}
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer className="p-5  flex gap-2 justify-around">
                {!openModal2 ? (
                  <button
                    className="flex gap-1 text-red-400"
                    onClick={() => {
                      setOpenModal2(!openModal2);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 -2 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                      />
                    </svg>
                    Report this article
                  </button>
                ) : (
                  <button
                    className="text-green-600"
                    onClick={() => {
                      setOpenModal2(!openModal2);
                    }}
                  >
                    Go back
                  </button>
                )}
                {openModal2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Describe your reason for reporting this article
                    </h3>
                    <div>
                      <textarea
                        rows={7}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Type your reason here"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <button
                        onClick={handleReportSubmit}
                        className="w-full p-3 bg-green-600 text-white rounded-md"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                )}
              </Modal.Footer>
            </Modal>
          </>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
