export interface IAnswer {
  isOpen: boolean;
  value?: string | null;
}

export interface IQuestion {
  id: number;
  question: string;
  answer: IAnswer;
}

export interface IQuestionnaire {
  id: number;
  title: string;
  email?: string | null;
  questions: IQuestion[];
}

export interface IQuestionnaireResponse {
  questionnaire: IQuestionnaire;
}

export interface IQuestionnaireRequest {
  id: number;
}
