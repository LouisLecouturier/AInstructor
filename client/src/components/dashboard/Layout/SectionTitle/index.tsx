import React, { ReactNode } from "react";
import clsx from "clsx";

const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h2 className={clsx("flex items-center text-2xl font-bold h-12 mb-4", className)}>{children}</h2>;
};

export default SectionTitle;
