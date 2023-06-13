import React, { FC } from "react";
import QuestionEdit from "../../Questions/QuestionEditor";
import { Button } from "@components/Interactions/Button";
import Container from "@components/layout/Container";

import StarsIcon from "@icons/Stars.svg";
import { nanoid } from "nanoid";

type QuestionsEditorProps = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
};
type Question = {
  question: string;
  isLoading?: boolean;
};

const QuestionsManager: FC<QuestionsEditorProps> = (props) => {
  const deleteQuestionAtIndex = (index: number) => {
    console.log("deleteQuestionAtIndex", index)
    const updatedQuestions = [...props.questions].filter((_, i) => i !== index);
    props.setQuestions(updatedQuestions);
  };

  const generateQuestions = () => {
    const newQuestions = props.questions.concat(
      Array.from({ length: 5 }, () => ({ question: "", isLoading: true }))
    );
    props.setQuestions(newQuestions);

    setTimeout(() => {
      const trueQuestions = props.questions.filter(
        (question) => !question.isLoading
      );
      const updatedQuestions = trueQuestions.concat(
        Array.from({ length: 5 }, () => ({
          question: "This is a question",
        }))
      );
      props.setQuestions(updatedQuestions);
    }, 5000);
  };

  return (
    <Container
      title={"Manage questions"}
      description={"Manage training questions for your students"}
      action={
        <Button
          size={"sm"}
          rounded={"full"}
          isMagic
          onClick={generateQuestions}
        >
          <StarsIcon className={"w-5 h-5"} />
          <span>Generate questions</span>
        </Button>
      }
    >
      <div
        className={"grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4"}
      >
        {props.questions.map((question, index) => (
          <QuestionEdit
            key={nanoid()}
            index={index + 1}
            question={question}
            onDelete={() => deleteQuestionAtIndex(index)}
          />
        ))}
      </div>
      <Button size={"sm"} rounded={"full"}>
        Save questions
      </Button>
    </Container>
  );
};

export default QuestionsManager;
