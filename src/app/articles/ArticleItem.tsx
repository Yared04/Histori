"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface EventItemProps {
  title: string;
  description: string;
  image: string;
  startYear: number;
  endYear: number;
}

const EventItem = ({
  image,
  title,
  description,
  startYear,
  endYear,
}: EventItemProps) => {
  return (
    <div className="block overflow-hidden max-h-96 cursor-pointer border-b-2 border-black max-w-fill mr-3 p-2 rounded">
      {image && (
        <div>
          <Image
            className="object-cover w-full h-36 md:h-48 lg:h-36"
            src={image}
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </div>
      )}

      <div>
        <h1 className="text-xl font-bold my-1">{title}</h1>
        <p className="text-xs mb-3">
          From {startYear} to {endYear}
        </p>
          <ReactQuill
            value={description}
            readOnly={true}
            theme={"bubble"}
            className="text-sm custom-quill cursor-pointer"
          />
      </div>
    </div>
  );
};

export default EventItem;
