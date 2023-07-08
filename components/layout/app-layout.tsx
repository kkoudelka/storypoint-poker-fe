"use client";

import React from "react";
import NavBar, { AppToolbar } from "./app-bar";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <AppToolbar />
      {children}
    </>
  );
};

export default AppLayout;
