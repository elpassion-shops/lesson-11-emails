import type { NextApiRequest, NextApiResponse } from "next";
import { IUserMailResponse } from "../../types/Mail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserMailResponse>
) {
  try {
    //TODO: add query validation later
    const user = req.query.mail;
    const rating = req.query.rating;
    console.log(`email: ${user} rated us ${rating}`);
    res
      .status(200)
      .json({ responseMessage: `email: ${user} rated us ${rating}` });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(404).json({
      errorMessage: `Sorry something went wrong during getting rated`,
    });
  }
}
