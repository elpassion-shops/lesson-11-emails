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
