import { validate, IsEmail } from "class-validator";
import { IQuestionnaire } from "../questionnaireInterfaces";

class Request {
  @IsEmail()
  email: string;
  questions: IQuestionnaire;
  constructor(email: string, questions: IQuestionnaire) {
    this.email = email;
    this.questions = questions;
  }
}

test.skip("email is valid", async () => {
  const request = new Request("aleksander@korzystnaenergia.pl", {
    id: "axyz",
    questions: [{ questionText: "tak?", id: 23, choice: 3 }],
  });
  expect(await validate(request));
});
