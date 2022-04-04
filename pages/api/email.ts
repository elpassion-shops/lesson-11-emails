import type { NextApiRequest, NextApiResponse } from "next";
import { IEmailVote } from "../../interfaces/email";
import { renderHtml } from "../../mjml/handleMjml";
import { createVoteClient } from "../../utils/databaseUtils";
import { createEmailMsg, sendEmail } from "../../utils/emailUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data: IEmailVote = {
      email: req.query.email as string,
      vote: Number(req.query.vote),
    };
    const voteClient = await createVoteClient(data);
    const vote = await voteClient.getVote(data.email);
    await voteClient.end();
    res.status(200).json({
      message: "Vote saved",
      vote: vote.rows,
    });
  }
  if (req.method === "POST") {
    const html = renderHtml(req.body.to);
    try {
      await sendEmail(createEmailMsg(req.body.to, html));
      res.status(200).json({
        message: "Email sent",
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  }
}
