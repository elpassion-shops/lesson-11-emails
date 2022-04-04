import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { IEmailMsg, IEmailVote } from '../../interfaces/email';
import { config } from '../../config/configuration';
import { Client } from 'pg';
import {renderHtml} from "../../mjml/handleMjml";

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
    await client.connect();
    // Create table if not exists
    await client.query(`CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            vote INT NOT NULL
        )`);
    // Check if email didnt vote before if no insert new vote
    const result = await client.query(`SELECT * FROM votes WHERE email = $1`, [
      data.email,
    ]);
    if (result.rows.length === 0) {
      await client.query(`INSERT INTO votes (email, vote) VALUES ($1, $2)`, [
        data.email,
        data.vote,
      ]);
    } else {
      await client.query(`UPDATE votes SET vote = $1 WHERE email = $2`, [
        data.vote,
        data.email,
      ]);
      res.status(400).json('You already voted, and your vote changed');
      return;
    }
    // Get all votes
    const votes = await client.query(`SELECT * FROM votes`);
    await client.end();
    console.log(`Email: ${data.email} vote: ${data.vote}`);
    res.status(200).json(votes);
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
