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
