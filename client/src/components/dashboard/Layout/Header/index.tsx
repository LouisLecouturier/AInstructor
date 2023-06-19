import React, { FC, ReactNode } from "react";
import clsx from "clsx";

import { usePathname } from "next/navigation";
import { nanoid } from "nanoid";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = (props) => {
  const path = String(usePathname()).split('/').slice(3);

  return (
    <header
      className={clsx("flex gap-2 text-5xl font-black mb-16", props.className)}
    >
      {props.children}

      <h1 className="text-dark-500 font-normal text-xl"></h1>

      {path?.length > 1 && (
        <div className="flex gap-1">
          {path.map((section, index) => {
            return (
              <React.Fragment key={nanoid()}>
                <h1
                  key={index}
                  className="text-dark-500 font-normal italic text-xl hover:underline"
                >
                  {section}
                </h1>
                <span className="text-dark-500 font-normal text-xl">/</span>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
