import { create } from "zustand";
import { Answer } from "@/types/question";

type AnswerStore = {
  answers: Answer[];
  answerQuestions: (answers: Answer[]) => void;
};

export const useAnswerStore = create<AnswerStore>((set) => ({
  answers: [],
  answerQuestions(answers) {
    set(() => {
      const newAnswers = Array.from(answers);
      return { answers: newAnswers };
    });
  },
}));
