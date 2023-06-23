export type Question = {
  uuid?: string;
  statement: string;
  isLoading?: boolean;
};

export type QuestionCorrection = {
  uuid: string;
  question: string;
  AICorrection: string;
  isCorrect: boolean;
  givenAnswer: string;
};

export type Answer = {
  question_uuid: string;
  answer: string;
};
