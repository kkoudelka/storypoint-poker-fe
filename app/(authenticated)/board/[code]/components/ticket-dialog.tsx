"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useBoardContext } from "./board-context";
import { useUpdateTicketMutation } from "@/src/gql/types";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

interface IFormOptions {
  ticket: string | null;
}

const TicketDialog: React.FC<IProps> = ({ open, handleClose }) => {
  const [mutateTicket, { loading }] = useUpdateTicketMutation();

  const {
    code,
    board: { ticket: defaultTicket },
  } = useBoardContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormOptions>({
    mode: "onChange",
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: IFormOptions) => {
    let ticket: string | null = data.ticket ? data.ticket.trim() : null;

    if (!ticket || ticket.length === 0) {
      ticket = null;
    }

    try {
      await mutateTicket({
        variables: {
          ticket,
          code,
        },
      });
      handleClose();
    } catch (e) {
      enqueueSnackbar("An error has occured while updating ticket", {
        variant: "error",
      });
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit currently discussed ticket, so other participants can find it
            easier.
          </DialogContentText>
          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            error={!!errors.ticket}
            margin="dense"
            id="ticket"
            label="Ticket name"
            fullWidth
            defaultValue={defaultTicket ?? ""}
            variant="standard"
            {...register("ticket", { minLength: 3, maxLength: 60 })}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", px: 2 }}>
          <Button
            onClick={() => onSubmit({ ticket: null })}
            disabled={loading}
            color="error"
            sx={{ mr: "auto" }}
          >
            Clear ticket
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} type="submit">
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TicketDialog;
