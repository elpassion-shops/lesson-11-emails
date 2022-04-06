import { IsEmail } from "class-validator";

export class ValidateEmail {
  @IsEmail()
  email!: string;
}
