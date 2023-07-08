"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import Box from "@mui/material/Box";

interface IProps {
  data: {
    name: string;
    value: number;
  }[];
}

const RadarSummary: React.FC<IProps> = ({ data }) => {
  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx={300} cy={250} outerRadius={150} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" fontSize={32} />
          <PolarRadiusAxis />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RadarSummary;
