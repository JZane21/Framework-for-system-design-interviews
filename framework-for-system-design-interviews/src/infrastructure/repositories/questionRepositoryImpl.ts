import { QuestionDTO } from "../../app/dtos/question.dto";
import { QuestionRepository } from "../../domain/interfaces/questionRepository";
import { Question } from "../../domain/models/question";
import { AppDataSource } from "../config/dataSource";
import { QuestionEntity } from "../entities/questionEntity";
import { loggerPrinter } from "../utils/loggerPrinter";

export class QuestionRepositoryImpl implements QuestionRepository {
  private SECTION: string = "QuestionRepositoryImpl";
  async findById(id: string, isRecruiter: boolean): Promise<QuestionDTO> {
    try {
      loggerPrinter(this.SECTION, `Getting Question with id: ${id}.`, "debug");
      const QuestionRepository = AppDataSource.getRepository(QuestionEntity);
      const Question = await QuestionRepository.findOne({
        where: { id },
        relations: ['interview', 'correctAnswer']
      });

      loggerPrinter(this.SECTION, `Gotten Question with id: ${id}.`, "info");
      if (isRecruiter) {
        const answer: QuestionDTO = {
          id: Question.id,
          statement: Question.statement,
          interview: Question.interview,
          correctAnswer: Question.correctAnswer,
        };
        return answer;
      } else {
        const answer: QuestionDTO = {
          id: Question.id,
          statement: Question.statement,
        };
        return answer;
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Question with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async getQuestions(isRecruiter: boolean): Promise<QuestionDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting Questions.", "debug");
      const QuestionRepository = AppDataSource.getRepository(QuestionEntity);
      const Questions = await QuestionRepository.find({
        relations: ['interview', 'correctAnswer']
      });
      loggerPrinter(this.SECTION, "Gotten Questions.", "info");
      if (isRecruiter) {
        return Questions;
      } else {
        return Questions;
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Question: ${error}.`, "error");
      return null;
    }
  }

  async createQuestion(question: Question): Promise<QuestionDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating Question", "debug.");
      const questionRepository = AppDataSource.getRepository(QuestionEntity);
      const newQuestion: QuestionEntity = questionRepository.create({
        id: question.id,
        statement: question.statement,
        interview: question.interview,
        correctAnswer: question.correctAnswer,
      });

      const QuestionResponse = await questionRepository.save(newQuestion);

      const QuestionDTO: QuestionDTO = {
        id: QuestionResponse.id,
        statement: QuestionResponse.statement,
        interview: QuestionResponse.interview
      };

      loggerPrinter(this.SECTION, "Created Question.", "info");
      return QuestionDTO;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating Question: ${error}.`, "error");
      return null;
    }
  }

  async updateQuestion(id: string, updatedData: Partial<Question>): Promise<QuestionDTO> {
    try {
      loggerPrinter(this.SECTION, "Updating Question.", "debug");
      const QuestionRepository = AppDataSource.getRepository(QuestionEntity);
      const Question = await QuestionRepository.findOneBy({ id });
      if (!Question) {
        loggerPrinter(this.SECTION, "Question did't find!", "error");
        throw new Error('Question not founded');
      }
      QuestionRepository.merge(Question, updatedData);
      const updatedQuestion = await QuestionRepository.save(Question);
      loggerPrinter(this.SECTION, "Updated Question.", "info");

      const questionDto: QuestionDTO = {
        id: updatedQuestion.id,
        statement: updatedQuestion.statement,
      };
      return questionDto;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating Question with id: ${id}: ${error}`, "error");
      return null;
    }
  }

  async deleteQuestion(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, "Deleting Question", "debug");
      const QuestionRepository = AppDataSource.getRepository(QuestionEntity);
      const Question = await QuestionRepository.findOneBy({ id });
      if (!Question) {
        loggerPrinter(this.SECTION, "Question did't find.", "error");
        throw new Error('Question not founded');
      }
      await QuestionRepository.remove(Question);
      loggerPrinter(this.SECTION, `Deleted Question with id: ${id}.`, "info");
      return true;
    } catch (error) {
      loggerPrinter(this.SECTION, "Error while deleting Question.", "error");
      return false;
    }
  }

}