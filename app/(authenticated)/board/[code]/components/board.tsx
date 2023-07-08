"use client";

import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { useIdle } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import VoteCards from "./vote-cards";
import UserList from "./user-list";
import Controls from "./controls";
import BecomeAdminButton from "./become-admin";
import DebugState from "./debug";
import { BoardContextProvider } from "./board-context";
import ChartContainer from "@/components/board/new-chart/chart-container";
import {
  BoardDetailQuery,
  BoardStatus,
  UserBoardStatus,
  useBoardUpdateSubscription,
  useUpdateUserBoardStatusMutation,
  useUpdateVoteMutation,
} from "@/src/gql/types";

interface IProps {
  initialData: BoardDetailQuery["board"];
  code: string;
}

const Board: React.FC<IProps> = ({ initialData, code }) => {
  const { board, handleChangeVote, usersCurrentVote, isAdmin } = useBoardData({
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
            isAdmin={isAdmin}
          />
          {isAdmin && (
            <Controls
              code={code}
              status={board?.status ?? BoardStatus.Voting}
            />
          )}
          {!isAdmin && <BecomeAdminButton code={code} />}
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {board?.status === BoardStatus.Voting && (
            <VoteCards
              onChange={handleChangeVote}
              currentVote={usersCurrentVote}
            />
          )}
          {board?.status === BoardStatus.Results && (
            <ChartContainer votes={board?.userVotes ?? []} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ overflowX: "auto" }}>
            <DebugState state={board} />
          </Box>
        </Grid>
      </Grid>
    </BoardContextProvider>
  );
};

export default Board;

const useBoardData = ({
  initialData,
  code,
}: {
  initialData: BoardDetailQuery["board"];
  code: string;
}) => {
  const [board, setBoard] = React.useState(initialData);

  const { data: sessionData } = useSession();

  useBoardUpdateSubscription({
    variables: { code },
    onData: ({ data }) => {
      if (data.data?.boardUpdate) {
        setBoard(data.data?.boardUpdate);
      }
    },
  });

  const [mutateStatus] = useUpdateUserBoardStatusMutation();
  const [mutateVote] = useUpdateVoteMutation();

  const handleChangeStatus = async (status: UserBoardStatus) => {
    await mutateStatus({
      variables: {
        code,
        status,
      },
    });
  };

  useEffect(() => {
    handleChangeStatus(UserBoardStatus.Online);
    return () => {
      handleChangeStatus(UserBoardStatus.Offline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isIdle = useIdle(20 * 1000);

  useEffect(() => {
    if (isIdle) {
      handleChangeStatus(UserBoardStatus.Idle);
    } else {
      handleChangeStatus(UserBoardStatus.Online);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIdle]);

  const handleChangeVote = (vote: string | null) =>
    mutateVote({ variables: { code, vote } });

  const usersCurrentVote = useMemo(
    () =>
      board?.userVotes?.find(x => x.user.id === sessionData?.user?.id)?.vote ??
      null,
    [sessionData, board?.userVotes],
  );

  const isAdmin = useMemo(
    () =>
      board?.userVotes?.find(x => x.user.id === sessionData?.user?.id)?.admin ??
      false,
    [sessionData, board?.userVotes],
  );

  return { board, handleChangeVote, usersCurrentVote, isAdmin };
};
