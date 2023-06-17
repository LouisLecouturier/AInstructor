import React, { FC, ReactNode } from "react";
import clsx from "clsx";
<<<<<<< HEAD
=======
import { usePathname, useRouter } from 'next/navigation'
import { nanoid } from "nanoid";

>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d

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
<<<<<<< HEAD
=======

        <h1 className="text-dark-500 font-normal text-xl"></h1>

        { path.length > 1 && 

          <div className="flex gap-1">
            { path.map((section, index) => {
              return (
                <React.Fragment key={nanoid()}>
                  <h1 key={index} className="text-dark-500 font-normal italic text-xl hover:underline">{section}</h1>
                  <span className="text-dark-500 font-normal text-xl">/</span>
                </React.Fragment>
              )
            })}
          </div>
        }


>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
    </header>
  );
};

export default Header;
