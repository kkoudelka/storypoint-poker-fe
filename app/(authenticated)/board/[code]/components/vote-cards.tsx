"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import options from "@/src/config/options";

interface IProps {
  onChange: (vote: null | string) => Promise<unknown>;
  currentVote: string | null;
}

const VoteCards: React.FC<IProps> = ({ onChange, currentVote }) => {
  const handleChange = (vote: string) => async () => {
    if (vote === currentVote) {
      await onChange(null);
    } else {
      await onChange(vote);
    }
  };

  return (
    <Grid container spacing={2}>
      {options.map(option => {
        const isSelected = option === currentVote;

        return (
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={2}
            key={`opt-${option}`}
            sx={theme => ({
              height: 180,

              [theme.breakpoints.down("md")]: {
                height: 120,
              },
            })}
          >
            <Card
              sx={theme => ({
                height: "100%",
                ...(isSelected && {
                  ...(theme.palette.mode === "light" && {
                    borderColor: theme.palette.primary.light,
                    borderWidth: 6,
                    borderStyle: "solid",
                  }),
                }),
              })}
            >
              <CardActionArea
                sx={theme => ({
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  transition: "all .05s ease-in-out",

                  ...(isSelected && {
                    ...(theme.palette.mode === "dark" && {
                      backgroundColor: theme.palette.primary.dark,
                    }),
                  }),
                })}
                onClick={handleChange(option)}
              >
                <Typography
                  sx={theme => ({
                    fontSize: 52,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 32,
                    },
                  })}
                >
                  {option}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VoteCards;
