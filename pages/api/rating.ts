// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IsEmail, IsNumberString, validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailAnswer } from "../../interfaces/email";
import { IRating } from "../../interfaces/Rating";
import { validationQueryRationToNumber } from "./validationQueryRationToNumber";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailAnswer>
) {
  class Rating implements IRating {
    @IsEmail()
    email!: string;

    @IsNumberString()
    rating!: string;
  }

  let ratingValidation = new Rating();
  ratingValidation.email = req.body.email;
  ratingValidation.rating = req.body.rating;

  function objToString(obj: any) {
    return Object.entries(obj).reduce((str, [p, val]) => {
      return `${val}`;
    }, "");
  }

  validate(ratingValidation).then((errors) => {
    if (
      errors.length > 0 ||
      !validationQueryRationToNumber(ratingValidation.rating)
    ) {
      res.status(400).json({
        statusCode: 400,
        message: objToString(errors[0].constraints),
      });
    } else {
      res
        .status(200)
        .json({ statusCode: 200, message: "Thank you for your feedback!" });
    }
  });
}
