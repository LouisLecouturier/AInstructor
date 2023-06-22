import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QuestionElement from "@components/Dashboard/Questions/Question";
import { nanoid } from "nanoid";
import { fetchQuestionsTrainingBatch } from "@requests/question";
import clsx from "clsx";
import { Button } from "@components/Layout/Interactions/Button";
import { useSession } from "next-auth/react";

type QuestionFormProps = {
  quizzUuid: string;
  accessToken: string;
};

type Question = {
  uuid: string;
  statement: string;
  type: "text" | "qcm";
};

type QuestionCorrection = {
  question: string;
  answer: string;
  AICorrection: string;
  isCorrect: boolean;
  givenAnswer: string;
};

const answerQuestions = async (
  quizzUuid: string,
  answers: any,
  accessToken: string
) => {
  console.log("yee");
  const res = await fetch("http://localhost:8000/api/answer/answer-quizz", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      quizz: quizzUuid,
      answers,
    }),
  });

  return await res.json();
};

const QuestionForm: FC<QuestionFormProps> = (props) => {
  const [correction, setCorrection] = useState<QuestionCorrection[]>([]);
  const { data: session } = useSession();

  const { data, isLoading } = useQuery<Question[]>(["questions"], {
    queryFn: () =>
      fetchQuestionsTrainingBatch(props.quizzUuid, props.accessToken),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    const answers: { question_uuid: string; answer: string }[] = [];

    Object.keys(formData).map((key, index) => {
      answers.push({
        question_uuid: key,
        answer: String(formData[key]),
      });
    });

    if (session?.user.accessToken) {
      const data = await answerQuestions(
        props.quizzUuid,
        answers,
        session.user.accessToken
      );
      setCorrection(data.answers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-8")}>
      <div
        className={"grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4"}
      >
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
          : data?.map((question, i) => {
              const questionCorrection: QuestionCorrection | undefined =
                correction?.find((q) => {
                  return q.question === question.uuid;
                });

              return (
                <QuestionElement
                  key={nanoid()}
                  uuid={question.uuid}
                  correction={questionCorrection?.AICorrection}
                  feedback={
                    !!questionCorrection
                      ? questionCorrection.isCorrect
                        ? "correct"
                        : "incorrect"
                      : undefined
                  }
                  givenAnswer={questionCorrection?.givenAnswer}
                  questionNumber={i + 1}
                  statement={question.statement}
                  type={question.type}
                />
              );
            })}
      </div>
      <Button type={"submit"} rounded={"full"}>
        Valider mes réponses
      </Button>
    </form>
  );
};

export default QuestionForm;
