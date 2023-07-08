"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatRelative } from "date-fns";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { type GetBoardsQuery } from "@/src/gql/types";

interface IProps {
  initialBoards: GetBoardsQuery["boards"];
}

const BoardsList: React.FC<IProps> = ({ initialBoards }) => {
  return (
    <>
      <List sx={{ width: "100%" }}>
        {initialBoards.map(board => (
          <ListItem
            key={board.id}
            sx={{
              width: "100%",
              "& a": {
                color: "inherit",
                textDecoration: "none",
                width: "100%",
              },
            }}
            secondaryAction={
              <Tooltip title="Open in read-only mode">
                <Link href={`/view/${board.code}`}>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            }
          >
            <Link href={`/board/${board.code}`}>
              <ListItemButton sx={{ p: 2, width: "100%" }}>
                <ListItemAvatar sx={{ mr: 3 }}>
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={`https://api.dicebear.com/6.x/shapes/svg?seed=${board.code}`}
                  />
                </ListItemAvatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: "bold", fontSize: 28 }}>
                      {board.title}
                    </Typography>
                    <Typography>
                      Last updated:{" "}
                      {formatRelative(new Date(board.lastUpdate), new Date())}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BoardsList;
