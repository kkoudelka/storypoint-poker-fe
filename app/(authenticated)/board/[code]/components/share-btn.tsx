"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useBoardContext } from "./board-context";
import useCopyToClipboard from "@/src/hooks/useCopyToClipboard";
import { appUrl } from "@/src/utils";

const ShareButton: React.FC = () => {
  const {
    code,
    board: { title },
  } = useBoardContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { copy, showCopied } = useCopyToClipboard({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (value: string) => () => {
    copy(value);
    handleClose();
  };

  return (
    <>
      <Tooltip
        title={<Typography>Copied!</Typography>}
        open={showCopied}
        disableFocusListener
        disableHoverListener
        arrow
      >
        <Button startIcon={<ShareIcon />} onClick={handleClick}>
          Share
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopy(`${appUrl}/board/${code}`)}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          Participation link
        </MenuItem>
        <MenuItem onClick={handleCopy(`${appUrl}/view/${code}`)}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          View-only link
        </MenuItem>
        <MenuItem
          onClick={() => {
            const message = `${title} | Storypoint Poker\n
Participation link: ${appUrl}/board/${code}
View-only link: ${appUrl}/view/${code}`;

            copy(message);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          Both links in a nice message
        </MenuItem>
      </Menu>
    </>
  );
};

export default ShareButton;
