"use client";
import React, { useState, useEffect } from "react";
import FlagItem from "./FlagItem";
import axios from "axios";

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

const MatchingGame: React.FC = () => {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(0);
  const [selectedFlag, setSelectedFlag] = useState<Flag | null>(null);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [answerResult, setAnswerResult] = useState<{
    [key: string]: boolean | null;
  }>({});
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    fetchFlags();
  }, []);

  useEffect(() => {
    if (round > 5) {
      setGameOver(true);
    } else if (flags.length > 0) {
      updateFlagAndOptions(currentFlagIndex);
    }
  }, [flags, currentFlagIndex, round]);

  const fetchFlags = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/flags?count=20", // Fetch a larger pool of flags
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = response.data.data;
    setFlags(data.flags);
    setCurrentFlagIndex(0);
    setRound(1);
    setScore(0);
    setGameOver(false);
  };

  const updateFlagAndOptions = (index: number) => {
    const correctFlag = flags[index];
    setSelectedFlag(correctFlag);
    generateOptions(correctFlag);
  };

  const generateOptions = (correctFlag: Flag) => {
    let options = [correctFlag];
    const incorrectFlags = flags.filter(flag => flag._id !== correctFlag._id);
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * incorrectFlags.length);
      const randomFlag = incorrectFlags.splice(randomIndex, 1)[0];
      options.push(randomFlag);
    }
    const optionItems = options.map(flag => ({
      id: flag._id,
      name: `${flag.country} (${flag.start_year} - ${flag.end_year})`
    }));
    setCurrentOptions(shuffleArray(optionItems));
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (option: Option) => {
    if (selectedFlag) {
      const isCorrect = selectedFlag._id === option.id;
      setAnswerResult({ [option.id]: isCorrect });
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setTimeout(() => {
        if (round < 5) {
          setCurrentFlagIndex((prevIndex) => prevIndex + 1);
          setRound((prevRound) => prevRound + 1);
          setAnswerResult({});
        } else {
          setGameOver(true);
        }
      }, 1500); // Add a delay before showing the next flag and options
    }
  };

  const retry = () => {
    setAnswerResult({});
  };

  const restartGame = () => {
    fetchFlags(); // Fetch new flags from the backend
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
      {gameOver ? (
        <div className="text-center text-white">
          <p className="text-2xl mb-4">Game Over!</p>
          <p className="text-xl mb-4">Your final score is: {score}/5</p>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Restart Game
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <p className="text-xl text-white text-start mb-8">
              <span className="text-blue-600 text-2xl">Q: </span>Which country
              does this flag belong to?
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
                : () => {
                    setCurrentFlagIndex((prevIndex) => prevIndex + 1);
                    setRound((prevRound) => prevRound + 1);
                  }
            }
            className="px-4 py-2 w-36 self-end bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {answerResult[Object.keys(answerResult)[0]] === false
              ? "Retry"
              : "Next"}
          </button>
        </>
      )}
    </div>
  );
};

export default MatchingGame;
