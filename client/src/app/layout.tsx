"use client";

import "./globals.css";
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
      </body>
    </html>
  );
}
