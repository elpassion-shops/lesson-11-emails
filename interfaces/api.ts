import { IQuestionnaireResponse, IQuestionnaire } from "./questionnaire";

export interface IApi {
  getQuestionnaire(id: string): Promise<IQuestionnaireResponse>;
  submitQuestionnaire(questionnaire: IQuestionnaire): Promise<IQuestionnaire>;
}
