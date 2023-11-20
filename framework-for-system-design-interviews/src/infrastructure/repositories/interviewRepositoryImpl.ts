import { InterviewDTO } from "../../app/dtos/interview.dto";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { Interview } from "../../domain/models/interview";

export class InterviewRepositoryImpl implements InterviewRepository {
  findById(id: string): Promise<InterviewDTO> {
    throw new Error("Method not implemented.");
  }
  getInterviews(): Promise<InterviewDTO[]> {
    throw new Error("Method not implemented.");
  }
  createInterview(interviewForm: Interview): Promise<InterviewDTO> {
    throw new Error("Method not implemented.");
  }
  updateInterview(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO> {
    throw new Error("Method not implemented.");
  }
  deleteInterview(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}