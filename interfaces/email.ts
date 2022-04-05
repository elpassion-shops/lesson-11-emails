export interface IEmailAddress {
  to: string;
}

export interface IGetEmailAddress {
  send(to?: IEmailAddress): void;
}

export interface IEmailMsg {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export interface IEmailVote {
  email: string;
  vote: number;
}

export interface Question {
  id: number; // 0 - n
  name?: string; // aA-zZ
  ratings?: number[]; // 0 - 5|| 0 - n
  choice: number | null; // ratings.includes(choice)
}

export interface IQuestionnaire {
  id: number; // 0 - n,
  title: string; // aA-zZ
  email?: string | null; // email address
  question: Question[]; // every question has choice selected => if(question[n].choice) != null => true.
}
export interface IQuestionnaireResponse {
  questionnaire: IQuestionnaire;
}

export interface IQuestionnaireRequest {
  id: string;
}

export interface IApi {
  getQuestionnaire(id: string): Promise<IQuestionnaireResponse>;
  submitQuestionnaire(questionnaire: IQuestionnaire): Promise<IQuestionnaire>;
}

export class GetEmailAddress implements IGetEmailAddress {
  async send(request: IEmailAddress) {
    console.log(request.to);
    await fetch("http://localhost:3000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  }
}
