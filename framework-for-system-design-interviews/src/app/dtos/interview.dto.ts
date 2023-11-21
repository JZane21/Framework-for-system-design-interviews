import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";

export interface InterviewDTO {
  id: string;
  title: string;
  description: string;
  questions: IQuestionEntity[];
}