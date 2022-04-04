import { IEmailMsg } from "../interfaces/email";
import { config } from "../config/configuration";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

export function createEmailMsg(to: string, html: string): IEmailMsg {
  return {
    to: to,
    from: config.emailMsgConfig.from,
    subject: config.emailMsgConfig.subject,
    html: html,
  };
}
export async function sendEmail(msg: IEmailMsg) {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: config.sendGrid.api_key as string,
    })
  );
  return await transporter.sendMail(msg);
}
