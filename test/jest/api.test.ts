import { validate } from "class-validator";
import { Answer, AnswerRequest } from "../../interfaces/questionnaire";

function generateAnswerRequest(overrides: { email?: any; answers?: any }) {
  const request = new AnswerRequest();
  request.email =
    overrides.email === undefined ? "bugajewska.m@gmail.com" : overrides.email;
  request.answers = overrides.answers === undefined ? [] : overrides.answers;
  return request;
}

function generateAnswer(overrides: { questionId?: any; value?: any }) {
  const answer = new Answer();
  answer.questionId =
    overrides.questionId === undefined ? 1 : overrides.questionId;
  answer.value = overrides.value === undefined ? [] : overrides.value;
  return answer;
}

test("passes with correct request", async () => {
  const request = generateAnswerRequest({});
  expect(await validate(request)).toEqual([]);
});

test("passes with correct answers", async () => {
  const request = generateAnswerRequest({
    answers: [generateAnswer({ value: 1, questionId: 1 })],
  });
  expect(await validate(request)).toMatchSnapshot();
});

test("fails without email", async () => {
  const request = generateAnswerRequest({ email: null });
  expect(await validate(request)).toEqual([
    expect.objectContaining({
      constraints: {
        isEmail: "email must be an email",
      },
      property: "email",
    }),
  ]);
});

test("fails with incorrect email", async () => {
  const request = generateAnswerRequest({ email: "bugajewskam.com" });
  expect(await validate(request)).toEqual([
    expect.objectContaining({
      constraints: {
        isEmail: "email must be an email",
      },
      property: "email",
    }),
  ]);
});

test("fails with empty answers", async () => {
  const request = generateAnswerRequest({ answers: null });
  expect(await validate(request)).toEqual([
    expect.objectContaining({
      children: [
        expect.objectContaining({
          constraints: {
            nestedValidation:
              "each value in nested property answers must be either object or array",
          },
          property: "answers",
        }),
      ],
    }),
  ]);
});

test("fails with incorrect answer", async () => {
  const request = generateAnswerRequest({ answers: [new Answer()] });
  expect(await validate(request)).toMatchSnapshot();
});

test("passes with incorrect answer value", async () => {
  const request = generateAnswerRequest({
    answers: [generateAnswer({ value: 0 })],
  });
  expect(await validate(request)).toMatchSnapshot();
});
