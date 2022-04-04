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
  MjmlStyle,
  MjmlText,
  MjmlClass,
  MjmlAttributes,
  MjmlAll,
  MjmlHero,
  MjmlGroup
} from 'mjml-react';


export function renderHtml(email: string) {
  const { html, _ } = render(
    <Mjml>
      <MjmlHead>
        <MjmlAttributes>
          <MjmlText padding="0" />
          <MjmlClass name="elpassion" color="#00ffa3" />
          <MjmlClass
            name="button"
            width="60px"
            color="black"
            background-color="#00ffa3"
            font-family="Helvetica"
            font-weight="900"
          />
          <MjmlClass name="main" color="black" />
          <MjmlClass name="big" font-size="24px" />
          <MjmlClass name="center" align="center" />
          <MjmlAll font-family="Helvetica" />
        </MjmlAttributes>
      </MjmlHead>

      <MjmlBody background-color="black">
        <MjmlHero
          height="479px"
          background-width="800px"
          background-height="469px"
          background-url="https://www.elpassion.com/hubfs/0%20homepage%20assets/elp-home-banner@2x-2-2.webp"
          background-color="#2a3448"
          padding="40px 0px 10px"
        >
          <MjmlText
            padding="20px"
            color="#ffffff"
            font-family="Helvetica"
            align="center"
            font-size="43px"
            line-height="45px"
            font-weight="900"
          >
            RATE WORKSHOP
          </MjmlText>

          <MjmlText
            padding="20px"
            color="#ffffff"
            font-family="Helvetica"
            align="center"
            font-size="20px"
            line-height="45px"
            font-weight="900"
            letter-spacing="3px"
          >
            TELL US THE WHOLE TRUTH
          </MjmlText>

          <MjmlText
            padding="10px"
            color="#ffffff"
            font-family="Helvetica"
            align="center"
            font-size="12px"
            line-height="45px"
            font-weight="900"
            letter-spacing="3px"
          >
            THIS IS YOUR ONLY CHANCE
          </MjmlText>

          <MjmlText
            padding="10px"
            color="#ffffff"
            font-family="Helvetica"
            align="center"
            font-size="8px"
            line-height="45px"
            font-weight="900"
            letter-spacing="3px"
          >
            THIS IS REQUIRED
          </MjmlText>

          <MjmlText
            padding="8px"
            color="#ffffff"
            font-family="Helvetica"
            align="center"
            font-size="6px"
            line-height="45px"
            font-weight="900"
            letter-spacing="3px"
          >
            DO IT NOW!
          </MjmlText>
        </MjmlHero>

        <MjmlSection>
          <MjmlGroup MjmlClass="center">
            <MjmlColumn>
              <MjmlButton
                width="60px" color="black" background-color="#00ffa3" font-family="Helvetica" font-weight="900"
                href={`http://localhost:3000/api/email?email=${email}&vote=1`}
              >
                1
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                width="60px" color="black" background-color="#00ffa3" font-family="Helvetica" font-weight="900"
                href={`http://localhost:3000/api/email?email=${email}&vote=2`}
              >
                2
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                width="60px" color="black" background-color="#00ffa3" font-family="Helvetica" font-weight="900"
                href={`http://localhost:3000/api/email?email=${email}&vote=3`}
              >
                3
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                width="60px" color="black" background-color="#00ffa3" font-family="Helvetica" font-weight="900"
                href={`http://localhost:3000/api/email?email=${email}&vote=4`}
              >
                4
              </MjmlButton>
            </MjmlColumn>

            <MjmlColumn>
              <MjmlButton
                width="60px" color="black" background-color="#00ffa3" font-family="Helvetica" font-weight="900"
                href={`http://localhost:3000/api/email?email=${email}&vote=5`}
              >
                5
              </MjmlButton>
            </MjmlColumn>
          </MjmlGroup>
        </MjmlSection>

        <MjmlSection>
          <MjmlColumn>
            <MjmlText
              padding-top="50px"
              align="center"
              color="white"
              font-size="12px"
            >
              EL Passion Next Sp. z o.o.
              <br />
              Grzybowska 62, 00-844 Warsaw, Poland
              <br />{' '}
              <a
                href="https://www.elpassion.com/"
                style={{color: "#00ffa3", textDecoration:"none"}}
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



