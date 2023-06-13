"use client";

import "./globals.scss";

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
      </body>
    </html>
  );
}
