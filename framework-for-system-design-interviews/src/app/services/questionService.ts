import { QuestionRepository } from "../../domain/interfaces/questionRepository";
import logger from "../../infrastructure/logger/logger";
import { QuestionDTO } from "../dtos/question.dto";

export class Question {
  constructor(private questionRepository: QuestionRepository) { }

  async getQuestions(): Promise<QuestionDTO[]> {
    logger.debug(`Questionervice: Trying to get questions answers`);
    const Questions = await this.questionRepository.getQuestions();
    // const QuestionFromDB: QuestionDTO[] =
    //   Question.map((Question: Question) => QuestionToQuestionDTO(Question)) || [];
    return Questions;
  }

  async getQuestionByID(id: string): Promise<QuestionDTO | null> {
    logger.debug(`Questionervice: Trying to get question answer with id: ${id}`);
    const QuestionDTO = await this.questionRepository.findById(id);
    if (!QuestionDTO) {
      logger.error(`QuestionService: Error trying to get question answer with id: ${id}`);
      return null;
    }
    return QuestionDTO;
  }

  async updateQuestionById(id: string, updatedData: Partial<Question>): Promise<QuestionDTO> {
    logger.debug(`QuestionService: Trying to updating question answer with id: ${id}`);
    return this.questionRepository.updateQuestion(id, updatedData);
  }

  async deleteQuestionById(id: string): Promise<boolean> {
    logger.debug(`QuestionService: Trying to delete question answer with id: ${id}`);
    return this.questionRepository.deleteQuestion(id);
  }
}