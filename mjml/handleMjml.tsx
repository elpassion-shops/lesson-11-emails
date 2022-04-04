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
  MjmlClass,
  MjmlText,
  MjmlAtributes,
  MjmlAll,
} from 'mjml-react';

export function renderHtml(email: string) {
  const { html, errors } = render(
    <Mjml>
      <MjmlHead>
        <MjmlAtributes>
          <MjmlText padding="0" />
          <MjmlClass name="orange" color="orange" />
          <MjmlClass name="big" font-size="24px" />
          <MjmlClass name="center" align="center" />
          <MjmlAll font-family="Arial" />
        </MjmlAtributes>
      </MjmlHead>
      <MjmlBody>
        <MjmlSection>
          <MjmlText mj-class="big center">
            Uprzejmie prosimy o ocenienie warsztatu, w którym właśnie wziąłeś
            udział.
          </MjmlText>

          <MjmlSection>
            <MjmlColumn>
              <MjmlButton
                font-family="Helvetica"
                background-color="#f45e43"
                color="white"
                href={`http://localhost:3000/api/email?email=${email}&vote=1`}
              >
                1
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                font-family="Helvetica"
                background-color="#f45e43"
                color="white"
                href={`http://localhost:3000/api/email?email=${email}&vote=2`}
              >
                2
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                font-family="Helvetica"
                background-color="#f45e43"
                color="white"
                href={`http://localhost:3000/api/email?email=${email}&vote=3`}
              >
                3
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                font-family="Helvetica"
                background-color="#f45e43"
                color="white"
                href={`http://localhost:3000/api/email?email=${email}&vote=4`}
              >
                4
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                font-family="Helvetica"
                background-color="#f45e43"
                color="white"
                href={`http://localhost:3000/api/email?email=${email}&vote=5`}
              >
                5
              </MjmlButton>
            </MjmlColumn>
          </MjmlSection>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  );

  return html;
}
