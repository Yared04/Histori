import React from "react";
import Image from "next/image";
import Tag from "./Tag";

interface EventItemProps {
    title: string;
    description: string;
    image: string;
    }

const EventItem = ({image, title, description}: EventItemProps) => {
  return (
    <div className=" overflow-clip rounded-lg w-full h-24 text-white flex gap-5 bg-blue-500 bg-opacity-35">
      <Image
      className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      />
      <div className="py-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className=" ">{description}</p>
      </div>
      <div className="pr-2 pt-2">
        <Tag name="battles"/>
      </div>
    </div>
  );
};

export default EventItem;
