"use client";
import React, { useState } from "react";
import EventItem from "./EventItem";
import Image from "next/image";
import { Event } from "../types/Event";
import Tag from "./Tag";
import { Banner, Button, Dropdown, Modal } from "flowbite-react";
import { HiX } from "react-icons/hi";
import axios from "axios";
import { content } from "flowbite-react/tailwind";

interface SideBarProps {
  events: Event[];
  openModals: boolean[];
  setOpenModals: (openModals: boolean[]) => void;
}

const SideBar = ({ events, openModals, setOpenModals }: SideBarProps) => {
  const [openModal2, setOpenModal2] = useState(false);
  const [reason, setReason] = useState("");

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];


  const handleOpenDetial = (idx: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[idx] = true;
    setOpenModals(newOpenModals);
  };

  const handleCloseDetail = (idx: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[idx] = false;
    setOpenModals(newOpenModals);
  };

  const handleReportSubmit = async (id: string) => {
    console.log(reason);
    //send request to the backend
    try{
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reports`,
        {
          reason: reason,
          contentId: id,
          type: "History"
        }
      );
    }catch(error){
      console.log(error);
    }   
    setReason("");
    setOpenModal2(false);
  };

  return (
    <div className="bg-gray-800 opacity-70  pt-8 px-8 flex flex-col gap-6 rounded-lg w-[46vw] h-[100vh]">
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
        
            <div
              onClick={() => handleOpenDetial(idx)}
              key={idx}
              className="flex flex-col gap-3 cursor-pointer"
            >
              <EventItem
                title={event.title}
                description={event.content}
                image={event.image}
              />
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <div className="basis-[70%]">
                  <h1 className="p-2 text-xl text-white">{event.title}</h1>
                  <div className="p-2 no-scrollbar">
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
                      <p className="text-sm leading-relaxed max-h-[32rem] text-white overflow-y-scroll no-scrollbar">
                        {event.content}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="basis-[30%] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-end">
                      {/* <Banner.CollapseButton
                      color="gray"
                      className="border-0 bg-transparent text-white hover:text-gray-300 focus:outline-none focus:ring-0 focus:border-transparent"
                      onClickCapture={() => handleCloseDetail(idx)}
                    >
                      <HiX className="h-4 w-4" />
                    </Banner.CollapseButton> */}
                      <Dropdown
                        label=""
                        size="sm"
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="cursor-pointer hover:text-gray-600 hover:shadow-lg focus:ring-0">
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                          </span>
                        )}
                      >
                        <Dropdown.Item
                          onClick={() => {
                            setOpenModal2(true);
                          }}
                          className="text-red-500 hover:text-red-600  dark:text-red-500 dark:hover:text-red-400"
                        >
                          Report Article
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                    <div className="shadow-lg bg-blue-700 rounded-md p-2 max-h-24 mt-20">
                      <p className="text-center font-semibold text-white mb-1">
                        Categories
                      </p>
                      <div className="flex gap-2">
                        {event.categories.map((tag, idx) => (
                          <Tag name={tag} color={colors[idx]} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end z-10">
                    <Button  onClick={() => handleCloseDetail(idx)} color="blue">
                      Finish
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-5 flex gap-9 justify-end">
                <Modal
                  show={openModal2}
                  onClose={() => setOpenModal2(false)}
                  title="Report Article"
                  size="lg"
                >
                  <Modal.Header>Report Article</Modal.Header>
                  <Modal.Body>
                    <h3 className="font-medium mb-4 dark:text-white">
                      Describe your reason for reporting this article:
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
                  </Modal.Body>
                  <button
                    onClick={() => handleReportSubmit(event._id)}
                    className="mx-auto mb-5 py-3 px-6 bg-blue-700 text-white rounded-md"
                  >
                    Report
                  </button>
                </Modal>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
