"use client";

import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import { BoardDetailQuery } from "@/src/gql/types";

interface IProps {
  state: BoardDetailQuery["board"];
}

const DebugState: React.FC<IProps> = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.toggleDebug = () => setIsOpen(prev => !prev);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)["toggleDebug"];
    };
  }, []);

  return (
    <>
      <Collapse in={isOpen} unmountOnExit>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Collapse>
    </>
  );
};

export default DebugState;
