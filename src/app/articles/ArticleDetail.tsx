import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal, Dropdown } from "flowbite-react";
import Tag from "./Tag";
import { Event } from "@/app/types/Event";
import axios from "axios";

interface ArticleDetailProps {
  event: Event;
  openModals: boolean[];
  setOpenModals: (openModals: boolean[]) => void;
  startYear: number;
  endYear: number;
}

const ArticleDetail = ({
  event,
  openModals,
  setOpenModals,
  startYear,
  endYear,
}: ArticleDetailProps) => {
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

  const idx = openModals.findIndex((modal) => modal);

  const handleCloseDetail = (idx: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[idx] = false;
    setOpenModals(newOpenModals);
  };

  const handleReportSubmit = async (id: string) => {
    console.log(reason);
    //send request to the backend
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reports`,
        {
          reason: reason,
          contentId: id,
          type: "History",
        }
      );
    } catch (error) {
      console.log(error);
    }
    setReason("");
    setOpenModal2(false);
  };

  return (
    <>
      <div className="flex gap-2 text-white min-h-72">
        <div className="basis-[70%]">
          <h1 className="p-2 text-xl font-bold ">{event.title}</h1>
          <p className="text-xs pl-2">
            From {startYear} to {endYear}
          </p>

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
              <p className="text-sm leading-relaxed max-h-[70vh] text-white overflow-y-scroll no-scrollbar">
                {event.content}
              </p>
            </div>
          </div>
        </div>
        <div className="basis-[30%] flex flex-col">
          <div className="basis-1/12 flex justify-end">
            <Dropdown
              label=""
              size="sm"
              dismissOnClick={false}
              renderTrigger={() => (
                <span>
                  <svg
                    className="w-5 h-5 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </span>
              )}
            >
              <Dropdown.Item className="text-red-600" onClick={()=>{setOpenModal2(true)}}>Report Article</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="basis-11/12 flex flex-col justify-between">
            <div className="shadow-lg bg-blue-700 rounded-md p-2 max-h-24 mt-20">
              <p className="text-center font-semibold text-white mb-1">
                Categories
              </p>
              <div className="flex gap-2">
                {event.categories.map((tag, idx) => (
                  <Tag name={tag} color={colors[idx]} key={idx} />
                ))}
              </div>
            </div>
            <div className="flex justify-end z-10">
              <Button  onClick={() => handleCloseDetail(idx)} color="blue">
                Finish
              </Button>
            </div>
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
  );
};

export default ArticleDetail;
