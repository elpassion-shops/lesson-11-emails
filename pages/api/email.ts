// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IsEmail, validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailAnswer, EmailForm } from "../../interfaces/email";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailAnswer>
) {
  class Email {
    @IsEmail()
    email!: string;
  }

  const body: EmailForm = req.body;
  let emailValidation = new Email();
  emailValidation.email = body.email;

  validate(emailValidation).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      console.log("validation failed. errors: ", errors);
      res.status(200).json({ statusCode: 400, message: "Email is incorrect" });
    } else {
      console.log("validation succeed");
      res.status(200).json({ statusCode: 200, message: body.email });
    }
  });
}
