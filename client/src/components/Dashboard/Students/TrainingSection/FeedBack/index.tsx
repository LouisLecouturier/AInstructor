import React, { FC } from "react";
import clsx from "clsx";

const computeMessage = (score: number) => {
  if (score < 3) {
    return "I'm sure you can do better ! 😢";
  }

  if (score < 4) {
    return "Good job, you're almost there ! 💪🏻";
  }

  return "You rock 🤘🏻! Keep going ! 🔥";
};

type FeedbackProps = {
  score: number;
};

const feedBackClassNames: Record<string, string> = {
  bad: "text-secondary-500",
  ok: "text-primary-500",
  good: "text-success-500",
};

const getLevel = (score: number) => {
  if (score < 3) {
    return "bad";
  }

  if (score < 5) {
    return "ok";
  }

  return "good";
};

const Feedback: FC<FeedbackProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-8",
        "p-8",
        "bg-dark-10",
        "rounded-sm"
      )}
    >
      <div
        className={clsx(
          "text-4xl font-black text-primary-500",
          feedBackClassNames[getLevel(props.score)]
        )}
      >
        {props.score}/5
      </div>
      <span className={"text-lg font-semibold text-dark-200"}>
        {computeMessage(props.score)}
      </span>
    </div>
  );
};

export default Feedback;
