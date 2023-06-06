import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={clsx("flex flex-col gap-2 mb-16", props.className)}>
      <h1 className={"flex items-center text-4xl h-16 font-black"}>
        {props.children}
      </h1>
    </header>
  );
};

export default Header;
