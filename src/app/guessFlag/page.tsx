"use client"
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Flag = {
  id: number;
  src: string;
  country: string;
};

const MatchingGame = () => {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [matches, setMatches] = useState([]); // To store user matches
  const svgRef = useRef(null);
  const data = {
    flags: [
      {
        id: 1,
        src: "https://restcountries.com/data/afg.svg",
        country: "Afghanistan",
      },
      {
        id: 2,
        src: "https://restcountries.com/data/ala.svg",
        country: "Åland Islands",
      },
      {
        id: 3,
        src: "https://restcountries.com/data/alb.svg",
        country: "Albania",
      },
      {
        id: 4,
        src: "https://restcountries.com/data/dza.svg",
        country: "Algeria",
      },
    ],
    countryNames: ["Afghanistan", "Åland Islands", "Albania", "Algeria"],
  };
  useEffect(() => {
    // mock data
    for(let flag of data.flags) {

    }
  }, [data]);

  const handleDragEnd = (result:any) => {
    // if (!result.destination) return;
    // const newMatch =  {
    //   flagId: flags[result.source.index].id,
    //   countryName: flags[result.destination.index].country,
    // };
    // const newMatches = [...matches, newMatch];
    // setMatches(newMatches);
  };

  const getCoordinates = (index: number) => {
    const flagElement = document.getElementById(`flag-${index}`);
    const countryElement = document.getElementById(`country-${index}`);
    if (flagElement && countryElement) {
      const flagRect = flagElement.getBoundingClientRect();
      const countryRect = countryElement.getBoundingClientRect();
      return {
        x1: flagRect.right,
        y1: flagRect.top + flagRect.height / 2,
        x2: countryRect.left,
        y2: countryRect.top + countryRect.height / 2,
      };
    }
    return null;
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="flags" direction="horizontal">
          {(provided) => (
            <div
              className="flex justify-around w-full mb-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {flags.map((flag, index) => (
                <Draggable
                  key={flag.id}
                  draggableId={flag.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <img
                      id={`flag-${index}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      src={flag.src}
                      alt={`Flag of ${flag.country}`}
                      className="w-24 h-24 m-2 border border-gray-300 cursor-pointer"
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="countryNames" direction="horizontal">
          {(provided) => (
            <div
              className="flex justify-around w-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {countryNames.map((country, index) => (
                <div
                  id={`country-${index}`}
                  key={index}
                  className="w-24 h-24 m-2 border border-gray-300 flex items-center justify-center cursor-pointer"
                >
                  {country}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        {matches.map((match, index) => {
          const coords = getCoordinates(index);
          return (
            coords && (
              <line
                key={index}
                x1={coords.x1}
                y1={coords.y1}
                x2={coords.x2}
                y2={coords.y2}
                stroke="black"
                strokeWidth="2"
              />
            )
          );
        })}
      </svg>
      <button
        onClick={() => console.log(matches)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default MatchingGame;
