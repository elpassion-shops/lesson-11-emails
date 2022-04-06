import {
  IsEmail,
  IsInt,
  IsString,
  Max,
  Min,
  validate,
  ValidateNested,
} from "class-validator";

class Answer {
  @IsString()
  id!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  choice!: number;
}

class Request {
  @IsString()
  @IsEmail()
  email!: string;

  @ValidateNested({ each: true })
  answers!: Answer[];
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
  const request = generateRequest({ answers: [new Answer()] });
  expect(await validate(request)).toMatchSnapshot();
});
