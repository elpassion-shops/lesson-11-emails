import { IRequest } from "./IRequest";
import { IResponse } from "./IResponse";

export interface ISendForm {
  email: string;
  send(request: IRequest): Promise<IResponse>;
}
