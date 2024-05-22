"use client";
import React from "react";
import Image from "next/image";
import { Card } from "flowbite-react";
import { Dropdown } from "flowbite-react";

interface EventItemProps {
  title: string;
  description: string;
  image: string;
}

const EventItem = ({ image, title, description }: EventItemProps) => {

  const handleDelete = () => {};
  return (
    <div className="block overflow-hidden max-h-96  border-b-2 text-white max-w-fill p-2 rounded">
      {/* <Image
        className="rounded-l-lg"
        src={image}
        alt="Picture of the author"
        width={100}
        height={100}
      /> */}
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-3">{title}</h1>
          <Dropdown
            label=""
            size="sm"
            dismissOnClick={false}
            renderTrigger={() => (
              <span>
                <svg
                  className="w-5 h-5"
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
            <Dropdown.Item onClick={handleDelete}>Dashboard</Dropdown.Item>
          </Dropdown>
        </div>

        <p className="my-1 text-xs line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default EventItem;
