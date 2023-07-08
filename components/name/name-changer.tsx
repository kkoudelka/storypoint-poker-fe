import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import React from "react";

const NameChanger = dynamic(() => import("./name"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default NameChanger;
