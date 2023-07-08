import { redirect } from "next/navigation";
import React from "react";
import Wrapper from "./wrapper";
import { getSsrSession } from "@/src/utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSsrSession();

  if (!session) {
    redirect("/login");
  }

  return <Wrapper>{children}</Wrapper>;
}
