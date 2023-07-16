"use client";

import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ReplayIcon from "@mui/icons-material/Replay";
import { useSnackbar } from "notistack";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import Box from "@mui/material/Box";
import { useBoardContext } from "./board-context";
import {
  BoardStatus,
  useChangeAdminStatusMutation,
  useRemoveUserFromBoardMutation,
  useResetVotesMutation,
} from "@/src/gql/types";

interface IProps {
  code: string;
  userId: number;
  isAdmin: boolean;
  isModerator: boolean;
  isOfflineOrIdle: boolean;
}

const UserListContextMenu: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  code,
  userId,
  isAdmin,
  isModerator,
  isOfflineOrIdle,
}) => {
  const [mutateResetVote] = useResetVotesMutation();
  const [mutateAdmin] = useChangeAdminStatusMutation();

  const {
    board: { status },
  } = useBoardContext();

  const [mutateRemoveUser] = useRemoveUserFromBoardMutation();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!isAdmin) {
      return;
    }

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleRemoveAdminStatus = async () => {
    handleClose();

    try {
      await mutateAdmin({
        variables: {
          code,
          admin: false,
          userId,
        },
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to change admin status", {
        variant: "error",
      });
    }
  };

  const handleRemoveUser = async () => {
    handleClose();

    try {
      await mutateRemoveUser({
        variables: {
          code,
          userId,
        },
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to remove user from board", {
        variant: "error",
      });
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleResetUserVote = async () => {
    handleClose();
    try {
      await mutateResetVote({
        variables: {
          userId,
          code,
        },
      });
    } catch (e) {
      enqueueSnackbar("Failed to reset user vote", {
        variant: "error",
      });
      console.error(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      aria-haspopup="true"
      aria-expanded={contextMenu !== null ? "true" : "false"}
      onContextMenu={handleContextMenu}
      style={{ cursor: "context-menu", width: "100%" }}
    >
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <Box sx={{ minWidth: 256 }}>
          {status !== BoardStatus.Results && (
            <MenuItem onClick={handleResetUserVote}>
              <ListItemIcon>
                <ReplayIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Reset vote</ListItemText>
            </MenuItem>
          )}
          {isModerator && (
            <MenuItem onClick={handleRemoveAdminStatus}>
              <ListItemIcon>
                <RemoveModeratorIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove moderator role</ListItemText>
            </MenuItem>
          )}
          {isOfflineOrIdle && (
            <MenuItem onClick={handleRemoveUser}>
              <ListItemIcon>
                <PersonRemoveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove user from voting</ListItemText>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </div>
  );
};

export default UserListContextMenu;
