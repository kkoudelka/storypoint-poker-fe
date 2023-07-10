"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import PollIcon from "@mui/icons-material/Poll";
import ReplayIcon from "@mui/icons-material/Replay";
import { useSnackbar } from "notistack";
import {
  BoardStatus,
  useChangeBoardStatusMutation,
  useResetVotesMutation,
} from "@/src/gql/types";

interface IProps {
  code: string;
  status: BoardStatus;
}

const Controls: React.FC<IProps> = ({ code, status }) => {
  const [mutateResetVote] = useResetVotesMutation();
  const [mutateBoardStatus] = useChangeBoardStatusMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleResetBoard = async () => {
    try {
      await mutateResetVote({
        variables: {
          code,
        },
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to reset board", {
        variant: "error",
      });
    }
  };

  const handleChangeBoardStatus = async (status: BoardStatus) => {
    try {
      await mutateBoardStatus({
        variables: {
          code,
          status,
        },
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to change board status", {
        variant: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Button
        startIcon={<PollIcon />}
        disabled={status === BoardStatus.Results}
        onClick={() => handleChangeBoardStatus(BoardStatus.Results)}
      >
        Show results
      </Button>
      <Button
        startIcon={<ReplayIcon />}
        onClick={handleResetBoard}
        color="error"
      >
        Reset
      </Button>
    </Box>
  );
};

export default Controls;
