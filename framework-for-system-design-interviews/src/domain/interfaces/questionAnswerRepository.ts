import { QuestionAnswerDTO } from "../../app/dtos/questionAnswer.dto";
import { QuestionAnswer } from "../models/questionAnswer";
export interface QuestionAnswerRepository {
  findById(id: string): Promise<QuestionAnswerDTO | null>;
  getQuestionAnswers(): Promise<QuestionAnswerDTO[]>;
  createQuestionAnswer(question: QuestionAnswer): Promise<QuestionAnswerDTO>;
  updateQuestionAnswer(id: string, updatedData: Partial<QuestionAnswer>): Promise<QuestionAnswerDTO>;
  deleteQuestionAnswer(id: string): Promise<boolean>;
}