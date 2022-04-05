import React from "react";

import {
  Mjml,
  MjmlFont,
  MjmlHead,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
  MjmlText,
  MjmlSocial,
  MjmlSocialElement,
} from "mjml-react";

export const generate = (userMail: string) => {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlPreview>Intern Survey</MjmlPreview>
        <MjmlFont
          name="Raleway"
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;500;700&display=swap"
        />
      </MjmlHead>
      <MjmlBody>
        <MjmlSection background-color="#1976d2">
          <MjmlColumn>
            <MjmlText
              align="center"
              color="white"
              font-size="24px"
              font-family="Raleway, sans-serif"
              font-weight="700"
            >
              El Trio Intern Project
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="30px 0 20px">
          <MjmlColumn>
            <MjmlText
              font-family="Raleway, sans-serif"
              font-size="14px"
              align="center"
              line-height="1.5"
            >
              Let us know what you think about our internship program.
            </MjmlText>
            <MjmlText
              font-family="Raleway, sans-serif"
              font-size="14px"
              align="center"
              line-height="1.5"
            >
              Will we deserve 5 stars?
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0">
          <MjmlColumn>
            <MjmlSocial>
              <MjmlSocialElement
                src="https://i.postimg.cc/PrfvjNYw/star.png"
                icon-size="30px"
                href={`http://localhost:3000/rating?mail=${userMail}&rating=1`}
                target="_blank"
              />
              <MjmlSocialElement
                src="https://i.postimg.cc/PrfvjNYw/star.png"
                icon-size="30px"
                href={`http://localhost:3000/rating?mail=${userMail}&rating=2`}
                target="_blank"
              />
              <MjmlSocialElement
                src="https://i.postimg.cc/PrfvjNYw/star.png"
                icon-size="30px"
                href={`http://localhost:3000/rating?mail=${userMail}&rating=3`}
                target="_blank"
              />
              <MjmlSocialElement
                src="https://i.postimg.cc/PrfvjNYw/star.png"
                icon-size="30px"
                href={`http://localhost:3000/rating?mail=${userMail}&rating=4`}
                target="_blank"
              />
              <MjmlSocialElement
                src="https://i.postimg.cc/PrfvjNYw/star.png"
                icon-size="30px"
                href={`http://localhost:3000/rating?mail=${userMail}&rating=5`}
                target="_blank"
              />
            </MjmlSocial>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0">
          <MjmlColumn padding="0">
            <MjmlImage src="https://i.postimg.cc/jqX3tsM7/review.png" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="10px 0 10px 0" background-color="#eef6ff">
          <MjmlColumn>
            <MjmlText
              align="center"
              color="#6e6e6e"
              font-size="10px"
              line-height="1.4"
            >
              More info at <a href="#">Our homepage</a>
              <br />
              Coded with ☕ by{" "}
              <a
                href="https://github.com/ireshka"
                target="_blank"
                rel="noreferrer"
              >
                Gosia
              </a>{" "}
              <a
                href="https://github.com/KlaudiaDabrowska"
                target="_blank"
                rel="noreferrer"
              >
                Klaudia
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/mwakulinski"
                target="_blank"
                rel="noreferrer"
              >
                Michał
              </a>{" "}
              <br />{" "}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
      <Mjml></Mjml>
    </Mjml>
  );
};
