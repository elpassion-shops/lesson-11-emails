import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  Container,
  Box,
} from '@mui/material';

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

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { GetEmailAddress } from '../interfaces/email';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');

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

  const emailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    new GetEmailAddress().send({ to: email, html: html });

    setEmail('');
  };

  // useEffect(() => {
  //   new SearchMethod().search({ search: enteredSearch }).then((response) => {
  //     console.log('response', response);
  //   });
  // }, [enteredSearch]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '16px' }}>
      <Card sx={{ minWidth: 275 }}>
        <form onSubmit={submit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <CardContent>
              <TextField
                onChange={emailAddressChangeHandler}
                fullWidth
                label="e-mail"
                id="fullWidth"
                value={email}
              />
            </CardContent>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Button variant="contained" type="submit" disableElevation>
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Home;
