import { NextApiRequest, NextApiResponse } from "next";
import * as QueryString from "querystring";
import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  IQuestionnaireResponse,
} from "../../../interfaces/questionnaire";
import { GetQuestionnairesDto } from "../../../dto/get_questionnaries.dto";
import { validate, validateOrReject } from "class-validator";

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
      question: "What is your name?",
      answer: answer1,
    };
    const questionnaire: IQuestionnaire = {
      id: Number(pid),
      title: "Test",
      questions: [question],
    };
    const questionnaireResponse: IQuestionnaireResponse = {
      questionnaire: questionnaire,
    };
    const getQuestionnaire = new GetQuestionnairesDto();
    getQuestionnaire.id = Number(pid);
    validateOrReject(getQuestionnaire).catch((e) => {
      console.log("Promise rejected (validation failed). Errors: ", e);
    });
    try {
      await validateOrReject(getQuestionnaire);
      res.status(201).json({});
    } catch (e: any) {
      res.status(400).json({ errorArray: e[0].constraints });
    }
  }
  if (req.method === "POST") {
  }
}
