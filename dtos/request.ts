import {
  IsEmail,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class Request {
  @IsString()
  @IsEmail()
  email!: string;

  @ValidateNested({ each: true })
  @Type(() => Answer)
  answers!: Answer[];
}

export class Answer {
  @IsString()
  id!: string;

  @Max(5)
  @Min(1)
  @IsInt()
  choice!: number;
}
