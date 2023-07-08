"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import UserList from "./user-list";
import Ticket from "./ticket";
import ChartContainer from "@/components/board/new-chart/chart-container";
import {
  BoardDetailQuery,
  BoardStatus,
  useBoardUpdateSubscription,
} from "@/src/gql/types";
import { BoardContextProvider } from "@/app/(authenticated)/board/[code]/components/board-context";

interface IProps {
  initialData: BoardDetailQuery["board"];
  code: string;
}

const ReadOnlyBoard: React.FC<IProps> = ({ initialData, code }) => {
  const { board } = useBoardData({
    initialData,
    code,
  });

  if (!board) {
    return <LinearProgress />;
  }

  return (
    <BoardContextProvider board={board} code={code}>
      <Grid container spacing={3} sx={{ my: 3 }}>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <UserList
            code={code}
            users={board?.userVotes ?? []}
            status={board?.status ?? BoardStatus.Voting}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {board?.status === BoardStatus.Voting && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Typography
                sx={theme => ({
                  fontSize: theme.typography.pxToRem(28),
                })}
              >
                Currently voting...
              </Typography>

              <Ticket />
            </Box>
          )}
          {board?.status === BoardStatus.Results && (
            <ChartContainer votes={board?.userVotes ?? []} />
          )}
        </Grid>
      </Grid>
    </BoardContextProvider>
  );
};

export default ReadOnlyBoard;

const useBoardData = ({
  initialData,
  code,
}: {
  initialData: BoardDetailQuery["board"];
  code: string;
}) => {
  const [board, setBoard] = React.useState(initialData);

  useBoardUpdateSubscription({
    variables: { code },
    onData: ({ data }) => {
      if (data.data?.boardUpdate) {
        setBoard(data.data?.boardUpdate);
      }
    },
  });

  return { board };
};
