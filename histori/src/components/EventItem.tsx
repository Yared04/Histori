import React from "react";
import Image from "next/image";
import Tag from "./Tag";

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
    <div className=" overflow-clip rounded-lg w-full min-h-24 max-h-24 text-white flex gap-5 bg-blue-500 bg-opacity-35">
      <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      />
      <div className="py-1">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{title}</h1>

          <div className="pr-2 pt-2 flex gap-1">
            <Tag name="war" color={colors[0]} />
            <Tag name="battles" color={colors[1]} />
          </div>
        </div>

        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EventItem;
