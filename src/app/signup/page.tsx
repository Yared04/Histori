"use client";
import React, { useContext, useEffect } from "react";
import Signup from "../auth/Signup";
import Landing from "../components/LandingLayout";
import { userContext } from "../auth/UserContext";

const SignupPage = () => {
  const context = useContext(userContext);
  const { setShowLogin } = context;
  useEffect(() => {
    setShowLogin!(false);
  }, []);
  return (
    <Landing>
      <Signup />
    </Landing>
  );
};

export default SignupPage;
