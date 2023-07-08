"use client";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const LandingPage: React.FC = () => {
  const { status } = useSession();
  return (
    <Box
      sx={theme => ({
        position: "relative",
        maxHeight: "100dvh",
        height: `calc(100dvh - 64px)`,
        overflow: "hidden",
        "& video": {
          position: "absolute",
          inset: 0,
          width: "100%",
          overflowY: "hidden",

          [theme.breakpoints.down("md")]: {
            height: "100vh",
            width: "auto",
          },
        },
      })}
    >
      <video src="/landing/bkg.webm" muted autoPlay loop controls={false} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Container
          sx={theme => ({
            display: "flex",
            height: "100%",
            alignItems: "center",
            alignContent: "center",

            "& img": {
              width: 512,
              height: 512,
            },

            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              justifyContent: "center",
              "& img": {
                width: 200,
                height: 200,
              },
            },
          })}
        >
          <img src="/logo.svg" alt="" />
          <Box
            sx={theme => ({
              display: "flex",
              flexDirection: "column",
              gap: 4,
              [theme.breakpoints.down("md")]: {
                alignItems: "center",
              },
            })}
          >
            <Typography
              variant="h1"
              sx={theme => ({
                fontSize: "5rem",
                fontWeight: "bold",
                ...(theme.palette.mode === "light" && { color: "white" }),
                [theme.breakpoints.down("md")]: {
                  fontSize: "3.5rem",
                  textAlign: "center",
                },
              })}
            >
              Storypoint Poker
            </Typography>
            <Typography
              variant="body1"
              sx={theme => ({
                fontSize: "1.5rem",
                ...(theme.palette.mode === "light" && { color: "white" }),
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.2rem",
                  textAlign: "center",
                },
              })}
            >
              Unleash the Power of Collaboration and Estimation
            </Typography>
            {status === "authenticated" && (
              <Link href="/boards">
                <Button>Display available boards</Button>
              </Link>
            )}
            {status === "unauthenticated" && (
              <Box
                sx={theme => ({
                  display: "flex",
                  gap: 2,
                  alignItems: "baseline",
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                })}
              >
                <Link href="/login">
                  <Button>Login to an existing account</Button>
                </Link>
                <Box component="span"> or </Box>
                <Link href="/register">
                  <Button>Create a new account</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
