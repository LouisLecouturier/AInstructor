import React, { FC, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QuestionElement from "@components/Dashboard/Questions/Question";
import { nanoid } from "nanoid";
import { fetchQuestionsTrainingBatch } from "@requests/question";
import clsx from "clsx";
import { Button } from "@components/Layout/Interactions/Button";
import { useAnswerStore } from "@components/Dashboard/Students/TrainingSection/QuestionForm/answer.store";
import { getAnswerFromQuestion } from "@components/Dashboard/Students/TrainingSection/QuestionForm/logic";
import { toastStore } from "@components/Layout/Toast/toast.store";
import Feedback from "@components/Dashboard/Students/TrainingSection/FeedBack";
import Spinner from "@icons/Loading.svg";
import Reload from "@icons/Reload.svg";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

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

const fetchCorrection = async (
  quizzUuid: string,
  answers: any,
  accessToken: string
) => {
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { answers, answerQuestions } = useAnswerStore();

  const queryClient = useQueryClient();
  const openToast = toastStore((state) => state.openToast);

  const { data, isLoading, refetch } = useQuery<Question[]>(["questions"], {
    queryFn: () =>
      fetchQuestionsTrainingBatch(props.quizzUuid, props.accessToken),
  });

  const {
    data: correction,
    isLoading: isCorrectionLoading,
    isFetching: isCorrectionFetching,
    refetch: getCorrection,
  } = useQuery<{
    quizz: string;
    answers: QuestionCorrection[];
    score: number;
  }>(["correction"], {
    queryFn: async () => {
      openToast("info", "Loading correction...");
      const data = await fetchCorrection(
        props.quizzUuid,
        answers,
        props.accessToken
      );
      openToast("success", "Correction loaded !");
      return data;
    },
    enabled: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

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

    answerQuestions(answers);

    if (props.accessToken) {
      await queryClient.invalidateQueries(["correction"]);
      await getCorrection();
    }
  };

  const handleReload = async () => {
    openToast("info", "Good luck !");
    answerQuestions([]);
    queryClient.setQueryData(["correction"], null);
    await refetch();
    setIsSubmitted(false);
  };

  if (isSubmitted && data && correction) {
    return (
      <div className={"flex flex-col gap-8"}>
        <div
          className={
            "grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4"
          }
        >
          {data.map((question, index) => {
            const givenAnswer = getAnswerFromQuestion(answers, question.uuid);
            const questionCorrection: QuestionCorrection | undefined =
              correction?.answers.find((q) => {
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
                givenAnswer={givenAnswer?.answer ?? "fo"}
                questionNumber={index + 1}
                statement={question.statement}
                type={question.type}
              />
            );
          })}
        </div>
        <div className={"flex flex-col gap-4"}>
          <Feedback score={correction.score} />
          <Button rounded={"full"} className={"group"} onClick={handleReload}>
            <Reload className={"w-8 h-8 group-hover:animate-spin transition"} />
            <span>Train again</span>
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted && data && isCorrectionFetching) {
    return (
      <div className={"flex flex-col gap-8"}>
        <div
          className={
            "grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4"
          }
        >
          {data.map((question, index) => {
            const givenAnswer = getAnswerFromQuestion(answers, question.uuid);
            return (
              <QuestionElement
                key={nanoid()}
                uuid={question.uuid}
                isCorrectionLoading={isCorrectionFetching}
                givenAnswer={givenAnswer?.answer}
                questionNumber={index + 1}
                statement={question.statement}
                type={question.type}
              />
            );
          })}
        </div>
        <div
          className={clsx(
            "flex items-center justify-center gap-8",
            "bg-dark-10",
            "p-8",
            "text-lg text-dark-200 font-bold rounded-sm"
          )}
        >
          <Spinner className={"w-12 h-12 animate-spin text-accent-500"} />
          <span className={"w-max"}>
            Please wait while the AI coach is correcting your answers...
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={clsx("flex flex-col gap-8")}>
        <div
          className={
            "grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] grid-flow-dense gap-4"
          }
        >
          {Array.from({ length: 5 }, (_, i) => i + 1).map((_, i) => (
            <QuestionElement
              key={nanoid()}
              uuid={""}
              isLoading
              questionNumber={i + 1}
              statement={""}
              type={"text"}
            />
          ))}
        </div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <ContainerMessage>
        Your coach has no question for you yet. Please come back later.
      </ContainerMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-8")}>
      <div
        className={
          "grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] grid-flow-dense gap-4"
        }
      >
        {data?.map((question, i) => (
          <QuestionElement
            key={nanoid()}
            style={{ animationDelay: `${i * 100}ms` } as any}
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
