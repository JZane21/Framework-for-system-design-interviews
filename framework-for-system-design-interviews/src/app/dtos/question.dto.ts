import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";

export interface QuestionDTO {
  id: string;
  statement: string;
  interview?: IInterviewEntity;
  correctAnswer?: IQuestionAnswerEntity;
}