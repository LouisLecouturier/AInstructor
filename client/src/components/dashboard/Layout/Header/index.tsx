"use client"
import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from 'next/navigation'


type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = (props) => {

  const path = String(usePathname()).split('/').slice(3);
  const router = useRouter()

  return (
    <header className={clsx(
      "text-5xl font-black mb-16",
      "flex flex-col gap-2",
       props.className,
    )}>
      {props.children}

        <h1 className="text-dark-500 font-normal text-xl"></h1>

        { path.length > 1 && 

          <div className="flex gap-1">
            { path.map((section, index) => {
              return (
                <>
                  <h1 key={index} className="text-dark-500 font-normal italic text-xl hover:underline">{section}</h1>
                  <span className="text-dark-500 font-normal text-xl">/</span>
                </>
              )
            })}
          </div>
        }


    </header>
  );
};

export default Header;
