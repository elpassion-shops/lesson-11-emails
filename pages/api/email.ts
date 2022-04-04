import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import {IEmailMsg} from "../../interfaces/email";
import {config} from '../../config/configuration';


const sendEmail = async (msg: IEmailMsg) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: config.sendGrid.api_key as string,
    }),
  );
  return await transporter.sendMail(msg);
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'GET') {
        const data = {
            email: req.query.email,
            vote: req.query.vote,
        }
    }
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
