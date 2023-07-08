import React from "react";
import getBoardsData from "./getData";
import BoardsPage from "./page-comp";

export const metadata = {
  title: "Boards",
  description: "A list of available boards",
};

export default async function Boards() {
  const data = await getBoardsData();

  return <BoardsPage data={data} />;
}

export const revalidate = 120;
