import { IsInt, Min } from "class-validator";
import { IQuestionnaireRequest } from "../interfaces/questionnaire";

export class getQuestionnairesDto implements IQuestionnaireRequest {
  @IsInt()
  @Min(1)
  id!: number;
}
