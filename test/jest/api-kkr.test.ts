import {
  IsBoolean,
  IsInt,
  IsString,
  Max,
  Min,
  validate,
} from 'class-validator';
import { IAnswer } from '../../interfaces/questionnaire';

describe('tests for AnswerOpen', () => {
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
    answerOpen.isOpen =
      overrides.isOpen === undefined ? true : overrides.isOpen;
    return answerOpen;
  }

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
