import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Image from "next/image";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
// import { MockSendMail } from "../test/mockSendMail";
import {
  IUserMailResponse,
  IUserMailSuccessfullResponse,
} from "../types/Mail";
import { SendMail } from "../api/sendMail";

const isSuccessfullResponse = (
  data: IUserMailResponse
): data is IUserMailSuccessfullResponse => {
  return (data as IUserMailSuccessfullResponse).responseMessage !== undefined;
};

const Home: NextPage = () => {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //TODO: refactor possibility? - await / async syntax
      new SendMail()
        .send({ mail: values.email })
        .then((res: IUserMailResponse) => {
          isSuccessfullResponse(res)
            ? setResponseMessage(res.responseMessage)
            : setErrorMessage(res.errorMessage);
        });
      formik.resetForm();
    },
  });
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          padding: "16px",
          width: "100%",
          maxWidth: "350px",
          display: "block",
          margin: "0 auto",

          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "auto",
        }}
      >
        <Image
          src="/mailbox.png"
          alt=""
          width={816}
          height={654}
          layout="responsive"
        />
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h4" component="h1">
            Get your survey
          </Typography>
          <Typography variant="subtitle1">
            Give us your mail and you can give us stars
          </Typography>
        </Box>
        <FormControl
          component="form"
          autoComplete="off"
          sx={{ width: "100%" }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            fullWidth
            placeholder="Your email"
            size="small"
            sx={{ marginBottom: "1rem" }}
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button variant="outlined" type="submit">
            Get you survey
          </Button>
        </FormControl>
        {responseMessage && (
          <Alert severity="success" sx={{ marginTop: "10px" }}>
            {responseMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ marginTop: "10px" }}>
            {errorMessage}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
