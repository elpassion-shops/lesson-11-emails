export interface IEmail {
  to: string;
}

// export interface ISendEmail {
//   send(to?: ISendEmail): Promise<any>;
// }
// export class SendEmail implements ISearchMethod {
//   async search(request: ISendEmail): Promise<Results> {
//     console.log('SearchMethod - request', request);
//     // try {
//     const response = await fetch(
//       'http://localhost:3000/api/main?' +
//         new URLSearchParams({
//           send: request.to || '',
//         })
//     );
//     const data = await response.json();
//     console.log('SearchMethod data', data);

//     // return await response.json();
//     return data;
//     // } catch (err) {
//     //   console.error(err);
//     // }
//   }
// }
