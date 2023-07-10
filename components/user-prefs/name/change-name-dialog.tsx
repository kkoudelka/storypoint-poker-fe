"use client";

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { usernameRegex } from "@/src/regex";
import { useChangeDisplayNameMutation } from "@/src/gql/types";

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IUpdateForm {
  name: string;
}

const ChangeNameDialog: React.FC<IProps> = ({ open, onClose }) => {
  const { data, update } = useSession();

  const [mutateDisplayName, { loading }] = useChangeDisplayNameMutation();

  const handleClose = () => {
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateForm>({
    defaultValues: {
      name: data?.user?.username,
    },

    mode: "onChange",
  });

  const handleSaveUser = async (data: IUpdateForm) => {
    const res = await mutateDisplayName({
      variables: { displayName: data.name },
    });

    if (res.data?.changeDisplayName === true) {
      await update({ username: data.name });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change display name</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleSaveUser)}>
        <DialogContent>
          <DialogContentText>
            Change a name that will be displayed to other users.
          </DialogContentText>
          <TextField
            label="Display name"
            fullWidth
            error={!!errors.name}
            variant="standard"
            {...register("name", {
              minLength: 3,
              maxLength: 20,
              required: true,
              validate: value =>
                value.trim().length >= 3 &&
                value.trim().length <= 20 &&
                usernameRegex.test(value),
            })}
            {...(errors.name && {
              helperText:
                "Please enter name others will recognise (3 - 20 characters, text and digits only)",
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ChangeNameDialog;
