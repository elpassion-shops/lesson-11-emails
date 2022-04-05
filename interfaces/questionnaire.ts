export interface IAnswer {
  isOpen: boolean;
  value: string | number;
}

export interface IQuestion {
  id: number;
  question: string;
  answer?: IAnswer | null;
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
  id: string;
}

abstract class Answer implements IAnswer {
  abstract isOpen: boolean;
  constructor(public value: string | number) {}
}

export class AnswerOpen extends Answer {
  isOpen = true;
  value: string;

  constructor(value: string) {
    super(value);
    this.value = value;
  }
}

export class AnswerClose extends Answer {
  isOpen = false;
  value = 0;

  constructor(value: number) {
    super(value);
    this.value = value;
  }
}
