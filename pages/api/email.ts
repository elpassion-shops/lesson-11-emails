import { IsEmail, validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailAnswer, EmailForm } from "../../interfaces/email";
import nodemailer from "nodemailer";
import { htmlOutput } from "../../email";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailAnswer>
) {
  class Email {
    @IsEmail()
    email!: string;
  }

  const transport = nodemailer.createTransport(
    // nodemailerSendgrid({
    //   apiKey: String(process.env.SENDGRID_API_KEY),
    // })
    {
      host: "localhost",
      port: 1025,
      secure: false,
      auth: {
        user: "username",
        pass: "password",
      },
    }
  );

  const body: EmailForm = req.body;

  let emailValidation = new Email();
  emailValidation.email = body.email;

  const emailToSend = {
    from: "13zolw13@gmail.com",
    to: emailValidation.email,
    subject: "Newsletter",
    html: htmlOutput.html,
  };

  validate(emailValidation).then((errors) => {
    if (errors.length > 0) {
      res.status(400).json({ statusCode: 400, message: "Email is incorrect" });
    } else {
      transport
        .sendMail(emailToSend)
        .then((response) => {
          res.status(200).json({
            statusCode: 200,
            message: response.response,
          });
          // .then(([response]) => {
          //   res.status(200).json({
          //     statusCode: response.statusCode,
          //     message: response.statusMessage,
          //   });
        })
        .catch((err) => {
          if (err.response && err.response.body && err.response.body.errors) {
            res
              .status(500)
              .json({ statusCode: 500, message: JSON.stringify(err) });
          } else {
            console.log(err);
          }
        });
    }
  });
}
