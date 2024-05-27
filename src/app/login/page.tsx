"use client";
import React, { useContext, useEffect } from "react";
import Login from "../auth/Login";
import Landing from "../components/LandingLayout";
import { userContext } from "../auth/UserContext";

const LoginPage = () => {
  const context = useContext(userContext);
  const { setShowLogin } = context;
  useEffect(() => {
    setShowLogin!(false);
  }, []);
  return <Landing children={<Login />} />;
};

export default LoginPage;
