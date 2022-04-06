import { useRouter } from "next/router";
import React from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
  }
  interface IFormInput {
    firstName: String;
    gender: GenderEnum;
  }
  

//const resolver = classValidatorResolver
function Questionnaire() {

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <form >
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Gender Selection</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}

  export default Questionnaire;
  