import { Button } from "./Button";
import { Input } from "./Input";
import { Formik, Field, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { EmailAnswer, EmailForm } from "../interfaces/email";
import { mockSendEmailAdress } from "../test/mockSendEmailAdress";
import { sendEmailAdress } from "../services/sendEmailAdress";
import { Answer } from "./Answer";

export function Form() {
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Niepoprawny adres e-mail")
      .required("Wpisz swój e-mail!"),
  });

  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: { email: "" },
    validationSchema: SignupSchema,
    onSubmit: (values: { email: string }): void => {
      console.log("Oto email", values.email);
      setEmail(values.email)
      new sendEmailAdress()
      .send(values.email)
      .then((res: EmailAnswer) => {
          console.log("Response message", res.message);
          setResponse(res.message);
      })
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email ? <div>{errors.email}</div> : null}
      <Button />
      <Answer text={response}/>
    </form>
  );
}
