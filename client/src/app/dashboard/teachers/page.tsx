"use client";


import { useSession } from "next-auth/react";
import { Button } from "@/components/Interactions/Button";
import QuestionEdit from "@/components/dashboard/Questions/QuestionEditor";
import Header from "@components/dashboard/Layout/Header";

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
        
        
  const {data : session} = useSession()
  console.log({session})
        
  return (
    <>
      <Header>Dashboard</Header>
      <div className="flex flex-col gap-4 my-20px">
        {questions.map((question, index) => (
          <QuestionEdit
            key={question.id}
            index={index + 1}
            question={question.question}
            onAccept={() => onAccept(index)}
            onDelete={() => onDelete(index)}
            onEdit={() => onEdit(index)}
          />
        ))}
      </div>
      <Button
        size="md"
        rounded="sm"
      >
        Confirm
      </Button>

    </>
  );
}
