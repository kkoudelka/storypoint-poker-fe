"use client";

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import {
  useAvailableImagesQuery,
  useChangePfpMutation,
  useGetUserLazyQuery,
} from "@/src/gql/types";

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IUpdateForm {
  pfp: number | null;
}

const ChangePfpDialog: React.FC<IProps> = ({ open, onClose }) => {
  const { update } = useSession();

  const [mutatePfp, { loading }] = useChangePfpMutation();
  const [fetchUser] = useGetUserLazyQuery();

  const { loading: imgLoading, data: imagesData } = useAvailableImagesQuery();

  const handleClose = () => {
    onClose();
  };

  const { handleSubmit, watch, setValue } = useForm<IUpdateForm>({
    mode: "onChange",
  });

  const handleSaveUser = async (data: IUpdateForm) => {
    const res = await mutatePfp({
      variables: { pfp: data.pfp },
    });

    if (res.data?.changePfp.id) {
      const ures = await fetchUser();

      if (ures.data?.getUser) {
        await update({
          profilePic: ures.data.getUser.profilePic,
          username: ures.data.getUser.username,
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Change profile picture</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleSaveUser)}>
        <DialogContent>
          <DialogContentText>
            Select a profile picture so others can identify you easily.
          </DialogContentText>

          <Box sx={{ mt: 2 }}>
            {imgLoading && <LinearProgress variant="indeterminate" />}
            <Grid container spacing={4}>
              {imagesData?.getAvailableImages.map(img => (
                <Grid item xs={4} md={2} key={img.key}>
                  <Avatar
                    src={img.value}
                    sx={theme => ({
                      width: 70,
                      height: 70,
                      cursor: "pointer",
                      transition: "all 0.1s",
                      border: "0",
                      ...(watch("pfp") === img.key && {
                        border: `4px solid ${theme.palette.primary.main}`,
                      }),
                    })}
                    onClick={() => setValue("pfp", img.key)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={theme => ({
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
            },
          })}
        >
          <Button
            onClick={() => handleSaveUser({ pfp: null })}
            sx={theme => ({
              [theme.breakpoints.up("md")]: {
                mr: "auto",
              },
            })}
          >
            Use default profile picture
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ChangePfpDialog;
