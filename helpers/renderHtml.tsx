import {
  render,
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
  MjmlText,
  MjmlWrapper,
} from 'mjml-react';
import { image } from '../public/img/images';

export function renderHtml(email: string) {
  const { html } = render(
    <Mjml>
      <MjmlBody background-color="#eee" width={600}>
        <MjmlSection
          full-width="full-width"
          background-color="#00ffa3"
          padding-bottom="0"
        >
          <MjmlColumn width="100%">
            <MjmlImage
              src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v2hl0uhrznxcbhdpk6if"
              alt=""
              align="center"
              width="150px"
            />
          </MjmlColumn>
          <MjmlColumn background-color="#fff" width="600px">
            <MjmlText
              color="#212b35"
              font-weight="bold"
              font-size="20px"
              padding-top="30px"
              padding-bottom="16px"
              align="center"
            >
              Daj nam znać jak oceniasz Bootcamp!
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlWrapper
          padding-top="0"
          padding-bottom="0"
          css-class="body-section"
        >
          <MjmlSection background-color="#ffffff">
            <MjmlColumn width="100%">
              <MjmlImage src={image} alt="" align="center" width="250px" />
              <MjmlText color="#637381" font-size="16px" align="center">
                Naciśnij na jeden z przycisków aby ocenić!
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection background-color="#ffffff">
            {[1, 2, 3, 4, 5].map((number) => (
              <MjmlColumn>
                <MjmlButton
                  font-family="Helvetica"
                  background-color="#00ffa3"
                  color="black"
                  font-weight="900"
                  href={`http://localhost:3000/api/email?email=${email}&vote=${number}`}
                >
                  {number}
                </MjmlButton>
              </MjmlColumn>
            ))}
          </MjmlSection>
        </MjmlWrapper>

        <MjmlSection>
          <MjmlColumn>
            <MjmlText
              padding-top="40px"
              align="center"
              color="#637381"
              font-size="12px"
            >
              EL Passion Next Sp. z o.o.
              <br />
              Grzybowska 62, 00-844 Warsaw, Poland
              <br />{' '}
              <a
                href="https://www.elpassion.com/"
                style={{
                  color: '#05c680',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Made by Monika, Klaudiusz and Krystian
              </a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  );

  return html;
}
