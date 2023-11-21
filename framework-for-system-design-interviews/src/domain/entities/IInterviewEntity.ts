import { IQuestionEntity } from "./IQuestionEntity";

export interface IInterviewEntity {
  id?: string;
  title: string;
  description: string;
  questions: IQuestionEntity[];
}