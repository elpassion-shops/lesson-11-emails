import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse } from "../../interface/IResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const emailAddress: string | string[] = req.query.email;
  const vote: string | string[] = req.query.vote;
<<<<<<< HEAD
  res.status(200).redirect("http://localhost:3000/thanks");
  console.log(`User: ${emailAddress} gave us: ${vote}`);
=======
  res.redirect("http://localhost:3000/thanks");
  console.log(`User: ${emailAdress} gave us: ${vote}`);
>>>>>>> remove status code from vote.ts
}
