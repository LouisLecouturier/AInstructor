"use client";

import { Button } from "@/components/Interactions/Button";
import React, { useRef, useState } from "react";
import Input from "@components/Interactions/Forms/Input";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";

import Close from "@icons/Close.svg";
import Check from "@icons/Checkmark.svg";

type Question = {
  index: number;
  question: string;
  onAccept: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function QuestionEdit(props: Question) {
  const question = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  const [questionValue, setQuestionValue] = useState(question); // [value, setValue
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setIsEditing(false);
  };

  useOnClickOutside(containerRef, handleClickOutside);

  return (
    <article
      className="flex flex-col gap-4 p-4 py-3 w-full max-w-lg bg-white rounded-xl"
      ref={containerRef}
    >
      <input type="hidden" name="question" value={questionValue} />
      <div className={"flex flex-col gap-1"}>
        <h3 className="font-semibold text-lg">Question {props.index}</h3>
        {isEditing ? (
          <Input
            isTextArea
            borders
            onChange={(e) => setQuestionValue(e.target.value)}
            className={"italic text-sm px-2"}
            defaultValue={questionValue}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className={clsx(
              "w-full",
              "text-sm font-medium italic",
              "bg-white text-dark-300"
            )}
          >
            {questionValue}
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
        <Button
          size="sm"
          rounded="sm"
          fluid
          onClick={props.onDelete}
          variant="secondary"
          outlined
        >
          <Close className={"w-5 h-5"} />
          <span>Delete</span>
        </Button>
      </div>
    </article>
  );
}
