import { IQuestionAnswerEntity } from "../entities/IQuestionAnswerEntity";
import { IQuestionEntity } from "../entities/IQuestionEntity";
import { v4 as uuidv4 } from 'uuid';

export class QuestionAnswer {
  id: string;
  answer: string;
  rightAnswer: string;
  question: IQuestionEntity;

  constructor(questionAnswer: IQuestionAnswerEntity) {
    this.id = questionAnswer.id || uuidv4();
    this.answer = questionAnswer.answer;
    this.rightAnswer = questionAnswer.rightAnswer;
    this.question = questionAnswer.question;
  }
}