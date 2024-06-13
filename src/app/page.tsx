"use client";
import React, { ReactNode } from "react";
import Landing from "./components/LandingLayout";
import ExploreButton from "./components/ExploreButton";
const index = () => {
  return (
    <div className="bg-[url('/stars.png')]">
      <Landing>
        <ExploreButton />
      </Landing>
    </div>
  );
};

export default index;
