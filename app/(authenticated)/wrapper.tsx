"use client";

import Container from "@mui/material/Container";
import React from "react";

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default Wrapper;
