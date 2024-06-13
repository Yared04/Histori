import React from "react";
import AddArticle from "./AddArticle";
import ClientComponent from "../components/ClientComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Starfield from "react-starfield";

const Articles = () => {
  return (
    <>
      <Starfield
        starCount={2000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <Header />
      <AddArticle />
      <Footer />
    </>
  );
};

export default Articles;
