import { IRequest } from "../interface/IRequest";
import { IResponse } from "../interface/IResponse";

export class SendForm {
    email: string;
    constructor(email:string) {
        this.email = email;
    }
    async send(request: IRequest): Promise<IResponse> {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email }),
      });
      return await response.json();
    }
}
