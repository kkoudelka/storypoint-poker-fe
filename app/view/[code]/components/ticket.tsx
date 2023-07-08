"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import Collapse from "@mui/material/Collapse";
import TimerIcon from "@mui/icons-material/Timer";
import { useBoardContext } from "@/app/(authenticated)/board/[code]/components/board-context";

const formatToTwoDigits = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

const isStringUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};

const UrlComponent: React.FC<{ url: string }> = ({ url }) => {
  // get last path from url and remove any query params
  const path = url.split("/").pop();
  // get last path from url and remove any query params

  return (
    <Box
      sx={{
        "& a": {
          textDecoration: "underline",
        },
      }}
    >
      <a href={url} target="_blank" rel="noreferrer">
        {path}
      </a>
    </Box>
  );
};

const Ticket: React.FC = () => {
  const {
    board: { ticket, ticketTimer },
  } = useBoardContext();

  const { reset, pause, seconds, minutes, hours } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (ticketTimer) {
      const timerStarted = new Date(ticketTimer);
      const now = new Date();
      const diff = now.getTime() - timerStarted.getTime();
      const diffInSeconds = Math.floor(diff / 1000);
      const date = new Date();
      // Tady má být plusítko :) (Hledal jsem chybu asi 10 minut)
      date.setSeconds(date.getSeconds() + diffInSeconds);

      reset(date, true);
    } else {
      pause();
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketTimer]);

  return (
    <Box
      sx={{
        px: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ display: "flex", gap: 1, fontSize: 26 }}>
          Ticket:{" "}
          <Box component="span" sx={{ fontWeight: 600, display: "flex" }}>
            {ticket ? (
              isStringUrl(ticket) ? (
                <UrlComponent url={ticket} />
              ) : (
                ticket
              )
            ) : (
              "NONE"
            )}
          </Box>
        </Typography>
      </Box>
      <Collapse in={ticket !== null} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TimerIcon />
          <Typography
            sx={theme => ({
              fontSize: 24,
              fontWeight:
                theme.palette.mode === "dark"
                  ? theme.typography.fontWeightMedium
                  : 700,
              transition: "color 0.5s ease-in-out, animation 1s ease-in-out",
              ...(minutes >= 5 && { color: theme.palette.primary.main }),
              ...(minutes >= 10 && { color: theme.palette.error.main }),
              ...(minutes >= 15 && {
                animation: "blinkingText 2s infinite",
                "@keyframes blinkingText": {
                  "0%": { color: theme.palette.error.main },
                  "25%": { color: theme.palette.error.main },
                  "50%": { color: theme.palette.text.primary },
                  "75%": { color: theme.palette.text.primary },
                  "100%": { color: theme.palette.error.main },
                },
              }),
            })}
          >
            {formatToTwoDigits(hours)}:{formatToTwoDigits(minutes)}:
            {formatToTwoDigits(seconds)}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Ticket;
