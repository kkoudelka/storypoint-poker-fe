import { getServerSession } from "next-auth";
import React from "react";
import { cookies } from "next/headers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AppLayout from "@/components/layout/app-layout";
import AppProviders from "@/components/providers/app-providers";
import "@/styles/globals.scss";
import { appUrl } from "@/src/utils";

const getDarkModePrefs = () => {
  const c = cookies();
  if (!c.has("prefers-dark-mode")) {
    return true;
  }
  return c.get("prefers-dark-mode")?.value === "true";
};

export const metadata = {
  title: {
    template: "%s | Storypoint Poker",
    default: "Storypoint Poker",
  },
  description: "A refinement tool for agile teams",
  authors: [{ name: "Karel Koudelka", url: "https://koudelka.dev" }],
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const prefersDarkMode = getDarkModePrefs();

  return (
    <html lang="en">
      <body>
        <AppProviders session={session} darkMode={prefersDarkMode}>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
