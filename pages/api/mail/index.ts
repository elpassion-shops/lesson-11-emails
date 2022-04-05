import type { NextApiRequest, NextApiResponse } from "next";
import { sendMessageToUser } from "../../../helpers/sendEmail";
import { IUserMailRequest, IUserMailResponse } from "../../../types/Mail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserMailResponse>
) {
  const body: IUserMailRequest = req.body;
  try {
    // TODO: validate mail on server side - add class Validator
    await sendMessageToUser(body.mail);
    res.status(200).json({ responseMessage: `mail has been sent to ${body.mail}` });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(404).json({ errorMessage: `Sorry something went wrong` });
  }
}
