import {
  IsBoolean,
  IsInt,
  IsString,
  Max,
  Min,
  validate,
  ValidateNested,
} from 'class-validator';
import { IAnswer, IQuestion } from '../../interfaces/questionnaire';

class AnswerOpen implements IAnswer {
  @IsBoolean()
  isOpen!: boolean;

  @IsString()
  value!: string;
}

function generateAnswerOpen(overrides: { isOpen?: any; value?: any }) {
  const answerOpen = new AnswerOpen();
  answerOpen.value =
    overrides.value === undefined ? 'very good' : overrides.value;
  answerOpen.isOpen = overrides.isOpen === undefined ? true : overrides.isOpen;
  return answerOpen;
}

class AnswerClose implements IAnswer {
  @IsBoolean()
  isOpen!: boolean;

  @Min(1)
  @Max(5)
  @IsInt()
  value!: number;
}

function generateAnswerClose(overrides: { isOpen?: any; value?: any }) {
  const answerClose = new AnswerClose();
  answerClose.value = overrides.value === undefined ? 5 : overrides.value;
  answerClose.isOpen = overrides.isOpen === undefined ? true : overrides.isOpen;
  return answerClose;
}

let answerCloseinvalid = generateAnswerClose({ value: null });

describe('tests for AnswerOpen', () => {
  const answerOpenValid = generateAnswerOpen({});

  describe('tests for AnswerOpen.value', () => {
    test('should pass with string in value', async () => {
      expect(await validate(answerOpenValid)).toEqual([]);
    });

    test('should fails with empty value', async () => {
      const answerOpenInvalid = generateAnswerOpen({ value: null });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });

    test('should fails with number in value', async () => {
      const answerOpenInvalid = generateAnswerOpen({ value: 9 });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });

    test('should fails with boolean in value', async () => {
      const answerOpenInvalid = generateAnswerOpen({ value: true });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });
  });

  describe('tests for AnswerOpen.isOpen', () => {
    test('should pass with boolean in isOpen', async () => {
      expect(await validate(answerOpenValid)).toEqual([]);
    });

    test('should fails with empty isOpen', async () => {
      const answerOpenInvalid = generateAnswerOpen({ isOpen: null });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });

    test('should fails with string in isOpen', async () => {
      const answerOpenInvalid = generateAnswerOpen({ isOpen: 'abc' });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });

    test('should fails with number in isOpen', async () => {
      const answerOpenInvalid = generateAnswerOpen({ isOpen: 9 });
      expect(await validate(answerOpenInvalid)).toMatchSnapshot();
    });
  });
});

describe('tests for AnswerClose', () => {
  const answerCloseValid = generateAnswerClose({});

  describe('tests for AnswerClose.value', () => {
    test('should pass with correct number in value', async () => {
      expect(await validate(answerCloseValid)).toEqual([]);
    });
    test('should fails with to low value', async () => {
      const answerCloseInvalid = generateAnswerClose({ value: 0 });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with to hight value', async () => {
      const answerCloseInvalid = generateAnswerClose({ value: 6 });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with empty value', async () => {
      const answerCloseInvalid = generateAnswerClose({ value: null });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with number in value', async () => {
      const answerCloseInvalid = generateAnswerClose({ value: 9 });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with boolean in value', async () => {
      const answerCloseInvalid = generateAnswerClose({ value: true });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });
  });

  describe('tests for AnswerClose.isOpen', () => {
    test('should pass with boolean in isOpen', async () => {
      expect(await validate(answerCloseValid)).toEqual([]);
    });

    test('should fails with empty isOpen', async () => {
      const answerCloseInvalid = generateAnswerClose({ isOpen: null });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with string in isOpen', async () => {
      const answerCloseInvalid = generateAnswerClose({ isOpen: 'abc' });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });

    test('should fails with number in isOpen', async () => {
      const answerCloseInvalid = generateAnswerClose({ isOpen: 9 });
      expect(await validate(answerCloseInvalid)).toMatchSnapshot();
    });
  });
});

describe('tests for Question', () => {
  class Question implements IQuestion {
    @IsInt()
    @Min(1)
    id!: number;

    @IsString()
    question!: string;

    @ValidateNested()
    answer?: IAnswer | null;
  }

  function generateQuestion(overrides: {
    id?: any;
    question?: any;
    answer?: IAnswer | any;
  }) {
    const answerOpenValid = generateAnswerOpen({});

    const question = new Question();
    question.id = overrides.id === undefined ? 1 : overrides.id;
    question.question =
      overrides.question === undefined ? 'How about ?' : overrides.question;
    question.answer =
      overrides.answer === undefined ? answerOpenValid : overrides.answer;
    return question;
  }

  const questionValid = generateQuestion({});

  describe('tests for Question.id', () => {
    test('should pass with correct number in id', async () => {
      expect(await validate(questionValid)).toEqual([]);
    });

    test('should fails with to low value', async () => {
      const questionInvalid = generateQuestion({ id: 0 });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with empty value', async () => {
      const questionInvalid = generateQuestion({ id: null });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with boolean in id', async () => {
      const questionInvalid = generateQuestion({ id: true });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });
    test('should fails with text in id', async () => {
      const questionInvalid = generateQuestion({ id: 'text w id' });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });
  });

  describe('tests for Question.question', () => {
    test('should pass with string in question', async () => {
      expect(await validate(questionValid)).toEqual([]);
    });

    test('should fails with empty question', async () => {
      const questionInvalid = generateQuestion({ question: null });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with number in question', async () => {
      const questionInvalid = generateQuestion({ question: 9 });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with boolean in question', async () => {
      const questionInvalid = generateQuestion({ question: true });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });
  });

  describe('tests for Question.answer', () => {
    test('should pass with correct answer', async () => {
      expect(await validate(questionValid)).toEqual([]);
    });

    test('should fails with empty answer', async () => {
      const questionInvalid = generateQuestion({ answer: null });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with string in answer', async () => {
      const questionInvalid = generateQuestion({ answer: 'uno duo quarto' });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with number in answer', async () => {
      const questionInvalid = generateQuestion({ answer: 9 });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });

    test('should fails with boolean in answer', async () => {
      const questionInvalid = generateQuestion({ answer: true });
      expect(await validate(questionInvalid)).toMatchSnapshot();
    });
  });
});
