import { IRequest } from "../interface/IRequest";
import { IResponse } from "../interface/IResponse";
import { ISendForm } from "../interface/ISendForm";

export class MockForm implements ISendForm {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
  async send(request: IRequest): Promise<IResponse> {
    return { statusCode: 500, msg: "Email not received - try again!" };
  }
}
