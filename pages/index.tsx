import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Request } from "../dtos/request";

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<Request>({
    resolver: classValidatorResolver(Request),
  });

  console.log(formState.errors);

  let questions = [
    {
      text: "pytanie 0",
      id: "1234",
    },
  ];
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      Email
      <input {...register("email")} />
      {formState.errors.email ? formState.errors.email.message : "nie ma bledu"}
      <br />
      {questions.map((question, index) => {
        return (
          <li key={question.id}>
            {question.text}
            <input
              hidden
              {...register(`answers.${index}.id`, { value: question.id })}
            />
            <input
              {...register(`answers.${index}.choice`, {
                setValueAs: (v) => parseInt(v),
              })}
              type={"number"}
            />
            {formState.errors.answers && formState.errors.answers[index]
              ? formState.errors.answers[index].choice?.message
              : "nie ma bledu"}
            <br />
          </li>
        );
      })}
      <input type="submit" />
    </form>
  );
};

export default Home;
