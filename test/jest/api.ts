import 'class-validator';
import { IApi } from '../../interfaces/email';
import { IQuestionnaireResponse } from '../../interfaces/questionnaire';

class Api implements IApi {
  getQuestionnaire(id: string): Promise<IQuestionnaireResponse> {}
}
