import axios, { AxiosError } from "axios";
import {
  IUserMailErrorResponse,
  IUserMailSuccessfullResponse,
  IUserMailRequest,
  IUserMailResponse,
  IUserMailSend,
  IUserRatingRequest,
  IUserRatingResponse
} from "../types/Mail";
import { Endpoints } from "../types/Endpoints.enum";

const getErrorObject = (errorMessage: string): IUserMailErrorResponse => ({
  errorMessage,
});

const isErrorResponse = (
  data: unknown
): data is IUserMailErrorResponse => {
  return (data as IUserMailErrorResponse).errorMessage !== undefined;
};

export class SendMail implements IUserMailSend {
  async send(request: IUserMailRequest): Promise<IUserMailResponse> {
    try {
      const resp = await axios.post(Endpoints.SEND, request);
      const data = resp.data as IUserMailSuccessfullResponse;
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseMessage = (isErrorResponse(err.response?.data) ? err.response?.data.errorMessage : 'Worse error even') as string;
        return getErrorObject(responseMessage);
      } else {
        return getErrorObject("Sth goes wrong");
      }
    }
  }
  async rating(request: IUserRatingRequest): Promise<IUserRatingResponse> {
    try {
      const resp = await axios.get(`${Endpoints.RATING}?mail=${request.mail}&rating=${request.rating}`);
      const data = resp.data as IUserMailSuccessfullResponse;
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseMessage = (isErrorResponse(err.response?.data) ? err.response?.data.errorMessage : 'Worse error even during sending rating to our service') as string;
        return getErrorObject(responseMessage);
      } else {

        return getErrorObject('We are looking for your error during sending rating to our service');
      }
    }
  }
}
