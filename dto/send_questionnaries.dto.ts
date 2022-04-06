import {
  IQuestionnaire,
  IQuestionnaireResponse,
} from "../interfaces/questionnaire";
import { ValidateNested } from "class-validator";

export class SendQuestionnariesDto implements IQuestionnaireResponse {
  @ValidateNested({ each: true })
  questionnaire!: IQuestionnaire;
}
