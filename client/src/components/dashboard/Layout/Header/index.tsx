import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <header
      className={clsx("flex gap-2 text-5xl font-black mb-16", props.className)}
    >
      {props.children}
    </header>
  );
};

export default Header;
