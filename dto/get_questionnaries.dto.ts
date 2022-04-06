import { IsInt, Min } from "class-validator";
import { IQuestionnaireRequest } from "../interfaces/questionnaire";

export class GetQuestionnairesDto implements IQuestionnaireRequest {
  @IsInt()
  @Min(1)
  id!: number;
}
