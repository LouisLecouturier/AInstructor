import { Answer } from "@/types/question";

export const getAnswerFromQuestion = (
  answersList: Answer[],
  questionUuid: string
): Answer | undefined => {
  for (let answer of answersList) {
    if (answer.question_uuid === questionUuid) {
      return answer;
    }
  }
  return undefined;
};
