"use client";
import { report } from "process";
import React from "react";

interface ReportItemProps {
  title: string;
  description: string;
  image: string;
  reportDate: number;
}

const ReportItem = ({
  image,
  title,
  description,
  reportDate,
}: ReportItemProps) => {
  return (
    <div className="block overflow-hidden max-h-96 cursor-pointer border-b-2 text-white max-w-fill p-2 rounded">
      {/* <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      /> */}
      <div>
        <h1 className="text-xl font-bold mb-1">Report Title: {title}</h1>
        <p className="text-xs mb-3">Reported Date: {reportDate}</p>
        <p className="text-xs mb-3">Deadline: {}</p>

        <p className="my-1 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ReportItem;
