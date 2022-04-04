import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  Container,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";
import { GetEmailAddress } from "../interfaces/email";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const emailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    console.log(email);

    new GetEmailAddress().send({ to: email });

    setEmail("");
  };

  const emailError = useMemo(() => {
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    if (!email?.trim()) {
      return "Email is required";
    }
    return emailRegex.test(email) ? null : "Please provide valid email";
  }, [email]);

  // useEffect(() => {
  //   new SearchMethod().search({ search: enteredSearch }).then((response) => {
  //     console.log('response', response);
  //   });
  // }, [enteredSearch]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "16px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <CardMedia
          component="img"
          height="auto"
          image="/img/undraw_Certification_re_ifll.png"
          alt="img"
        />
        <Typography align= 'center' gutterBottom variant="h5" component="div">
          Witaj!
        </Typography>
        <Typography  align= 'center' variant="body2" color="text.secondary">
          Z racji na ukończenie przez Ciebie naszego planu stażówego, chcielibyśmy porposić Cie o wypełnienei ankiety na jego temat ;)

        </Typography>
        <form onSubmit={submit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            
              <TextField
                onChange={emailAddressChangeHandler}
                fullWidth
                label="e-mail"
                id="fullWidth"
                value={email}
                error={!!emailError}
                helperText={emailError}
              />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
            >
            <Button variant="contained" type="submit" disabled={!!emailError}>
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
