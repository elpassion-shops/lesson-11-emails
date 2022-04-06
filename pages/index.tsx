import type { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Request } from "../dtos/request";
import { useState } from "react";
import { react } from "@babel/types";

const Home: NextPage = () => {
  const { register, handleSubmit, formState, control, getValues } =
    useForm<Request>({
      resolver: classValidatorResolver(Request),
    });

  console.log(formState.errors);
  console.log(getValues());

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
            <Controller
              control={control}
              name={`answers.${index}.choice`}
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <>
                  <input {...field} type="radio" value="1" />
                  <input {...field} type="radio" value="2" />
                  <input {...field} type="radio" value="3" />
                  <input {...field} type="radio" value="4" />
                  <input {...field} type="radio" value="5" />
                </>
              )}
            />
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
