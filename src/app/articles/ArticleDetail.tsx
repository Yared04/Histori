"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Modal, Dropdown } from "flowbite-react";
import Tag from "../components/Tag";
import { Event } from "@/app/types/Event";
import axios from "axios";
import { Toast } from "primereact/toast";

interface ArticleDetailProps {
  event: Event;
  startYear: number;
  endYear: number;
}

const ArticleDetail = ({ event, startYear, endYear }: ArticleDetailProps) => {
  const [openModal2, setOpenModal2] = useState(false);
  const [reason, setReason] = useState("");
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Report Submitted!",
      life: 2000,
    });
  };

  const showError = (detail: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: detail,
      life: 2000,
    });
  };

  const handleReportSubmit = async (id: string) => {
    console.log(reason);
    //send request to the backend
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reports`,
        {
          reason: reason,
          content_id: id,
          type: "History",
          title: event.title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      showSuccess();
    } catch (error: any) {
      console.error(error);
      showError(error.response.data.message);
    }
    setReason("");
    setOpenModal2(false);
  };

  return (
    <div className="text-white min-h-72">
      {event.image && (
        <Image
          src={event.image}
          alt="Picture of the article"
          width={100}
          height={100}
          className="w-full h-56 object-fill rounded-lg"
        />
      )}
      <div className="sticky top-0 z-10">
        <div className="flex justify-between">
          <h1 className="p-2 text-xl font-bold ">{event.title}</h1>
          <div className="self-center">
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
              <Dropdown.Item
                className="text-red-600"
                onClick={() => {
                  setOpenModal2(true);
                }}
              >
                Report Article
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <p className="text-xs pl-2">
          From {startYear} to {endYear}
        </p>
        <div className="flex gap-2 pl-2 py-4 flex-wrap">
          {event.categories.map((tag, idx) => (
            <Tag name={tag} key={idx} />
          ))}
        </div>
      </div>
      <div className="p-2 overflow-y-auto max-h-[60vh]">
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-white">{event.content}</p>
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
            className="mx-auto mb-5 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Report
          </button>
        </Modal>
      </div>
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default ArticleDetail;
