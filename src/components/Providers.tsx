"use client";
import React, { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import SessionExpirationHandler from "./SessionExpirationHandler";

import { NextUIProvider } from "@nextui-org/react";
// import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children: ReactNode;
}
const Providers = ({ children }: Props) => {
  // const { data: session } = useSession()

  //   useEffect(() => {
  //     // check if the error has occurred
  //     if (!session) {
  //         // Sign out here
  //         signOut();
  //     }
  // }, [session]);

  return (
    <ThemeProvider attribute="class">
      <SessionProvider refetchInterval={10}>
        <SessionExpirationHandler />
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
