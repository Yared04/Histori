"use client";
import { report } from "process";
import React from "react";

interface ReportItemProps {
  title: string;
  description: string;
  // image: string;
  reportDate: Date;
}

const ReportItem = ({
  // image,
  title,
  description,
  reportDate,
}: ReportItemProps) => {

  const createdDate = new Date(reportDate)

  let deadline = new Date(reportDate);
  deadline.setDate(createdDate.getDate() + 7)

  return (
    <div className="block bg-zinc-700 p-4 overflow-hidden max-h-96 cursor-pointer  text-white max-w-fill rounded-lg">
      {/* <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      /> */}
      <div>
        <h1 className="text-xl font-bold mb-1">Report Title: {title}</h1>
        <p className="text-xs mb-3">Reported Date: {createdDate?.toDateString()}</p>
        {/* <p className="text-xs mb-3">Deadline: {deadline?.toDateString()}</p> */}

        <p className="my-1 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ReportItem;
