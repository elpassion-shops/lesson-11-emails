import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

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
  questionnaireResponse: IQuestionnaire;
}

export interface IQuestionnaireRequest {
  id: number;
}

export class AnswerClose implements IAnswer {
  isOpen = false;

  @IsInt()
  @Min(1)
  @Max(5)
  value?: number;

  constructor(value: number) {
    this.value = value;
  }
}

export class AnswerOpen implements IAnswer {
  isOpen = true;

  @IsString()
  value?: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class Question implements IQuestion {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  question: string;

  @ValidateNested()
  @Type(() => AnswerClose)
  answer: IAnswer;

  constructor(id: number, question: string, answer: IAnswer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }
}

export class Questionnaire implements IQuestionnaire {
  @IsInt()
  @Min(1)
  id;

  @IsString()
  title;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Question)
  questions: Question[];

  // @IsOptional()
  // @IsEmail()
  // email?;

  constructor(
    id: number,
    title: string,
    questions: IQuestion[],
    email?: string | null
  ) {
    this.id = id;
    this.title = title;
    this.questions = questions;
    // this.email = email;
  }
}
