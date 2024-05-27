"use client";
import React from "react";
import Image from "next/image";
import { Card } from "flowbite-react";

interface EventItemProps {
  title: string;
  description: string;
  image: string;
  startYear: number;
  endYear: number;
  openModals: boolean[];
  setOpenModals: (openModals: boolean[]) => void;
  idx: number;
}

const EventItem = ({
  image,
  title,
  description,
  startYear,
  endYear,
  openModals,
  idx,
  setOpenModals,
}: EventItemProps) => {

  const handleOpenDetial = (idx: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[idx] = true;
    setOpenModals(newOpenModals);
    console.log(openModals);
  };

  return (
    <div
      onClick={() => handleOpenDetial(idx)}
      className="block overflow-hidden max-h-96 cursor-pointer border-b-2 text-white max-w-fill p-2 rounded"
    >
      {/* <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      /> */}
      <div>
        <h1 className="text-xl font-bold mb-1">{title}</h1>
        <p className="text-xs mb-3">
          From {startYear} to {endYear}
        </p>

        <p className="my-1 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default EventItem;
