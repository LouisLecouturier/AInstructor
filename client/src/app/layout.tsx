"use client";

import "./globals.scss";

import { ReactNode } from "react";
import Provider from "./provider";


interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="flex h-full flex-col">
        <Provider>
            <div className="grow">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
