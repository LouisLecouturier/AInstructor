import React, { FC } from "react";
import Skeleton from "@components/Layout/Skeleton";
import clsx from "clsx";
import Input from "@components/Layout/Interactions/Forms/Input";

import SuccessIcon from "@icons/Checkmark.svg";
import ErrorIcon from "@icons/Close.svg";

import styles from "./Question.module.scss";
import ReactMarkdown from "react-markdown";

type QuestionProps = {
  uuid: string;
  questionNumber: number;
  statement: string;
  feedback?: "correct" | "incorrect";
  type: "text" | "qcm";
  style?: React.CSSProperties;
  possibleAnswers?: string[];
  givenAnswer?: string;
  correction?: string;
  isLoading?: boolean;
  isCorrectionLoading?: boolean;
  className?: string;
  animate?: boolean;
};

const containerClassNames = clsx(
  "flex flex-col gap-4",
  "border-2 border-dark-50",
  "rounded-xl",
  "h-fit"
);

const correctionContainerClassNames = clsx(
  "flex flex-col gap-4",
  "outline outline-2",
  "rounded-xl"
);

const feedbackClassNames = {
  correct: "outline-green-300",
  incorrect: "outline-secondary-300",
};

const feedbackTextClassNames = {
  correct: "text-green-500",
  incorrect: "text-secondary-500",
};

const FeedBackIcon = ({ feedback }: { feedback: "correct" | "incorrect" }) => {
  if (feedback === "correct") {
    return <SuccessIcon className={"w-8 h-8"} />;
  }

  return <ErrorIcon className={"w-8 h-8"} />;
};

const QuestionElement: FC<QuestionProps> = (props) => {
  if (props.isLoading) {
    return (
      <article
        className={clsx(containerClassNames, "p-4", props.className)}
        style={props.style}
      >
        <Skeleton className={"h-8 w-3/4"} />
        <div className={"flex flex-col gap-2 w-full"}>
          <Skeleton className={"w-1/2 h-4"} />
          <Skeleton className={"w-1/2 h-4"} />
        </div>
        <Skeleton className={"w-full h-24"} rounded={"lg"} />
      </article>
    );
  }
  if (props.isCorrectionLoading) {
    return (
      <article
        className={clsx(
          containerClassNames,
          "p-4",
          "animate-pulse",
          props.className
        )}
        style={props.style}
      >
        <header>
          <div className={"flex justify-between"}>
            <h2 className={clsx("font-black text-lg text-accent-500")}>
              Question n°{props.questionNumber}
            </h2>
          </div>
          <p className={"font-medium"}>{props.statement}</p>
        </header>
        <div
          className={clsx(
            "w-full min-h-[4rem] p-2",
            "text-sm font-semibold italic",
            "bg-accent-50 text-dark-300 rounded-md",
            "cursor-text"
          )}
        >
          {props.givenAnswer}
        </div>
      </article>
    );
  }

  if (props.feedback) {
    return (
      <article
        className={clsx(containerClassNames, props.className)}
        style={props.style}
      >
        <div
          className={clsx(
            correctionContainerClassNames,
            "p-4 h-fit",
            props.feedback && feedbackClassNames[props.feedback]
          )}
        >
          <header>
            <div className={"flex justify-between"}>
              <h2
                className={clsx(
                  "font-black text-lg text-accent-500",
                  props.feedback && feedbackTextClassNames[props.feedback]
                )}
              >
                Question n°{props.questionNumber}
              </h2>
              {props.feedback && (
                <div className={feedbackTextClassNames[props.feedback]}>
                  <FeedBackIcon feedback={props.feedback} />
                </div>
              )}
            </div>
            <p className={"font-medium"}>{props.statement}</p>
          </header>

          <div className={"flex flex-col gap-1"}>
            <label className={"italic font-semibold text-dark-300"}>
              Your answer :
            </label>
            <div
              className={clsx(
                "w-full px-4 py-2 rounded-lg",
                feedbackTextClassNames[props.feedback],
                "bg-white font-semibold text-dark-300",
                "border-2 border-dark-50"
              )}
            >
              {props.givenAnswer && props.givenAnswer.length > 0
                ? props.givenAnswer
                : "No answer given"}
            </div>
          </div>
        </div>
        {props.feedback === "incorrect" && (
          <div className={"flex flex-col gap-1 px-4 pb-4"}>
            <label className={"font-black text-accent-500"}>Correction :</label>
            <ReactMarkdown
              className={clsx("font-semibold italic text-dark-300")}
            >
              {String(props.correction)}
            </ReactMarkdown>
          </div>
        )}
      </article>
    );
  }

  return (
    <article
      className={clsx(
        containerClassNames,
        "p-4",
        props.animate && styles["animate"],
        props.className
      )}
      style={props.style}
    >
      <header>
        <div className={"flex justify-between"}>
          <h2 className={clsx("font-black text-lg text-accent-500")}>
            Question n°{props.questionNumber}
          </h2>
        </div>
        <p className={"font-medium"}> {props.statement}</p>
      </header>

      <Input
        name={props.uuid}
        placeholder={"Write your answer..."}
        className={"placeholder:italic"}
        textarea
        borders
      />
    </article>
  );
};

export default QuestionElement;
