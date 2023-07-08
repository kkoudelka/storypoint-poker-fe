"use client";

import React from "react";
import { BoardDetailQuery, BoardStatus } from "@/src/gql/types";

interface IBoardContextProps {
  board: NonNullable<BoardDetailQuery["board"]>;
  code: string;
}

const BOARD_CONTEXT = React.createContext<IBoardContextProps>({
  board: {
    __typename: "Board",
    id: 0,
    title: "",
    status: BoardStatus.Voting,
    userVotes: [],
  },
  code: "",
});

export const BoardContextProvider: React.FC<
  React.PropsWithChildren<IBoardContextProps>
> = ({ children, board, code }) => {
  return (
    <BOARD_CONTEXT.Provider value={{ board, code }}>
      {children}
    </BOARD_CONTEXT.Provider>
  );
};

export const useBoardContext = () => React.useContext(BOARD_CONTEXT);
