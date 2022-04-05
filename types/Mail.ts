export interface IUserMailRequest {
  mail: string;
}

export interface IUserMailSuccessfullResponse {
  responseMessage: string;
}

export interface IUserMailErrorResponse {
  errorMessage: string;
}

export type IUserMailResponse = IUserMailSuccessfullResponse | IUserMailErrorResponse;

export interface IUserMailSend {
  send(request: IUserMailRequest): Promise<IUserMailResponse>;
}

export interface IUserRatingRequest {
  mail: string;
  rating: string;
}

export type IUserRatingResponse = IUserMailResponse;