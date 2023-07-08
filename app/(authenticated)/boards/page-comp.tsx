"use client";

import Grid from "@mui/material/Grid";
import React from "react";
import BoardsList from "./boards-list";
import CreateBoard from "./create-board";
import type { GetBoardsQuery } from "@/src/gql/types";

interface IProps {
  data: GetBoardsQuery["boards"];
}

const BoardsPage: React.FC<React.PropsWithChildren<IProps>> = ({ data }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <BoardsList initialBoards={data} />
        </Grid>
      </Grid>
      <CreateBoard />
    </>
  );
};

export default BoardsPage;
