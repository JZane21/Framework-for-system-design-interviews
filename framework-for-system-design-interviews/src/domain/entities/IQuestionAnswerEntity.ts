import { IQuestionEntity } from "./IQuestionEntity";

export interface IQuestionAnswerEntity {
  id?: string;
  answers: string[];
  rightAnswer: string;
}