import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { Form } from "../../domain/models/form";
import { Interview } from "../../domain/models/interview";
import logger from "../../infrastructure/logger/logger";
import { interviewToIInterviewEntity, interviewToInterviewDTO } from "../adapters/interviewAdapter";
import { InterviewDTO } from "../dtos/interview.dto";

export class InterviewService {
  constructor(private InterviewRepository: InterviewRepository) { }

  async getInterviews(): Promise<InterviewDTO[]> {
    logger.debug(`InterviewService: Trying to get interviews`);
    const Interviews = await this.InterviewRepository.getInterviews();
    // const InterviewsFromDB: InterviewDTO[] =
    //   Interviews.map((Interview: Interview) => interviewToInterviewDTO(Interview)) || [];
    return Interviews;
  }

  async getInterviewByID(id: string): Promise<InterviewDTO | null> {
    logger.debug(`InterviewService: Trying to get interview form with id: ${id}`);
    const Interview = await this.InterviewRepository.findById(id);
    if (!Interview) {
      logger.error(`InterviewService: Error trying to get interviewwith id: ${id}`);
      return null;
    }
    return interviewToInterviewDTO(Interview);
  }

  async createInterview(createInterviewDto: InterviewDTO): Promise<InterviewDTO> {
    logger.debug(`InterviewService: Trying to create an interview`);
    const interviewEntity: IInterviewEntity = interviewToIInterviewEntity(createInterviewDto);

    const newInterview: Interview = new Interview(interviewEntity);

    return await this.createInterview(newInterview);
  }

  async updateFormById(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO> {
    logger.debug(`InterviewService: Trying to updating interview with id: ${id}`);
    return this.InterviewRepository.updateInterview(id, updatedData);
  }

  async deleteFormById(id: string): Promise<boolean> {
    logger.debug(`InterviewService: Trying to delete interview with id: ${id}`);
    return this.InterviewRepository.deleteInterview(id);
  }
}