import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import * as sendgrid from "@sendgrid/mail";

const key = process.env.SENDGRID_API_KEY as string;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const transporter = nodemailer.createTransport(nodemailerSendgrid({
        apiKey: key
    }));
    if(req.method === 'POST') {
        console.log(key)
        const msg = {
            to: req.body.to,
            from: 'klaudiusz.witt@gmail.com',
            subject: 'BrrBrrBru',
            test: 'BrrBrrBru',
            html: '<h1>BrrBrrBru</h1>' +
                '<p>YoyoYoYou</p>',
        }
        transporter.sendMail(msg, (err, info) => {
            if(err) {
                res.status(500).json({
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: 'Email sent'
                })
            }
        })
    }
}
