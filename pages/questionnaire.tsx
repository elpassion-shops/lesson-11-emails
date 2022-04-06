import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { IApi } from "../interfaces/api";
import {
  IQuestionnaire,
  IQuestionnaireResponse,
  IAnswersRequest,
  AnswerRequest,
} from "../interfaces/questionnaire";

const exampleResponse: IQuestionnaireResponse = {
  questionnaire: {
    id: 1,
    title: "Zapraszamy do udzielenia kilku dodatkowych odpowiedzi!",
    email: null,
    questions: [
      {
        id: 1,
        isOpen: false,
        question: "Piewsze pytanie zamknięte?",
      },
      {
        id: 2,
        question: "Drugie pytanie zamknięte?",
        isOpen: false,
      },
      {
        id: 3,
        question: "Trzecie pytanie, może otwarte?",
        isOpen: true,
      },
    ],
  },
};

class DummyApi implements IApi {
  getQuestionnaire(id: string): Promise<IQuestionnaireResponse> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(exampleResponse), 1000)
    );
  }
  submitQuestionnaire(answers: IAnswersRequest[]): Promise<IQuestionnaire> {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log(`Sent ${JSON.stringify(answers)}`);
        resolve(exampleResponse.questionnaire);
      }, 1000)
    );
  }
}

const api = new DummyApi();

const Home: NextPage = () => {
  // mode: onChange powoduje walidacje formularza po kazdej zmianie
  const { control, handleSubmit, formState, register } =
    useForm<AnswerRequest>({
      mode: "onChange",
      resolver: classValidatorResolver(AnswerRequest),
    });
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  console.log(formState.errors);
  // Pobieranie danych o pytaniach
  useEffect(() => {
    setLoading(true);
    api
      .getQuestionnaire("1")
      .then(({ questionnaire }) => {
        setQuestionnaire(questionnaire);
      })
      .finally(() => setLoading(false));
  }, []);

  // Wysyłanie danych
  const onSubmitHandler = useCallback((data) => {
    setLoading(true);
    api
      .submitQuestionnaire(data)
      .then(() => {
        setSent(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <Grid container justifyContent={"center"} alignContent={"center"}>
          {!sent && (
            <>
              {loading && <CircularProgress />}
              {!loading && questionnaire && (
                <>
                  <Typography align="center" variant="h5">
                    {questionnaire.title}
                  </Typography>
                  <form
                    onSubmit={handleSubmit((data) => onSubmitHandler(data))}
                  > 
                    <FormControl 
                        fullWidth
                        sx={{ marginBottom: 2 }}>
                        <Typography>Podaj swój adres email</Typography>
                        <Controller
                          name={`email`}
                          control={control}
                          defaultValue={''}
                          //pozwala na wsadzanie MUI
                          render={(props) =>
                              <TextField
                                sx={{ margin: "auto" }}
                                name={`email`}
                                onChange={props.field.onChange}
                                value={props.field.value || ""}
                                fullWidth
                              />
                          }/>
                    </FormControl>
                    {questionnaire.questions.map((question, index) => (
                      <FormControl
                        key={question.id}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      >
                        <Typography>{question.question}</Typography>
                        <Controller
                          name={`answers.${index}.value`}
                          control={control}
                          defaultValue={0}
                          render={(props) =>
                            question.isOpen ? (
                              <TextField
                                sx={{ margin: "auto" }}
                                name={`answers.${index}.value`}
                                onChange={props.field.onChange}
                                value={props.field.value || ""}
                                fullWidth
                                multiline
                              />
                            ) : (
                              <Rating
                                sx={{ margin: "auto" }}
                                name={props.field.name}
                                onChange={props.field.onChange}
                                value={Number(props.field.value) || 0}
                              />
                            )
                          }
                        />

                        <input
                          hidden
                          {...register(`answers.${index}.questionId`, {
                            value: question.id,
                          })}
                        />
                      </FormControl>
                    ))}
                    <Button
                      variant={"contained"}
                      fullWidth
                      disabled={!formState.isValid}
                      type={"submit"}
                    >
                      Prześlij
                    </Button>
                  </form>
                </>
              )}
            </>
          )}
          {sent && (
            <Grid item>
              <img src="/img/undraw_Celebrating_rtuv.png" style={{maxHeight: 300, margin: 'auto', display: "block"}}/>
              <Typography align="center" variant="h5" sx={{marginBottom: 3}}>
                Dziękujemy za udzielone odpowiedzi!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
