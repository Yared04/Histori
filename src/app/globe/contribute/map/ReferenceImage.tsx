"use client";
import Image from "next/image";
import { PositionableContainer } from "re-position";
import React, { useState } from "react";
import "react-rotatable/dist/css/rotatable.min.css";

interface ReferenceImageProps {
  image: string;
  opacity: number;
  isLocked: boolean;
}

const ReferenceImage: React.FC<ReferenceImageProps> = ({
  image,
  opacity,
  isLocked,
}) => {
  const [size, setSize] = useState({ width: 300, height: 200 });

  const [position, setPosition] = useState({
    left: "37.5%",
    top: "37.5%",
    width: "25%",
    height: "25%",
    rotation: "30deg",
  });

  const handleUpdate = (position: any) => setPosition({ ...position });

  return (
    image && (
      <div className="absolute left-[50%] top-[50%] w-48 h-48">
        <PositionableContainer
          className={`container ${isLocked ? "pointer-events-none" : ""}`}
          movable={!isLocked}
          resizable={!isLocked}
          rotatable={!isLocked}
          position={position}
          onUpdate={handleUpdate}
        >
          <Image
            className="w-full h-full"
            style={{ opacity: opacity }}
            src={image}
            width={100}
            height={100}
            alt=""
          />
        </PositionableContainer>
      </div>
    )
  );
};

export default ReferenceImage;
