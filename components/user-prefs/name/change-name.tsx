"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import dynamic from "next/dynamic";

const DialogDynamic = dynamic(() => import("./change-name-dialog"), {
  ssr: false,
});

interface IProps {
  onOpen: () => void;
}

const ChangeName: React.FC<IProps> = ({ onOpen }) => {
  const [showChangeNameDialog, setShowChangeNameDialog] = React.useState(false);
  const [showFirst, setShowFirst] = React.useState(false);

  const handleOpen = () => {
    if (!showFirst) {
      setShowFirst(true);
    }
    setShowChangeNameDialog(true);
    onOpen();
  };

  return (
    <>
      <Tooltip title={<Typography>Change name</Typography>}>
        <IconButton size="small" onClick={handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {showFirst && (
        <DialogDynamic
          open={showChangeNameDialog}
          onClose={() => setShowChangeNameDialog(false)}
        />
      )}
    </>
  );
};

export default ChangeName;
