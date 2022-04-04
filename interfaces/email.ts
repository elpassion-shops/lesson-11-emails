export interface IEmailAddress {
  to: string;
  html: string;
}

export interface IGetEmailAddress {
  send(to?: IEmailAddress): Promise<any>;
}

export class GetEmailAddress implements IGetEmailAddress {
  async send(request: IEmailAddress) {
    fetch('http://localhost:3000/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        to: request.to || '',
      }),
    });
  }
}

// export class GetEmailAddress implements IGetEmailAddress {
//   async send(request: IEmailAddress): Promise<any> {
//     var formBody: any = [];
//     var encodedKey = encodeURIComponent(request);
//     var encodedValue = encodeURIComponent(request.to);
//     formBody.push(encodedKey + '=' + encodedValue);

//     formBody = formBody.join('&');

//     console.log('SearchMethod - request', request);

//     const response = await fetch('http://localhost:3000/api/email?', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//       },
//       body: formBody,
//     });
//     const data = await response.json();
//     console.log('SearchMethod data', data);

//     return data;
//   }
// }

// var details = {
//   userName: 'test@gmail.com',
//   password: 'Password!',
//   grant_type: 'password',
// };

// var formBody = [];
// for (var property in details) {
//   var encodedKey = encodeURIComponent(property);
//   var encodedValue = encodeURIComponent(details[property]);
//   formBody.push(encodedKey + '=' + encodedValue);
// }
// formBody = formBody.join('&');

// fetch('https://example.com/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//   },
//   body: formBody,
// });
