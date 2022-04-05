import type { NextApiRequest, NextApiResponse } from "next";
import { renderHtml } from "../../helpers/renderHtml";
import { createVoteClient } from "../../utils/databaseUtils";
import {
  createEmailMsg,
  createVoteData,
  sendEmail,
} from "../../utils/emailUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const voteData = await createVoteData(req.query.email, req.query.vote);
    const voteClient = await createVoteClient(voteData);
    const vote = await voteClient.getVote(voteData.email);
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
