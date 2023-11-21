import { IInterviewEntity } from "../entities/IInterviewEntity";
import { IQuestionAnswerEntity } from "../entities/IQuestionAnswerEntity";
import { IQuestionEntity } from "../entities/IQuestionEntity";
import { v4 as uuidv4 } from 'uuid';

export class Question {
  id: string;
  statement: string;
  interview: IInterviewEntity;
  correctAnswer: IQuestionAnswerEntity;

  constructor(question: IQuestionEntity) {
    this.id = question.id || uuidv4();
    this.statement = question.statement;
    this.interview = question.interview;
    this.correctAnswer = question.correctAnswer;
  }
}