import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
//for navbar toggle
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "FInance Tracker",
  description: "Track your Expenses.Money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="scroll-smooth dark:text-white text-black dark:bg-gradient-to-b from-gray-800 via-gray-900 to-black  bg-lightWhite">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </StoreProvider>
  );
}
