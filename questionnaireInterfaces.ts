export type AnswerRange = 1 | 2 | 3 | 4 | 5;

interface IQuestion {
  questionText: string;
  id: number;
  choice: number;
}

type ExtractedQuestion = Extract<IQuestion, "id" | "choice">;

export interface IQuestionnaire {
  questions: IQuestion[];
  id: string;
}

export interface IRequest {
  email: string;
  questions: Extract<IQuestion, "id" | "choice">[];
}

export interface IResponse {
  message: string;
}

export interface IApi {
  submitQuestionnaire(request: IRequest): Promise<IResponse>;
  getQuestionnaire(id: string): Promise<IQuestionnaire>;
}
