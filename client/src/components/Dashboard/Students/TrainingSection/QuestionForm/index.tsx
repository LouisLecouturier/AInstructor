import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QuestionElement from "@components/Dashboard/Questions/Question";
import { nanoid } from "nanoid";
import { fetchQuestionsTrainingBatch } from "@requests/question";
import clsx from "clsx";
import { Button } from "@components/Layout/Interactions/Button";

type QuestionFormProps = {
  quizzUuid: string;
  accessToken: string;
};

type Question = {
  uuid: string;
  statement: string;
  type: "text" | "qcm";
};

const answerQuestions = (
  quizzUuid: string,
  answers: any,
  accessToken: string
) => {
  const res = fetch("http://localhost:8000/answer/answer-quizz", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      quizz: quizzUuid,
      answers,
    }),
  });
};

const QuestionForm: FC<QuestionFormProps> = (props) => {
  const [correction, setCorrection] = useState([]);

  const { data, isLoading } = useQuery<Question[]>(["questions"], {
    queryFn: () =>
      fetchQuestionsTrainingBatch(props.quizzUuid, props.accessToken),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    const answer: { question_uuid: string; answer: string }[] = [];

    Object.keys(formData).map((key, index) => {
      answer.push({
        question_uuid: key,
        answer: String(formData[key]),
      });
    });

    console.log(answer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("flex flex-col gap-8", "max-w-lg")}
    >
      <div className={"flex flex-col gap-4"}>
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => i + 1).map((_, i) => (
              <QuestionElement
                key={nanoid()}
                uuid={""}
                isLoading
                questionNumber={i + 1}
                statement={""}
                type={"text"}
              />
            ))
          : data?.map((question, i) => (
              <QuestionElement
                key={nanoid()}
                uuid={question.uuid}
                questionNumber={i + 1}
                statement={question.statement}
                type={question.type}
              />
            ))}
      </div>
      <Button type={"submit"} rounded={"full"}>
        Valider mes réponses
      </Button>
    </form>
  );
};

export default QuestionForm;
