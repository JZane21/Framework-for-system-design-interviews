import { InterviewDTO } from "../../app/dtos/interview.dto";
import { Interview } from "../models/interview";
export interface InterviewRepository {
  findById(id: string): Promise<InterviewDTO | null>;
  getInterviews(): Promise<InterviewDTO[]>;
  createInterview(interview: Interview): Promise<InterviewDTO>;
  updateInterview(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO>;
  deleteInterview(id: string): Promise<boolean>;
}