import { Button } from "@/components/Interactions/Button";
import React from "react";

type Question = {
  index: number;
  question: string;
  onAccept: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function QuestionEdit(props: Question) {
  const question = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  return (
    <article className="flex flex-col gap-1 p-4 py-3 w-96 bg-white rounded-xl">
      <h3 className="font-semibold">Question {props.index}</h3>
      <p>{question}</p>
      <div className="flex gap-2">
        <Button
          size="sm"
          rounded="sm"
          fluid
          onClick={props.onAccept}
          className="bg-green-500 hover:bg-green-600"
        >
          Accept
        </Button>
        <Button size="sm" rounded="sm" fluid onClick={props.onEdit}>
          Edit
        </Button>
        <Button
          size="sm"
          rounded="sm"
          fluid
          onClick={props.onDelete}
          variant="secondary"
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
