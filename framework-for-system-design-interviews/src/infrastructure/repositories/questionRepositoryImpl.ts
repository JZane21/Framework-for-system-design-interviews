import { QuestionDTO } from "../../app/dtos/question.dto";
import { QuestionRepository } from "../../domain/interfaces/questionRepository";
import { Question } from "../../domain/models/question";

export class QuestionRepositoryImpl implements QuestionRepository {
  findById(id: string): Promise<QuestionDTO> {
    throw new Error("Method not implemented.");
  }
  getQuestions(): Promise<QuestionDTO[]> {
    throw new Error("Method not implemented.");
  }
  createQuestion(question: Question): Promise<QuestionDTO> {
    throw new Error("Method not implemented.");
  }
  updateQuestion(id: string, updatedData: Partial<Question>): Promise<QuestionDTO> {
    throw new Error("Method not implemented.");
  }
  deleteQuestion(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}