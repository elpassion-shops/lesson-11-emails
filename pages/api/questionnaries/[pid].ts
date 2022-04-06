import { NextApiRequest, NextApiResponse } from "next";
import * as QueryString from "querystring";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { pid } = req.query;
    res.end(`Post: ${pid}`);
  }
  if (req.method === "POST") {
  }
}
