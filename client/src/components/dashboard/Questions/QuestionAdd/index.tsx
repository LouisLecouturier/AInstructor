import React, { FC } from "react";
import clsx from "clsx";

import AddIcon from "@icons/Plus.svg";


type QuestionAddProps = {
  onClick: () => void;
};

const QuestionAdd:FC<QuestionAddProps> = (props) => {
  return (
    <article
      onClick={props.onClick}
      className={clsx(
        "flex flex-col items-center justify-center",
        "p-4 py-3 w-full h-52",
        "bg-white hover:bg-dark-10",
        "border-2 border-dark-50 rounded-lg",
        "cursor-pointer transition"
      )}
    >
      <AddIcon className="h-1/3 aspect-square" />
    </article>
  );
};

export default QuestionAdd;
