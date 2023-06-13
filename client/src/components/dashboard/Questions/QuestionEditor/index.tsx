"use client";

import { Button } from "@/components/Interactions/Button";
import React, { useRef, useState } from "react";
import Input from "@components/Interactions/Forms/Input";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";

import Close from "@icons/Close.svg";
import Check from "@icons/Checkmark.svg";
import Skeleton from "@components/layout/Skeleton";

type QuestionEditProps = {
  index: number;
  question: Question;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

type Question = {
  question: string;
  isLoading?: boolean;
};

export default function QuestionEdit(props: QuestionEditProps) {
  const [question, setQuestion] = useState<Question>(props.question); // [value, setValue
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setIsEditing(false);
  };

  useOnClickOutside(containerRef, handleClickOutside);

  const computeContent = () => {
    if (question.isLoading) {
      return (
        <div className={"flex flex-col gap-4"}>
          <h3 className={clsx("font-semibold text-lg underline-primary")}>
            Question {props.index}
          </h3>
          <Skeleton className={"w-full h-16"} />
          <Skeleton className={"w-1/2 h-10"} />
        </div>
      );
    }

    return (
      <>
        <div className={"flex flex-col gap-4"}>
          <h3 className={clsx("font-semibold text-lg underline-primary")}>
            Question {props.index}
          </h3>
          {isEditing ? (
            <Input
              textarea
              borders
              onChange={(e) => setQuestion({ question: e.target.value })}
              className={"italic text-sm px-2"}
              size={"sm"}
              defaultValue={question.question}
            />
          ) : (
            <div
              onClick={() => {
                setIsEditing(true);
                props.onEdit?.();
              }}
              className={clsx(
                "w-full min-h-[4rem] p-2",
                "text-sm font-semibold italic",
                "bg-accent-50 text-dark-300 rounded-md"
              )}
            >
              {question.question}
            </div>
          )}
        </div>

        <div className="flex gap-2 w-1/2">
          <Button
            size="sm"
            rounded="sm"
            fluid
            onClick={() => setIsEditing((a) => !a)}
          >
            {isEditing && <Check className={"w-5 h-5"} />}
            <span>{isEditing ? "Save" : "Edit"}</span>
          </Button>
          {props.onDelete && (
            <Button
              size="sm"
              rounded="sm"
              fluid
              onClick={props.onDelete}
              variant="secondary"
              outlined
            >
              <Close className={"w-5 min-w-[1rem] h-5"} />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <article
      className={clsx(
        "flex flex-col gap-8",
        "p-4 py-3 w-full h-fit",
        "bg-white border-2 border-dark-50 rounded-lg"
      )}
      ref={containerRef}
    >
      <input type="hidden" name="question" value={question.question} />
      {computeContent()}
    </article>
  );
}
