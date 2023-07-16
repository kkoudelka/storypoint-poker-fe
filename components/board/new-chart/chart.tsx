"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import React from "react";
import Box from "@mui/material/Box";

const colors = [
  "#FF0000",
  "#00AAFF",
  "#FF8800",
  "#00CC00",
  "#FF00FF",
  "#FFCC00",
  "#0066FF",
  "#FF3399",
  "#00FF99",
  "#9933FF",
];

const RADIAN = Math.PI / 180;

interface IProps {
  data: {
    name: string;
    value: number;
  }[];
}

const PieSummary: React.FC<IProps> = ({ data }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={38}
      >
        {`${data[index].name}`}
      </text>
    );
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieSummary;
