"use client";

import { Button } from "@components/Layout/Interactions/Button";
import React, { useRef, useState } from "react";
import Input from "@components/Layout/Interactions/Forms/Input";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";

import Close from "@icons/Close.svg";
import Check from "@icons/Checkmark.svg";
import Skeleton from "@components/Layout/Skeleton";
import { Question } from "@/types/question";

type QuestionEditProps = {
  index: number;
  question: Question;
  isLoading?: boolean;
  onEdit?: (question: string) => void;
  onDelete?: () => void;
};

export default function QuestionEdit(props: QuestionEditProps) {
  const [question, setQuestion] = useState<Question>(props.question); // [value, setValue
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = () => {
    if (!isEditing) return;

    setIsEditing(false);
    props.onEdit?.(question.question);
  };

  useOnClickOutside(containerRef, handleClickOutside);

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);
    props.onEdit?.(question.question);
  };

  const computeContent = () => {
    if (question?.isLoading) {
      return (
        <div className={"flex flex-col gap-4"}>
          <h3 className={clsx("font-black text-lg text-accent-500")}>
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
          <h3 className={clsx("font-black text-lg text-accent-500")}>
            Question {props.index}
          </h3>
          {isEditing ? (
            <Input
              textarea
              borders
              onChange={(e) => setQuestion({ question: e.target.value })}
              className={"italic text-sm px-2"}
              placeholder={"Write your question here..."}
              size={"sm"}
              defaultValue={question?.question}
            />
          ) : (
            <div
              onClick={() => {
                setIsEditing(true);
              }}
              className={clsx(
                "w-full min-h-[4rem] p-2",
                "text-sm font-semibold italic",
                "bg-accent-50 text-dark-300 rounded-md",
                "cursor-text"
              )}
            >
              {question?.question?.length > 0 ? (
                question.question
              ) : (
                <span className={"text-dark-100"}>
                  Write your question here...
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 w-1/2">
          <Button size="sm" rounded="sm" fluid onClick={handleEdit}>
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
      <input type="hidden" name="question" value={question?.question ?? ""} />
      {computeContent()}
    </article>
  );
}
