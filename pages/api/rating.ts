// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IsEmail, IsNumberString, validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailAnswer, EmailForm, Rating } from "../../interfaces/email";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailAnswer>
) {
  class Rating {
    @IsEmail()
    email!: string | string[];

    @IsNumberString()
    rating!: string | string[];
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

  const body = req.query;
  let ratingValidation = new Rating();
  ratingValidation.rating = body.rating;
  ratingValidation.email = body.email;

  function objToString(obj: any) {
    return Object.entries(obj).reduce((str, [p, val]) => {
      return `${val}`;
    }, "");
  }

  validate(ratingValidation).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      console.log("validation failed. errors: ", errors);
      console.log(errors[0].constraints);
      res.status(400).json({
        statusCode: 400,
        message: objToString(errors[0].constraints),
      });
    } else {
      console.log("validation succeed");
      res
        .status(200)
        .json({ statusCode: 200, message: "Thank you for your feedback!" });
    }
  });
}
