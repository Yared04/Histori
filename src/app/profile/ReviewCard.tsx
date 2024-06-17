"use client";
import { useRouter } from "next-nprogress-bar";
import React, { useContext, useRef, useState } from "react";
import { ArticleContext } from "../articles/ArticleContext";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import { Toast } from "primereact/toast";

interface ReviewCardProps {
  title: string;
  status: string;
  type: string;
  dueDate: string;
  id: string;
}
const ReviewCard: React.FC<ReviewCardProps> = (props) => {
  const dueDate = new Date(props.dueDate);
  const router = useRouter();
  const articleContext = useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("ArticleContext must be used within an ArticleProvider");
  }
  const { state } = articleContext;
  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Report Unclaimed!",
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

  const type = state.history ? "article" : "map";
  const handleClick = () => {
    if (props.status === "pending") {
      router.push(`/reviews/${type}/${props.id}`);
    }
  };

  const handleDelete = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showSuccess();
    } catch (error: any) {
      showError(error.response.data.message);
      console.error(error);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-gray-500 shadow hover:shadow-lg px-3 py-2 my-3 min-h-28 rounded-md mr-4"
    >
      <div className="flex justify-between">
        <p className="font-semibold">{props.title}</p>
        {props.status === "pending" && (
          <div className="self-center" onClick={(e)=>e.stopPropagation()}>
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
              <Dropdown.Item className="text-red-600" onClick={() => handleDelete(event)}>
                Unclaim Review
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="text-sm items-center mb-1">
        <p className="capitalize">Status: {props.status}</p>
        <p className="capitalize">Type: {props.type}</p>
        <p>Deadline: {dueDate.toDateString()}</p>
      </div>
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default ReviewCard;
