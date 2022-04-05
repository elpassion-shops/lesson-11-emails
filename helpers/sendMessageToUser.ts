import { Transporter } from "nodemailer";

require("dotenv").config();
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");
export async function sendMessageToUser(email: string, generatedHTML: string) {
  const options = {
    apiKey: process.env.API_KEY,
  };
  let transporter: Transporter = nodemailer.createTransport(
    sgTransport(options)
  );
  return await transporter.sendMail({
    from: "aleksander@korzystnaenergia.pl",
    to: email,
    subject: "Rate our bootcamp ✔",
    text: "Rate our bootcamp",
    html: generatedHTML,
  });
}
