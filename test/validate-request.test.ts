import { IsEmail, IsString, validate } from "class-validator";

class Answer {}

class Request {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString({ each: true })
  answers!: string[];
}

function generateRequest(overrides: { email?: any; answers?: any }) {
  const request = new Request();
  request.email =
    overrides.email === undefined ? "mihau@gmail.com" : overrides.email;
  request.answers = overrides.answers === undefined ? [] : overrides.answers;

  return request;
}

test("passes with correct request", async () => {
  const request = generateRequest({});
  expect(await validate(request)).toEqual([]);
});

test("fails without email", async () => {
  const request = generateRequest({ email: null });
  expect(await validate(request)).toEqual([
    expect.objectContaining({
      constraints: {
        isEmail: "email must be an email",
        isString: "email must be a string",
      },
      property: "email",
    }),
  ]);
});

test("fails with incorrect email", async () => {
  const request = generateRequest({ email: "mihaugmail.com" });
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
  const request = generateRequest({ answers: null });
  expect(await validate(request)).toEqual([
    expect.objectContaining({
      constraints: {
        isString: "each value in answers must be a string",
      },
      property: "answers",
    }),
  ]);
});
