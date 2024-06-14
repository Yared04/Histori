import React from "react";
import ClientComponent from "../components/ClientComponent";
import MatchingGame from "./MatchingGame";
import Starfield from "react-starfield";
import Header from "../components/Header";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Header />
      <Starfield
        starCount={4000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className="min-h-[86vh]">
        <MatchingGame />
      </div>
      <Footer />
    </>
  );
};

export default page;
