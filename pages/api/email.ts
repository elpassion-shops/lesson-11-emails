import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import * as sendgrid from "@sendgrid/mail";
import {send} from "@sendgrid/mail";
import {IEmailMsg} from "../../interfaces/email";

const key = process.env.SENDGRID_API_KEY as string;

const sendEmail = async (msg: IEmailMsg) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: key,
    }),
  );
  return await transporter.sendMail(msg);
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const transporter = nodemailer.createTransport(nodemailerSendgrid({
        apiKey: key
    }));
    if(req.method === 'POST') {
        const msg: IEmailMsg = {
            to: req.body.to,
            from: 'klaudiusz.witt@gmail.com',
            subject: 'BrrBrrBru',
            html: req.body.html === null ? 'Null' : req.body.html,
        }
        try {
            await sendEmail(msg);
            res.status(200).json({
                message: 'Email sent'
            })
        } catch (e) {
            res.status(500).json({
                error: e
            })
        }
    }
}
