export interface IEmailAddress {
  to: string;
  html: string;
}

export interface IGetEmailAddress {
  send(to?: IEmailAddress): Promise<any>;
}
export class GetEmailAddress implements IGetEmailAddress {
  async send(request: IEmailAddress): Promise<any> {
    console.log('SearchMethod - request', request);
    // try {
    const response = await fetch(
      'http://localhost:3000/api/email?' +
        new URLSearchParams({
          send: request.to || '',
        })
    );
    const data = await response.json();
    console.log('SearchMethod data', data);

    return data;
  }
}
