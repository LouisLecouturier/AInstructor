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
  onEdit?: (statement: string) => void;
  onDelete?: () => void;
};

export default function QuestionEdit(props: QuestionEditProps) {
  const [question, setQuestion] = useState<Question>(props.question); // [value, setValue
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClickOutside = () => {
    if (!isEditing) return;

    setIsEditing(false);
    props.onEdit?.(question.statement);
  };

  useOnClickOutside(containerRef, handleClickOutside);

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);
    props.onEdit?.(question.statement);
  };

  console.log(question);

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

          <Input
            inputRef={inputRef}
            textarea
            borders
            onChange={(e) => setQuestion({ statement: e.target.value })}
            className={clsx("italic text-sm px-2", !isEditing && "hidden")}
            placeholder={"Write your question here..."}
            size={"sm"}
            defaultValue={question?.statement}
          />

          <div
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 10);
            }}
            className={clsx(
              "w-full min-h-[4rem] p-2",
              "text-sm font-semibold italic",
              "bg-accent-50 text-dark-300 rounded-md",
              "cursor-text",
              isEditing && "hidden"
            )}
          >
            {question?.statement?.length > 0 ? (
              question.statement
            ) : (
              <span className={"text-dark-100"}>
                Write your statement here...
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 w-1/2">
          <Button size="sm" rounded="sm" fluid onClick={handleEdit} className={"border-2 border-accent-500 hover:border-accent-600 active:border-accent-700"}>
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
      <input type="hidden" name="question" value={question?.statement ?? ""} />
      {computeContent()}
    </article>
  );
}
