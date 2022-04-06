import {
  IsEmail,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export interface IAnswer {
  isOpen: boolean;
  value?: number | string | null;
}

export interface IQuestion {
  id: number;
  question: string;
  answer: IAnswer;
}

export interface IQuestionnaire {
  id: number;
  title: string;
  questions: IQuestion[];
  email?: string | null;
}

export interface IQuestionnaireResponse {
  questionnaire: IQuestionnaire;
}

export interface IQuestionnaireRequest {
  id: number;
}

class AnswerClose implements IAnswer {
  isOpen = false;

  @IsInt()
  @Min(1)
  @Max(5)
  value?: number;

  constructor(value: number) {
    this.value = value;
  }
}

class AnswerOpen implements IAnswer {
  isOpen = true;

  @IsString()
  value?: string;

  constructor(value: string) {
    this.value = value;
  }
}
