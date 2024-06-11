import Image from "next/image";
import React from "react";

interface FlagItemProps {
  imageUrl: string;
}

const FlagItem = ({imageUrl}: FlagItemProps) => {
  return (
    <div >
      <Image
       className="shadow-lg rounded-lg object-cover"
        src={imageUrl}
        alt="flag"
        width={450}
        height={200}
      />
    </div>
  );
};

export default FlagItem;
