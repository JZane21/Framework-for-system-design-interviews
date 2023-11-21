import { IInterviewEntity } from "./IInterviewEntity";
import { IQuestionAnswerEntity } from "./IQuestionAnswerEntity";

export interface IQuestionEntity {
  id?: string;
  statement: string;
  interview: IInterviewEntity;
  correctAnswer: IQuestionAnswerEntity;
}