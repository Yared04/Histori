import React from "react";
import FlagItem from "./FlagItem";
import ClientComponent from "../components/ClientComponent";

const page = () => {
  return (
    <ClientComponent>
      <div className="flex justify-center self-center">
        <FlagItem />
      </div>
    </ClientComponent>
  );
};

export default page;
