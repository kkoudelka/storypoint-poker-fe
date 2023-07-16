"use client";

import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";
import PieSummary from "./chart";
import RadarSummary from "./radar";
import { UserBoardStatus } from "@/src/gql/types";

interface IProps {
  votes: {
    __typename?: "UserVote" | undefined;
    status: UserBoardStatus;
    vote?: string | null | undefined;
    admin: boolean;
    user: {
      __typename?: "User" | undefined;
      id: number;
      username: string;
      email: string;
    };
  }[];
}

const ChartContainer: React.FC<IProps> = ({ votes }) => {
  const groupped = useMemo(() => {
    const validVotes = votes.filter(
      x => x.vote !== null && x.vote !== undefined,
    );

    const groups = validVotes.reduce((acc, curr) => {
      const { vote } = curr;
      if (!vote) {
        return acc;
      }
      if (!acc[vote]) {
        acc[vote] = 0;
      }
      acc[vote] += 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(groups).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [votes]);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <PieSummary data={groupped} />
      </Grid>
      {groupped.length > 2 && (
        <Grid item xs={12} md={6}>
          <RadarSummary data={groupped} />
        </Grid>
      )}
    </Grid>
  );
};

export default ChartContainer;
