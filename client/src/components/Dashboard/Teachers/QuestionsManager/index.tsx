import React, { FC, useState } from "react";
import QuestionEdit from "../../Questions/QuestionEditor";
import { Button } from "@components/Layout/Interactions/Button";
import Container from "@components/Layout/Container";

import StarsIcon from "@icons/Stars.svg";
import { nanoid } from "nanoid";
import QuestionAdd from "@components/Dashboard/Questions/QuestionAdd";
import { Question } from "@/types/question";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Check from "@icons/Checkmark.svg";

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
          return { question: question.statement };
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
      questions: questions.map((question) => question.question),
    }),
  });

  return Promise.resolve(questions);
};

const QuestionsManager: FC<QuestionsEditorProps> = (props) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [questions, setQuestions] = useState<Question[]>([]);

  const { data: quizzData, isLoading: quizzLoading } = useQuery(
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

  const quizzMutation = useMutation(async (questions: Question[]) => {
    if (quizzData) {
      return sendQuestions(quizzData.uuid, questions, accessToken);
    }

    return Promise.resolve(questions);
  });

  const deleteQuestionAtIndex = (index: number) => {
    const updatedQuestions = [...questions].filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const generateQuestions = async () => {
    const newQuestions = questions.concat(
      Array.from({ length: 10 }, () => ({ question: "", isLoading: true }))
    );
    setQuestions(newQuestions);

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
            question,
          }))
        );
        setQuestions(updatedQuestions);
      });

    // TODO: Handle error
  };

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      {
        question: "",
        isLoading: false,
      },
    ];
    setQuestions(newQuestions);
  };

  const editQuestion = (index: number, question: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = question;
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
              question={{ question: "", isLoading: true }}
            />
          ))}
        </div>
      </Container>
    );

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
