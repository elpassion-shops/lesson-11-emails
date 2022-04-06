import {
  IQuestionnaireResponse,
  Questionnaire,
} from "../interfaces/questionnaire";
import {
  IsArray,
  IsEmail,
  IsInt,
  IsObject,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class SendQuestionnariesDto implements IQuestionnaireResponse {
  @Type(() => Questionnaire)
  @IsObject()
  @ValidateNested({ each: true })
  questionnaireResponse!: Questionnaire;
}
export class Request {
  @IsString()
  @IsEmail()
  email!: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Answer)
  answers!: Answer[];
}

export class Answer {
  @IsString()
  id!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  choice!: number;
}
