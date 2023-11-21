import { InterviewDTO } from "../../app/dtos/interview.dto";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { Interview } from "../../domain/models/interview";
import { AppDataSource } from "../config/dataSource";
import { InterviewEntity } from "../entities/interviewEntity";
import { loggerPrinter } from "../utils/loggerPrinter";

export class InterviewRepositoryImpl implements InterviewRepository {
  private SECTION: string = "InterviewRepositoryImpl";
  async findById(id: string, isRecruiter: boolean): Promise<InterviewDTO> {
    try {
      loggerPrinter(this.SECTION, `Getting interview with id: ${id}.`, "debug");
      const interviewRepository = AppDataSource.getRepository(InterviewEntity);
      const interview = await interviewRepository.findOne({
        where: { id },
        relations: ['questions']
      });

      loggerPrinter(this.SECTION, `Gotten interview with id: ${id}.`, "info");
      if (isRecruiter) {
        return {
          id: interview.id,
          title: interview.title,
          description: interview.description,
          questions: interview.questions,
        };
      } else {
        return {
          id: interview.id,
          title: interview.title,
          description: interview.description,
          questions: [],
        };
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting interview with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async getInterviews(isRecruiter: boolean): Promise<InterviewDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting interviews.", "debug");
      const interviewRepository = AppDataSource.getRepository(InterviewEntity);
      const interviews = await interviewRepository.find({
        relations: ["questions"]
      });
      loggerPrinter(this.SECTION, "Gotten interviews.", "info");
      if (isRecruiter) {
        console.log("RECRUITER: TRUE");
        console.log(interviews);
        return interviews;
      } else {
        console.log("RECRUITER: FALSE");
        console.log(interviews);
        return interviews;
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting interview: ${error}.`, "error");
      return null;
    }
  }

  async createInterview(interview: Interview): Promise<InterviewDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating interview", "debug.");
      const interviewRepository = AppDataSource.getRepository(InterviewEntity);
      const newInterview: InterviewEntity = interviewRepository.create({
        id: interview.id,
        title: interview.title,
        description: interview.description,
        questions: interview.questions
      });

      const interviewResponse = await interviewRepository.save(newInterview);

      const interviewDTO: InterviewDTO = {
        id: interviewResponse.id,
        title: interviewResponse.title,
        description: interviewResponse.description,
        questions: interviewResponse.questions,
      };
      loggerPrinter(this.SECTION, "Created interview.", "info");
      return interviewDTO;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating interview: ${error}.`, "error");
      return null;
    }
  }

  async updateInterview(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO> {
    try {
      loggerPrinter(this.SECTION, "Updating interview.", "debug");
      const interviewRepository = AppDataSource.getRepository(InterviewEntity);
      const interview = await interviewRepository.findOneBy({ id });
      if (!interview) {
        loggerPrinter(this.SECTION, "Interview did't find!", "error");
        throw new Error('Interview not founded');
      }
      interviewRepository.merge(interview, updatedData);
      const updatedInterview = await interviewRepository.save(interview);
      loggerPrinter(this.SECTION, "Updated interview.", "info");
      return {
        id: updatedInterview.id,
        title: updatedInterview.title,
        description: updatedInterview.description,
        questions: updatedInterview.questions,
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating interview with id: ${id}: ${error}`, "error");
      return null;
    }
  }

  async deleteInterview(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, "Deleting Interview", "debug");
      const interviewRepository = AppDataSource.getRepository(InterviewEntity);
      const interview = await interviewRepository.findOneBy({ id });
      if (!interview) {
        loggerPrinter(this.SECTION, "Interview did't find.", "error");
        throw new Error('Interview not founded');
      }
      await interviewRepository.remove(interview);
      loggerPrinter(this.SECTION, `Deleted Interview with id: ${id}.`, "info");
      return true;
    } catch (error) {
      loggerPrinter(this.SECTION, "Error while deleting Interview.", "error");
      return false;
    }
  }

}