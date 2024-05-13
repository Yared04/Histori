import React from "react";
import Image from "next/image";
import Tag from "./Tag";
import { Card } from "flowbite-react";
interface EventItemProps {
  title: string;
  description: string;
  image: string;
}

const EventItem = ({ image, title, description }: EventItemProps) => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return (
    <div className="block overflow-hidden max-h-32 text-white max-w-[32rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      /> */}
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{title}</h1>

          <div className="pr-2 flex gap-1">
            <Tag name="war" color={colors[0]} />
            <Tag name="battles" color={colors[1]} />
          </div>
        </div>

        <p className="my-1 text-sm ">{description}</p>
      </div>
    </div>
  );
};

export default EventItem;
