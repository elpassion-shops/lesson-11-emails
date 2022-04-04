import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as sendgrid from "@sendgrid/mail";

const key = process.env.SENDGRID_API_KEY;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    sendgrid.setApiKey(key as string)
    if(req.method === 'POST') {
        const msg = {
            to: req.body.to,
            from: 'klaudiusz.witt@gmail.com',
            subject: 'BrrBrrBru',
            test: 'BrrBrrBru',
            html: '<h1>BrrBrrBru</h1>' +
                '<p>YoyoYoYou</p>',
        }
        sendgrid.send(msg).then(() => {
            res.status(200).json({
                message: 'Email sent'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Email not sent',
                error: err,
                key: key,
            })
        })
    }
}
