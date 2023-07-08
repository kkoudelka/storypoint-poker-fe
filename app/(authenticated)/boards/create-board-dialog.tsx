"use client";

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateBoardMutation } from "@/src/gql/types";

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValues {
  boardTitle: string;
}

const CreateBoardDialog: React.FC<IProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
    reset();
  };

  const router = useRouter();

  const [mutateCreateBoard] = useCreateBoardMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    mode: "onChange",
  });

  const handleCreateNewBoard = async (data: IFormValues) => {
    try {
      const result = await mutateCreateBoard({
        variables: {
          title: data.boardTitle,
        },
      });

      const newBoard = result.data?.createBoard;

      if (newBoard) {
        await fetch("/api/revalidate?path=%2Fboards");
        router.push(`/board/${newBoard.code}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit(handleCreateNewBoard)}>
          <DialogTitle>Create a new board</DialogTitle>

          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DialogContentText>
                Choose a name for your new board.
              </DialogContentText>
              <DialogContentText>
                This name will be visible to all logged in users on the{" "}
                <Box component="span" className="code">
                  /boards
                </Box>{" "}
                page.
              </DialogContentText>
              <DialogContentText>
                For example, you could name your board by your team name, so you
                can use it multiple times
              </DialogContentText>
              <TextField
                margin="dense"
                id="board-title"
                label="Board name"
                fullWidth
                variant="standard"
                error={!!errors.boardTitle}
                helperText={
                  errors.boardTitle
                    ? "Invalid board name (Min 3 characters, max 15 characters)"
                    : undefined
                }
                placeholder="Example: WEBCAT"
                {...register("boardTitle", { minLength: 3, maxLength: 15 })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateBoardDialog;
