"use client";
import React, { useState, useEffect } from "react";
import FlagItem from "./FlagItem";

interface Flag {
  _id: string;
  url: string;
  country: string;
  start_year: number;
  end_year: number;
  __v: number;
}

interface Option {
  id: string;
  name: string;
}

const initialFlags: Flag[] = [
  {
    _id: "6653bce913250febe6595bc0",
    url: "http://res.cloudinary.com/dr2n0j4ls/image/upload/v1/histori-flags/4426610795937015821",
    country: "Thailand",
    start_year: 1916,
    end_year: 1917,
    __v: 0,
  },
  {
    _id: "6653bd0613250febe6595c0f",
    url: "http://res.cloudinary.com/dr2n0j4ls/image/upload/v1/histori-flags/-5389880595760930261",
    country: "Ukraine",
    start_year: 1362,
    end_year: 1471,
    __v: 0,
  },
  {
    _id: "6653bbd813250febe6595853",
    url: "http://res.cloudinary.com/dr2n0j4ls/image/upload/v1/histori-flags/658568367131566657",
    country: "Montenegro",
    start_year: 1876,
    end_year: 1905,
    __v: 0,
  },
  {
    _id: "6653ba6f13250febe6595478",
    url: "http://res.cloudinary.com/dr2n0j4ls/image/upload/v1/histori-flags/-6230532653733832307",
    country: "Ecuador",
    start_year: 1812,
    end_year: 1820,
    __v: 0,
  },
];

const MatchingGame: React.FC = () => {
  const [flags, setFlags] = useState<Flag[]>(initialFlags);
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(0);
  const [selectedFlag, setSelectedFlag] = useState<Flag | null>(flags[0]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [answerResult, setAnswerResult] = useState<{
    [key: string]: boolean | null;
  }>({});
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (flags.length) {
      const options = flags.map((flag) => ({
        id: flag._id,
        name: `${flag.country} (${flag.start_year} - ${flag.end_year})`,
      }));
      setCurrentOptions(options);
    }
  }, [flags]);

  const handleOptionClick = (option: Option) => {
    if (selectedFlag) {
      const isCorrect = selectedFlag._id === option.id;
      setAnswerResult({ [option.id]: isCorrect });
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        setTimeout(() => {
          fetchNextFlags();
        }, 500);
      } else {
        setScore((prevScore) => prevScore - 1);
      }
    }
  };

  const fetchNextFlags = async () => {
    // Fetch next set of flags from the backend
    // Example:
    // const response = await fetch('API_ENDPOINT');
    // const data = await response.json();
    // setFlags(data.flags);

    setCurrentFlagIndex((prevIndex) => prevIndex + 1);
    setSelectedFlag(flags[currentFlagIndex + 1]);
    setAnswerResult({});
  };

  const retry = () => {
    setAnswerResult({});
  };

  const renderIcon = (isCorrect: boolean) => {
    return isCorrect ? (
      <span className="text-green-500 font-bold ml-2">✔</span>
    ) : (
      <span className="text-red-500 font-bold ml-2">✖</span>
    );
  };

  return (
    <div className="flex flex-col mx-40 my-10">
      <div className="flex justify-between">
        <p className="text-xl text-white text-start mb-8">
          <span className="text-blue-600 text-2xl">Q: </span>Which country does
          this flag belong to?
        </p>
        <p className="text-xl text-white text-start mb-8">
          Score: <span className="text-blue-600 text-xl">{score}</span>
        </p>
      </div>
      {selectedFlag && (
        <div className="mb-16 text-center mx-auto">
          <FlagItem imageUrl={selectedFlag.url} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-8 mb-5">
        {currentOptions.map((option) => (
          <div
            key={option.id}
            className={`p-3 border rounded cursor-pointer transition-colors flex items-center justify-between ${
              answerResult[option.id] === true
                ? "bg-green-200 ring-1 ring-green-500"
                : answerResult[option.id] === false
                ? "bg-red-200 ring-1 ring-red-500"
                : "bg-transparent text-white hover:-translate-y-1 hover:ring-1 hover:ring-gray-500"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option.name}
            {answerResult[option.id] !== undefined &&
              renderIcon(answerResult[option.id] as boolean)}
          </div>
        ))}
      </div>
      <button
        onClick={
          answerResult[Object.keys(answerResult)[0]] === false
            ? retry
            : fetchNextFlags
        }
        className="px-4 py-2 w-36 self-end bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {answerResult[Object.keys(answerResult)[0]] === false
          ? "Retry"
          : "Next"}
      </button>
    </div>
  );
};

export default MatchingGame;
