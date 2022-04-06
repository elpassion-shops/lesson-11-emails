import { NextApiRequest, NextApiResponse } from "next";
import * as QueryString from "querystring";
import {
  AnswerClose,
  IAnswer,
  IQuestion,
  IQuestionnaire,
  IQuestionnaireResponse,
  Question,
  Questionnaire,
} from "../../../interfaces/questionnaire";
import { GetQuestionnairesDto } from "../../../dto/get_questionnaries.dto";
import { validateOrReject } from "class-validator";

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
      questionnaire: questionnaire,
    };
    const getQuestionnaire = new GetQuestionnairesDto();
    getQuestionnaire.id = Number(pid);
    validateOrReject(getQuestionnaire).catch((e) => {
      console.log("Promise rejected (validation failed). Errors: ", e);
    });
    try {
      await validateOrReject(getQuestionnaire);
      res.status(201).json({ questionnaireResponse });
    } catch (e: any) {
      res.status(400).json({ errorArray: e[0].constraints });
    }
  }
  if (req.method === "POST") {
    const answer = new AnswerClose(3);
    const question1 = new Question(1, "Rate bootcamp, please!", answer);
    const questionnaire1 = new Questionnaire(1, "Test questionnaire", []);
    try {
      await validateOrReject(questionnaire1);
      res.status(20).json({ questionnaire1 });
    } catch (e: any) {
      res.status(500).json({ errorArray: e[0].constraints });
    }
  }
}
