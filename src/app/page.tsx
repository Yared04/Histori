"use client";
import React, { ReactNode } from "react";
import Landing from "./components/LandingLayout";
import ExploreButton from "./components/ExploreButton";
const index = () => {
  return <Landing children={<ExploreButton />} />;
};

export default index;
