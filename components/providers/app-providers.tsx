"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { domAnimation, LazyMotion } from "framer-motion";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { SnackbarProvider } from "notistack";
import { ApolloWrapper } from "./apollo";
import makeTheme from "@/src/config/theme";

interface IProps {
  session: Session | null;
  darkMode: boolean;
}

const AppProviders: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  session,
  darkMode,
}) => {
  const pathname = usePathname();
  return (
    <SessionProvider session={session}>
      <ApolloWrapper>
        <ThemeProvider theme={makeTheme(darkMode)}>
          <SnackbarProvider>
            <CssBaseline />
            <LazyMotion features={domAnimation}>
              <React.Fragment key={pathname}>{children}</React.Fragment>
            </LazyMotion>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
};

export default AppProviders;
