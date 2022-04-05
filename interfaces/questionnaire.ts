export interface IQuestion {
  id: number; // 0 - n
  name?: string; // aA-zZ
  ratings?: number[]; // 0 - 5|| 0 - n
  choice: number | null; // ratings.includes(choice)
}

export interface IQuestionnaire {
  id: number; // 0 - n,
  title: string; // aA-zZ
  email?: string | null; // email address
  question: IQuestion[]; // every question has choice selected => if(question[n].choice) != null => true.
}
export interface IQuestionnaireResponse {
  questionnaire: IQuestionnaire;
}

export interface IQuestionnaireRequest {
  id: string;
}
