import { QuestionDTO } from "../../app/dtos/question.dto";
import { Question } from "../models/question";
export interface QuestionRepository {
  findById(id: string): Promise<QuestionDTO | null>;
  getQuestions(): Promise<QuestionDTO[]>;
  createQuestion(question: Question): Promise<QuestionDTO>;
  updateQuestion(id: string, updatedData: Partial<Question>): Promise<QuestionDTO>;
  deleteQuestion(id: string): Promise<boolean>;
}