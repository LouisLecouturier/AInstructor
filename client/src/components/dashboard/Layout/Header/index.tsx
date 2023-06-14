"use client"
import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from 'next/navigation'

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = (props) => {
  const asPath = usePathname() as string;

  return (
    <header className={clsx("flex gap-2 text-5xl font-black mb-16", props.className)}>


      {props.children}
    </header>
  );
};

export default Header;
