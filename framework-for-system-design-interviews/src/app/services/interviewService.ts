import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { Interview } from "../../domain/models/interview";
import logger from "../../infrastructure/logger/logger";
import { createInterviewDTOToIInterviewEntity, interviewToInterviewDTO } from '../../infrastructure/adapters/interviewAdapter';
import { InterviewDTO } from "../dtos/interview.dto";
import { CreateInterviewDTO } from "../dtos/create.interview.dto";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";

export class InterviewService {
  constructor(private InterviewRepository: InterviewRepository) { }

  private SECTION: string = "InterviewService";

  async getInterviews(isRecruiter: boolean): Promise<InterviewDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting interviews.", "debug");
      const Interviews = await this.InterviewRepository.getInterviews(isRecruiter);
      loggerPrinter(this.SECTION, "Gotten interviews.", "info");
      return Interviews;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting interviews: ${error}`, "error");
      return [];
    }
  }

  async getInterviewByID(id: string, isRecruiter: boolean): Promise<InterviewDTO | null> {
    try {
      loggerPrinter(this.SECTION, `Getting interview with id: ${id}.`, "debug");
      const Interview = await this.InterviewRepository.findById(id, isRecruiter);
      if (!Interview) {
        logger.error(`InterviewService: Error trying to get interview with id: ${id}`);
        loggerPrinter(this.SECTION, `Interview didn't find with id: ${id}.`, "error");
        return null;
      }
      loggerPrinter(this.SECTION, `Gotten interview with id: ${id}.`, "info");
      return interviewToInterviewDTO(Interview);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting interview with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async createInterview(createInterviewDto: CreateInterviewDTO): Promise<InterviewDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating interview", "debug.");
      const interviewEntity: IInterviewEntity = createInterviewDTOToIInterviewEntity(createInterviewDto);
      const newInterview: Interview = new Interview(interviewEntity);
      const answer = await this.InterviewRepository.createInterview(newInterview);
      loggerPrinter(this.SECTION, "Created interview.", "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating interview: ${error}.`, "error");
      return null;
    }
  }

  async updateFormById(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO> {
    try {
      loggerPrinter(this.SECTION, `Updating interview with id: ${id}`, "debug");
      const answer = await this.InterviewRepository.updateInterview(id, updatedData);
      loggerPrinter(this.SECTION, `Updated interview with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating interview with id: ${id}: ${error}.`);
      return null;
    }
  }

  async deleteFormById(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, `Deleting interview with id: ${id}.`, "debug");
      const answer = await this.InterviewRepository.deleteInterview(id);
      loggerPrinter(this.SECTION, `Deleted interview with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while deleting interview with id: ${id}: ${error}.`, "error");
      return false;
    }
  }
}