import React from "react";
import EventItem from "./EventItem";
import { title } from "process";

const SideBar = () => {
  const events = [
    {
      title: "Adwa",
      descrption:
        "This is the battle of Adwa where Ethiopia defeated the Italian invaders and sent them back to their country with great shame.",
      image: "/adwa.jpeg",
    },
  ];
  return (
    <div className="bg-gray-300 bg-opacity-50 w-full h-screen p-8 flex flex-col gap-6 rounded-xl">
    <div>
        <input type="text" name="" id="" placeholder="Search" className="p-4 rounded-full w-full h-10 border-none shadow-md"/>

    </div>
      <div className=" flex flex-col gap-3">
        <EventItem
          title={events[0].title}
          description={events[0].descrption}
          image={events[0].image}
        />
        <EventItem
          title={events[0].title}
          description={events[0].descrption}
          image={events[0].image}
        />
        <EventItem
          title={events[0].title}
          description={events[0].descrption}
          image={events[0].image}
        />
      </div>
    </div>
  );
};

export default SideBar;
