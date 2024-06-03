"use client";
import React, { useState } from "react";
const text =
  "The time when the ethiopian army defeated the grate Italy with there hands and bones. with the help of the womens we did every thing we can to win the war of the centery. toase to ethiopia The time when the ethiopian army defeated the grate Italy with there hands and bones. with the help of the womens we did every thing we can to win the war of the centery. toase to ethiopia";
const ProfileCard = () => {
  const [showMore, setShowMore] = useState(false);
  const [textToShow, setTextToShow] = useState(text.slice(0, 100));
  const [textToHide, setTextToHide] = useState(text);
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="font-medium">The Battle of Adwa</p>
          <button className="flex gap-[.1rem]">
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <div className="w-1 h-1 rounded-full bg-black"></div>
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <p>James Milar</p>
          <div className="w-1 h-1 rounded-full bg-black"></div>
          <p>Mar 14, 2020</p>
        </div>
      </div>
      <div className="flex">
        <p>
          {showMore ? textToHide : textToShow + "..."}
          {showMore ? (
            <span
              className="text-blue-500 pl-1 cursor-pointer"
              onClick={() => setShowMore(false)}
            >
              see less
            </span>
          ) : (
            <span
              className="text-blue-500 pl-1 cursor-pointer"
              onClick={() => setShowMore(true)}
            >
              see more
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
