import React, { FC, useState } from "react";
import QuestionEdit from "../../../Questions/QuestionEditor";
import { Button } from "@components/Layout/Interactions/Button";
import Container from "@components/Layout/Container";

import StarsIcon from "@icons/Stars.svg";
import { nanoid } from "nanoid";
import QuestionAdd from "@components/Dashboard/Questions/QuestionAdd";
import { Question } from "@/types/question";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Check from "@icons/Checkmark.svg";
import { toastStore } from "@components/Layout/Toast/toast.store";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

type QuestionsEditorProps = {
  courseUuid: string;
};

const quizzQuery = (uuid: string, accessToken?: string) => {
  if (!accessToken) return Promise.reject({});

  return fetch(`http://localhost:8000/api/quizz/by-course/${uuid}/questions`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      const data = {
        uuid: res.uuid,
        questions: res.questions.map((question: any) => {
          return { statement: question.statement };
        }),
      };

      return data;
    });
};

const sendQuestions = async (
  quizzUuid: string,
  questions: Question[],
  accessToken?: string
) => {
  await fetch(`http://localhost:8000/api/quizz/questions/${quizzUuid}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      questions: questions.map((question) => question.statement),
    }),
  });

  return Promise.resolve(questions);
};

const QuestionsManager: FC<QuestionsEditorProps> = (props) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const openToast = toastStore((state) => state.openToast);

  const [questions, setQuestions] = useState<Question[]>([]);

  const { data: quizzData, isLoading: quizzLoading, isError : quizzError } = useQuery(
    ["courseQuestions"],
    {
      queryFn: async () => {
        const data = await quizzQuery(props.courseUuid, accessToken);
        setQuestions(data.questions);
        return data;
      },
      enabled: !!accessToken,
    }
  );

  const quizzMutation = useMutation(
    async (questions: Question[]) => {
      if (quizzData) {
        openToast("info", "Updating questions...");
        const data = await sendQuestions(
          quizzData.uuid,
          questions,
          accessToken
        );

        return data;
      }

      return Promise.resolve(questions);
    },
    {
      onSuccess: () => openToast("success", "Questions updated !"),
      onError: () => openToast("error", "An error occurred"),
    }
  );

  const deleteQuestionAtIndex = (index: number) => {
    const updatedQuestions = [...questions].filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const generateQuestions = async () => {
    const newQuestions = questions.concat(
      Array.from({ length: 5 }, () => ({ statement: "", isLoading: true }))
    );
    setQuestions(newQuestions);
    openToast("info", "Generating questions...");

    await fetch(
      `http://localhost:8000/api/course/${props.courseUuid}/generate-questions`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const trueQuestions = questions.filter(
          (question) => !question.isLoading
        );
        const updatedQuestions = trueQuestions.concat(
          res.questions.map((question: Question) => ({
            statement: question,
          }))
        );
        setQuestions(updatedQuestions);
        openToast("success", "Questions generated !");
      })
      .catch((err) => {
        openToast("error", "An error occurred");
      });
  };

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      {
        statement: "",
        isLoading: false,
      },
    ];
    setQuestions(newQuestions);
  };

  const editQuestion = (index: number, question: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].statement = question;
    setQuestions(updatedQuestions);
  };

  const saveQuestions = () => {
    quizzMutation.mutate(questions);
  };

  if (quizzLoading)
    return (
      <Container
        title={"Manage questions"}
        description={"Manage training questions for your students"}
      >
        <div
          className={
            "grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4"
          }
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <QuestionEdit
              key={nanoid()}
              index={i + 1}
              question={{ statement: "", isLoading: true }}
            />
          ))}
        </div>
      </Container>
    );
  if (quizzError)
    return (
      <Container
        title={"Manage questions"}
        description={"Manage training questions for your students"}
      >
        <ContainerMessage>
          An error occurred while loading questions
        </ContainerMessage>
      </Container>
    );

  return (
    <Container
      title={"Manage questions"}
      description={"Manage training questions for your students"}
      action={
        <Button
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
        {questions.map((question, index) => {
          return (
            <QuestionEdit
              key={nanoid()}
              index={index + 1}
              question={question}
              onEdit={(question) => editQuestion(index, question)}
              onDelete={() => deleteQuestionAtIndex(index)}
            />
          );
        })}

        <QuestionAdd onClick={addQuestion} />
      </div>
      <Button rounded={"full"} onClick={saveQuestions}>
        <Check className={"w-6 h-6"} />
        <span>Save questions</span>
      </Button>
    </Container>
  );
};

export default QuestionsManager;
