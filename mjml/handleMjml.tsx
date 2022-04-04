import {
  render,
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
} from 'mjml-react';

export function renderHtml(email: string) {
  const { html, _ } = render(
    <Mjml>
      <MjmlBody>
        <MjmlSection>
            {[1, 2, 3, 4, 5].map((number)=>
          <MjmlColumn>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`http://localhost:3000/api/email?email=${email}&vote=${number}`}
            >
              {number}
            </MjmlButton>
          </MjmlColumn>
            )}
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  );

  return html;
}

// import mjml2html from 'mjml';

// /*
//   Compile an mjml string
// */
// const htmlOutput = mjml2html(
//   `
//   <mjml>
//     <mj-body>
//       <mj-section>
//         <mj-column>
//           <mj-text>
//             Hello World!
//           </mj-text>
//         </mj-column>
//       </mj-section>
//     </mj-body>
//   </mjml>
// `
// );
