"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import DarkModeSwitcher from "../user-prefs/dark-mode";
import ChangeName from "../user-prefs/name/change-name";

const UserMenu: React.FC = () => {
  const { status, data } = useSession();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {status === "unauthenticated" && (
          <Link href="/login">
            <Button
              sx={theme => ({
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.main
                    : "white",
              })}
              tabIndex={-1}
            >
              Login
            </Button>
          </Link>
        )}
        {status === "authenticated" && (
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={data?.user?.username}
                  src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${data?.user?.email}`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", minWidth: "200px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  minWidth: 270,
                  display: "flex",
                  alignItems: "center",
                  height: 70,
                  pb: 1,
                }}
              >
                <Avatar
                  alt={data?.user?.username}
                  sx={{ height: 54, width: 54, mx: 2 }}
                  src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${data?.user?.email}`}
                />
                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography>{data?.user?.username}</Typography>
                  <ChangeName onOpen={handleCloseUserMenu} />
                </Box>
              </Box>
              <Divider />
              <MenuItem>
                <DarkModeSwitcher />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => signOut()}>
                <Typography>Sign out</Typography>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </>
  );
};

export default UserMenu;
