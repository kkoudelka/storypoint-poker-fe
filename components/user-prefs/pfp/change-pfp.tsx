"use client";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import dynamic from "next/dynamic";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";

const DialogDynamic = dynamic(() => import("./change-pfp-dialog"), {
  ssr: false,
});

interface IProps {
  onOpen: () => void;
}

const ChangePfp: React.FC<IProps> = ({ onOpen }) => {
  const { data } = useSession();

  const [showPfpDialog, setShowPfpDialog] = React.useState(false);
  const [showFirst, setShowFirst] = React.useState(false);

  const handleOpen = () => {
    if (!showFirst) {
      setShowFirst(true);
    }
    setShowPfpDialog(true);
    onOpen();
  };

  return (
    <>
      <Tooltip title={<Typography>Change profile picture</Typography>}>
        <Avatar
          alt={data?.user?.username}
          sx={{ height: 54, width: 54, mx: 2, cursor: "pointer" }}
          src={data?.user?.profilePic}
          onClick={handleOpen}
        />
      </Tooltip>

      {showFirst && (
        <DialogDynamic
          open={showPfpDialog}
          onClose={() => setShowPfpDialog(false)}
        />
      )}
    </>
  );
};

export default ChangePfp;
