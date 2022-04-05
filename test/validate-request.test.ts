import {IsEmail, IsString, validate} from "class-validator";

class Request {
  @IsString()
  @IsEmail()
  email!: string;
}

function generateRequest(overrides: { email?: any }) {
  const request = new Request();
  request.email = overrides.email === undefined ? 'mihau@gmail.com' : overrides.email
  return request
}

test('passes with correct request', async () => {
  const request = generateRequest({});
  expect(await validate(request)).toEqual([])
})

test('fails without email', async () => {
  const request = generateRequest({ email: null });
  expect(await validate(request)).toMatchSnapshot()
})
