"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateBoardDialogDynamic from "./create-board-dialog.dynamic";

const CreateBoard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (!firstOpen) {
      setFirstOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          color: "white",
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Create board
      </Fab>
      {firstOpen && (
        <CreateBoardDialogDynamic open={open} onClose={handleClose} />
      )}
    </>
  );
};

export default CreateBoard;
