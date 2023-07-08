"use client";

import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useChangeAdminStatusMutation } from "@/src/gql/types";

interface IProps {
  code: string;
}

const BecomeAdminButton: React.FC<IProps> = ({ code }) => {
  const [mutateAdmin] = useChangeAdminStatusMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async () => {
    try {
      await mutateAdmin({
        variables: {
          code,
          admin: true,
        },
      });
      enqueueSnackbar("Successfully became admin", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Failed to become admin", { variant: "error" });
    }
  };

  return (
    <Button startIcon={<AddModeratorIcon />} onClick={handleChange}>
      Moderate this board
    </Button>
  );
};

export default BecomeAdminButton;
