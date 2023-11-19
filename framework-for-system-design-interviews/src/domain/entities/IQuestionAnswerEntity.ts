import { IQuestionEntity } from "./IQuestionEntity";

export interface IQuestionAnswerEntity {
  id?: string;
  answer: string;
  rightAnswer: string;
  question: IQuestionEntity;
}