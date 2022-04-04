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
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";
import { GetEmailAddress } from "../interfaces/email";
import styles from "../styles/Home.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ffa3"}
  },
});

const Home: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const emailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    console.log(email);
    setLoading(true);
    new GetEmailAddress().send({ to: email as string }).finally(() => {
      setLoading(false);
      setEmailSent(true);
    });
  };

  const emailError = useMemo(() => {
    if (email === null) {
      return null;
    }
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {!emailSent && (
              <>
                <CardMedia
                  component="img"
                  image="/img/undraw_Certification_re_ifll.png"
                  alt="img"
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: "auto",
                    margin: "auto",
                  }}
                />
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Witaj!
                </Typography>
                <Typography
                  align="center"
                  variant="body2"
                  color="text.secondary"
                >
                  W związku z ukończeniem przez Ciebie naszego BootCampa chcielibyśmy zaprosić Cię do wypełnienia krótkiej ankiety  
                  ;)
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
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={!!emailError || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress size={24} />
                        </>
                      ) : (
                        <>Wyślij ankietę<span style={{fontSize: "1.4rem",
                        marginTop: -10}}>📨</span></>
                      )}
                    </Button>
                  </Box>
                </form>
              </>
            )}
            {emailSent && <>
              <CardMedia
                  component="img"
                  image="/img/undraw_Letter_re_8m03.png"
                  alt="img"
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: "auto",
                    margin: "auto",
                  }}
                />
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                 Poszło!
                </Typography>
                <Typography
                  align="center"
                  variant="body2"
                  color="text.secondary"
                >
                  Ankieta przyjdzie na podany adres e-mail ;)
                </Typography>
              
            </>}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
