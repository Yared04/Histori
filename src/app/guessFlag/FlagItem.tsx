import Image from "next/image";
import React from "react";

const FlagItem = () => {
  return (
    <div >
      <Image
       className="shadow-lg rounded-lg object-cover"
        src="http://res.cloudinary.com/dr2n0j4ls/image/upload/v1/histori-flags/-1592365701459389321"
        alt="flag"
        width={200}
        height={200}
      />
    </div>
  );
};

export default FlagItem;
