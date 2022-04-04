import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  Container,
  Box,
} from '@mui/material';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState } from 'react';
import { GetEmailAddress } from '../interfaces/email';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState(false);
  const emailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);

    new GetEmailAddress().send({ to: email, html: 'dwa' });

    setEmail('');
  };

  const emailError = useMemo(()=>{
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    if(!email?.trim()){
      return "Email is required";
    }
    return emailRegex.test(email) ? null : 'Please provide valid email'
  }, [email])

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
                error ={!!emailError}
                helperText={emailError}
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
