import {validate} from "class-validator";

class Request {

}

test('passes with correct request', async ()=>{
  const request = new Request();
  expect(await validate(request)).toEqual([])
})