"use client";
import { useRouter } from "next-nprogress-bar";
import React, { useContext, useState } from "react";
import { ArticleContext } from "../articles/ArticleContext";

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

  const type = state.history ? "article" : "map";
  const handleClick = () => {
    console.log(type)
    if (props.status === "pending") {
      router.push(`/reviews/${type}/${props.id}`);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-gray-500 shadow hover:shadow-lg px-3 py-2 my-3 min-h-28 rounded-md mr-4"
    >
      <div className="flex justify-between">
        <p className="font-semibold">{props.title}</p>
      </div>
      <div className="text-sm items-center mb-1">
        <p className="capitalize">Status: {props.status}</p>
        <p className="capitalize">Type: {props.type}</p>
        <p>Deadline: {dueDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
