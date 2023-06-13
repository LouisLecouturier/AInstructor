"use client";

import "./globals.css";
<<<<<<< HEAD
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="flex h-full flex-col">
        <SessionProvider session={session}>
          <div className="grow">{children}</div>
        </SessionProvider>
=======
import { ReactNode } from "react";
import Provider from "./provider";
import ReactQueryProvider from "./ReactQueryProvider";


interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="flex h-full flex-col">
        <Provider>
          <ReactQueryProvider>
            <div className="grow">{children}</div>
          </ReactQueryProvider>
        </Provider>
>>>>>>> origin/FullStack
      </body>
    </html>
  );
}
