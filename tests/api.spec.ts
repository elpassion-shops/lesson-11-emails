import "class-validator";
import { IApi } from "../interfaces/email";

class Api implements IApi {
  getQuestionnaire(id: string): Promise<IQuestionnaireResponse> {}
}
