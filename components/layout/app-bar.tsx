"use client";

import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import UserMenu from "./user-menu";

const NavBar: React.FC = () => {
  return (
    <AppBar>
      <Toolbar
        sx={theme => ({
          ...(theme.palette.mode === "light" && { color: "white" }),

          "& a": {
            color: "inherit",
            textDecoration: "none",
          },
        })}
      >
        <Link href="/">
          <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
            Storypoint Poker
          </Typography>
        </Link>

        <Box
          sx={theme => ({
            ml: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          <Divider orientation="vertical" sx={{ height: 20 }} />
          <Link href="/boards">
            <Typography
              sx={{
                fontSize: 18,
                color: "inherit",
                transition: "color .1s ease-in-out",
                "&:hover": theme => ({
                  color: theme.palette.primary.main,
                  ...(theme.palette.mode === "light" && { color: "#c9c9c9" }),
                }),
              }}
            >
              Boards
            </Typography>
          </Link>
        </Box>

        <Box sx={{ mr: "auto" }} />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export const AppToolbar = () => <Toolbar />;

export default NavBar;
