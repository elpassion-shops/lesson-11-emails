
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  IsEmail,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";



export class Request {
    @IsString()
    @IsEmail()
    email!: string;
  
    @ValidateNested({ each: true })
    answers!: Answer[];
  }
  
  export class Answer {
    @IsString()
    id!: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    choice!: number;
  }
  
  export class Question {
    @IsString()
    id!: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    choice!: number;
  }

export default function Questionnaire() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  //const resolver = classValidatorResolver(Request);
  const QAndA = [{
    question: "pytanie pierwsze",
    id: "pies",
    answers: [1, 2, 3, 4, 5]
  },
  {
    question: "pytanie drugie",
    id: "kot",
    answers: [1, 2, 3, 4, 5]
  }]


  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
      {QAndA.map(qa => {
        return <>
        <p>{qa.question}</p>
        {qa.answers.map(answer=> {
          return <input {...register(qa.id, {required: true})} type="radio" value={answer} />
        })}
        </>
      })}

      <input type="submit" />
    </form>
  );
}

