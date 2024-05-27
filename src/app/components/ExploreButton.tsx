import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const ExploreButton = () => {
    
  const router = useRouter();

  const handleClick = () => {
    router.push("/globe");
  };

  return (
    <div >
      <Button
        style={{ marginRight: "5rem" }}
        size="xl"
        gradientDuoTone="purpleToBlue"
        onClick={handleClick}
      >
        Explore the Past
        <FaLongArrowAltRight
          style={{ alignSelf: "center", marginLeft: "0.7rem" }}
        />
      </Button>
    </div>
  );
};

export default ExploreButton;
