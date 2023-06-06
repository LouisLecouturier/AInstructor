"use client";

import { Button } from "@/components/Interactions/Button";
import QuestionEdit from "@/components/dashboard/Questions/QuestionEditor";


const questions = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const onDelete = (questionNumber: number) => {
  console.log("Delete", questionNumber);
};

const onAccept = (questionNumber: number) => {
  console.log("Accept", questionNumber);
};

const onEdit = (questionNumber: number) => {
  console.log("Edit", questionNumber);
};

export default function Dashboard({}) {
  return (
      <div className="flex flex-col gap-10">
        <header>
          <h1 className={"flex items-center h-16 text-5xl font-black"}>
            Dashboard
          </h1>
          <div className="flex flex-col gap-4 my-20px">
            {questions.map((question, index) => (
              <QuestionEdit
                key={question.id}
                index={index}
                question={question.question}
                onAccept={() => onAccept(index)}
                onDelete={() => onDelete(index)}
                onEdit={() => onEdit(index)}
              />
            ))}
          </div>
        </header>
        <Button
          className="w-96 bg-green-700 hover:bg-green-800 "
          size="md"
          rounded="sm"
        >
          Confirm
        </Button>
      </div>
  );
}
