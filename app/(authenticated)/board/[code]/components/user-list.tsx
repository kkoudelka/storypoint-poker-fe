"use client";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import classes from "./user-list.styles.module.scss";
import UserListContextMenu from "./user-context-menu";
import Ticket from "./ticket";
import { BoardStatus, UserBoardStatus } from "@/src/gql/types";

interface IProps {
  users:
    | {
        __typename?: "UserVote";
        status: UserBoardStatus;
        vote?: string | null;
        admin: boolean;
        user: {
          __typename?: "User";
          id: number;
          username: string;
          email: string;
        };
      }[];

  status: BoardStatus;
  code: string;
  isAdmin: boolean;
}

const UserList: React.FC<IProps> = ({ users, status, code, isAdmin }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Ticket />
      <Divider />
      <List>
        <TransitionGroup>
          {users.map(x => (
            <Collapse key={`user-${x.user.id}`}>
              <ListItem>
                <UserListContextMenu
                  userId={x.user.id}
                  code={code}
                  isAdmin={isAdmin}
                  isModerator={x.admin}
                  isOfflineOrIdle={
                    x.status === UserBoardStatus.Offline ||
                    x.status === UserBoardStatus.Idle
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Badge
                        color="primary"
                        variant="dot"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        classes={{
                          colorPrimary: classNames({
                            [classes.online]:
                              x.status === UserBoardStatus.Online,
                            [classes.offline]:
                              x.status === UserBoardStatus.Offline,
                            [classes.idle]: x.status === UserBoardStatus.Idle,
                          }),
                        }}
                      >
                        <Avatar
                          src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${x.user.email}`}
                        />
                      </Badge>
                    </Box>
                    <Box sx={{ mr: "auto", display: "flex", gap: 1 }}>
                      <Typography
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {x.user.username}
                      </Typography>
                      {x.admin && <AdminPanelSettingsIcon />}
                    </Box>
                    <Box>
                      {status === BoardStatus.Results && (
                        <Typography sx={{ fontWeight: 800 }}>
                          {x.vote}
                        </Typography>
                      )}
                      {status === BoardStatus.Voting && (
                        <>{x.vote && <CheckIcon />}</>
                      )}
                    </Box>
                  </Box>
                </UserListContextMenu>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Paper>
  );
};

export default UserList;
