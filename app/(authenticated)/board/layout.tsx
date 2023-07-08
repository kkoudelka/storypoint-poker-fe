import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Storypoint Poker",
    default: "Storypoint Poker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
