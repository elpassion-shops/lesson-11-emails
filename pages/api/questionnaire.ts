import "reflect-metadata";
import { validate, validateOrReject } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "../../dtos/request";
import { plainToClass } from "class-transformer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    const request = plainToClass(Request, data);
    await validateOrReject(request);
    console.log(request);
    res.status(201).json({});
  } catch (error) {
    res.status(400).json(error);
  }
}
