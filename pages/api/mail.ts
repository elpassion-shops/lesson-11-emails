import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse } from "../../interface/IResponse";
import { generateHTML } from "../../helpers/generateHTML";
import { sendMessageToUser } from "../../helpers/sendMessageToUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const emailAddress: string = req.body.email;
  try {
    await sendMessageToUser(emailAddress, generateHTML(emailAddress));
    res.status(201).json({
      statusCode: 201,
      msg: `Email sent successfully to ${emailAddress}`,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: `Error: ${error}`,
    });
  }
}
