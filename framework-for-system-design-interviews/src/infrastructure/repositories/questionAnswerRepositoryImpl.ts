import { QuestionAnswerDTO } from "../../app/dtos/questionAnswer.dto";
import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import { QuestionAnswer } from "../../domain/models/questionAnswer";
import { AppDataSource } from "../config/dataSource";
import { QuestionAnswerEntity } from "../entities/questionAnswerEntity";
import { loggerPrinter } from "../utils/loggerPrinter";

export class QuestionAnswerRepositoryImpl implements QuestionAnswerRepository {
  private SECTION: string = "QuestionAnswerRepositoryImpl";
  async findById(id: string, isRecruiter: boolean): Promise<QuestionAnswerDTO> {
    try {
      loggerPrinter(this.SECTION, `Getting QuestionAnswer with id: ${id}.`, "debug");
      const QuestionAnswerRepository = AppDataSource.getRepository(QuestionAnswerEntity);
      const QuestionAnswer = await QuestionAnswerRepository.findOne({
        where: { id },
        relations: ['question']
      });

      loggerPrinter(this.SECTION, `Gotten QuestionAnswer with id: ${id}.`, "info");
      if (isRecruiter) {
        const answer: QuestionAnswerDTO = {
          id: QuestionAnswer.id,
          answers: QuestionAnswer.answers,
          rightAnswer: QuestionAnswer.rightAnswer
        };
        return answer;
      } else {
        const answer: QuestionAnswerDTO = {
          id: QuestionAnswer.id,
          answers: QuestionAnswer.answers
        };
        return answer;
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswer with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async getQuestionAnswers(isRecruiter: boolean): Promise<QuestionAnswerDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting QuestionAnswers.", "debug");
      const QuestionAnswerRepository = AppDataSource.getRepository(QuestionAnswerEntity);
      const QuestionAnswers = await QuestionAnswerRepository.find({
        relations: ['question']
      });
      loggerPrinter(this.SECTION, "Gotten QuestionAnswers.", "info");
      if (isRecruiter) {
        return QuestionAnswers;
      } else {
        return QuestionAnswers;
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswer: ${error}.`, "error");
      return null;
    }
  }

  async createQuestionAnswer(questionAnswer: QuestionAnswer): Promise<QuestionAnswerDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating QuestionAnswer", "debug.");
      const QuestionAnswerRepository = AppDataSource.getRepository(QuestionAnswerEntity);
      const newQuestionAnswer: QuestionAnswerEntity = QuestionAnswerRepository.create({
        id: questionAnswer.id,
        answers: questionAnswer.answers,
        rightAnswer: questionAnswer.rightAnswer,
        question: questionAnswer.question,
      });

      const QuestionAnswerResponse = await QuestionAnswerRepository.save(newQuestionAnswer);

      const questionAnswerDTO: QuestionAnswerDTO = {
        id: QuestionAnswerResponse.id,
        answers: QuestionAnswerResponse.answers,
        rightAnswer: QuestionAnswerResponse.rightAnswer,
      };

      loggerPrinter(this.SECTION, "Created QuestionAnswer.", "info");
      return questionAnswerDTO;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating QuestionAnswer: ${error}.`, "error");
      return null;
    }
  }

  async updateQuestionAnswer(id: string, updatedData: Partial<QuestionAnswer>): Promise<QuestionAnswerDTO> {
    try {
      loggerPrinter(this.SECTION, "Updating QuestionAnswer.", "debug");
      const QuestionAnswerRepository = AppDataSource.getRepository(QuestionAnswerEntity);
      const QuestionAnswer = await QuestionAnswerRepository.findOneBy({ id });
      if (!QuestionAnswer) {
        loggerPrinter(this.SECTION, "QuestionAnswer did't find!", "error");
        throw new Error('QuestionAnswer not founded');
      }
      QuestionAnswerRepository.merge(QuestionAnswer, updatedData);
      const updatedQuestionAnswer = await QuestionAnswerRepository.save(QuestionAnswer);
      loggerPrinter(this.SECTION, "Updated QuestionAnswer.", "info");

      const QuestionAnswerDto: QuestionAnswerDTO = {
        id: updatedQuestionAnswer.id,
        answers: updatedQuestionAnswer.answers
      };
      return QuestionAnswerDto;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating QuestionAnswer with id: ${id}: ${error}`, "error");
      return null;
    }
  }

  async deleteQuestionAnswer(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, "Deleting QuestionAnswer", "debug");
      const QuestionAnswerRepository = AppDataSource.getRepository(QuestionAnswerEntity);
      const QuestionAnswer = await QuestionAnswerRepository.findOneBy({ id });
      if (!QuestionAnswer) {
        loggerPrinter(this.SECTION, "QuestionAnswer did't find.", "error");
        throw new Error('QuestionAnswer not founded');
      }
      await QuestionAnswerRepository.remove(QuestionAnswer);
      loggerPrinter(this.SECTION, `Deleted QuestionAnswer with id: ${id}.`, "info");
      return true;
    } catch (error) {
      loggerPrinter(this.SECTION, "Error while deleting QuestionAnswer.", "error");
      return false;
    }
  }

}