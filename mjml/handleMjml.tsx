import {
  render,
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
} from 'mjml-react';

export function renderHtml(email: string) {
  const { html, errors } = render(
    <Mjml>
      <MjmlBody>
        <MjmlSection>
          <MjmlColumn>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`localhost:3000/api/email?email=${email}&vote=1`}
            >
              1
            </MjmlButton>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`localhost:3000/api/email?email=${email}&vote=2`}
            >
              2
            </MjmlButton>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`localhost:3000/api/email?email=${email}&vote=3`}
            >
              3
            </MjmlButton>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`localhost:3000/api/email?email=${email}&vote=4`}
            >
              4
            </MjmlButton>
            <MjmlButton
              font-family="Helvetica"
              background-color="#f45e43"
              color="white"
              href={`localhost:3000/api/email?email=${email}&vote=5`}
            >
              5
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  );

  return html;
}
