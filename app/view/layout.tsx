import type { Metadata } from "next";
import React from "react";
import Wrapper from "./wrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - ReadOnly | Storypoint Poker",
    default: "Storypoint Poker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
