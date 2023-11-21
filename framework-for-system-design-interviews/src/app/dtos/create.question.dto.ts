import { CreateQuestionAnswerDTO } from "./create.questionAnswer.dto";

export interface CreateQuestionDTO {
  idUser: string;
  idInterview: string;
  statement: string;
  correctAnswer: CreateQuestionAnswerDTO;
}