import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { IEmailMsg, IEmailVote } from '../../interfaces/email';
import { config } from '../../config/configuration';
import { Client } from 'pg';
import {renderHtml} from "../../mjml/handleMjml";
import {VoteDbClient} from "../../services/postgresClient";

const sendEmail = async (msg: IEmailMsg) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: config.sendGrid.api_key as string,
    })
  );
  return await transporter.sendMail(msg);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data: IEmailVote = {
      email: req.query.email as string,
      vote: Number(req.query.vote),
    };
    const client = new Client({
      user: config.database.username,
      host: config.database.host,
      database: config.database.database,
      password: config.database.password,
      port: config.database.port,
    });
    const voteClient = new VoteDbClient(client);
    await voteClient.connect()
    await voteClient.createTable();
    await voteClient.insertVote(data.email, data.vote);
    const vote = await voteClient.getVote(data.email);
    await voteClient.end()
    console.log(vote)
    res.status(200).json({
      message: 'Vote saved',
      vote: vote.rows,
    });
  }
  if (req.method === 'POST') {
    const html = renderHtml(req.body.to);
    const msg: IEmailMsg = {
      to: req.body.to,
      from: 'klaudiusz.witt@gmail.com',
      subject: 'BrrBrrBru',
      html: html,
    };
    try {
      await sendEmail(msg);
      res.status(200).json({
        message: 'Email sent',
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  }
}
