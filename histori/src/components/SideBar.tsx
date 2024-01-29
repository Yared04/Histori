import React from "react";
import EventItem from "./EventItem";


interface SideBarProps {
  events: [
    {
      title: string;
      description: string;
      image: string;
    }
  
  ];
}

const SideBar = ({ events }: SideBarProps) => {
  const event = [
    {
      title: "Adwa",
      descrption:
        "This is the battle of Adwa where Ethiopia defeated the Italian invaders and sent them back to their country with great shame.",
      image: "/adwa.jpeg",
    },
  ];
  return (
    <div className="bg-gray-300 bg-opacity-50 w-full  p-8 flex flex-col gap-6 rounded-xl">
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="p-4 rounded-full w-full h-10 border-none shadow-md"
        />
      </div>
      <div
        className="min-h-96 max-h-[28rem] overflow-y-scroll no-scrollbar"
      >
        {events.map((event, idx: number) => (
          <div key={idx} className="flex flex-col gap-3 ">
            <EventItem
              title={event.title}
              description={event.description}
              image={event.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
