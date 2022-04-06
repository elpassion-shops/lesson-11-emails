import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  IQuestionnaireResponse,
} from "../../../interfaces/questionnaire";
import { GetQuestionnairesDto } from "../../../dto/get_questionnaries.dto";
import { validateOrReject } from "class-validator";
import { SendQuestionnariesDto } from "../../../dto/send_questionnaries.dto";
import { plainToInstance } from "class-transformer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { pid } = req.query;
    const answer1: IAnswer = {
      isOpen: false,
      value: null,
    };
    const question: IQuestion = {
      id: 1,
      question: "Rate bootcamp, please!",
      answer: answer1,
    };
    const questionnaire: IQuestionnaire = {
      id: Number(pid),
      title: "Test questionnaire",
      questions: [question],
    };
    const questionnaireResponse: IQuestionnaireResponse = {
      questionnaireResponse: questionnaire,
    };
    const getQuestionnaire = new GetQuestionnairesDto();
    getQuestionnaire.id = Number(pid);
    try {
      await validateOrReject(getQuestionnaire);
      res.status(201).json({ questionnaireResponse });
    } catch (e: any) {
      res.status(400).json({ errorArray: e[0].constraints });
    }
  }
  if (req.method === "POST") {
    try {
      const pTC = plainToInstance(SendQuestionnariesDto, req.body);
      await validateOrReject(pTC);
      res.status(200).json({});
    } catch (e: any) {
      res.status(400).json({ errorArray: e });
    }
  }
}
