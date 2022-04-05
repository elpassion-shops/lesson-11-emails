import { IUserMailRequest, IUserMailResponse, IUserMailSend } from '../types/Mail';

export class MockSendMail implements IUserMailSend{
  async send(request: IUserMailRequest): Promise<IUserMailResponse> {
    return {
      responseMessage: 'Fine! Wait for an email from us.'
    }
  }

}