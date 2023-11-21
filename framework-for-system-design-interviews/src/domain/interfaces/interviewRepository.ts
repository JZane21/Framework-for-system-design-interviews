import { InterviewDTO } from "../../app/dtos/interview.dto";
import { Interview } from "../models/interview";
export interface InterviewRepository {
  findById(id: string, isRecruiter: boolean): Promise<InterviewDTO | null>;
  getInterviews(isRecruiter: boolean): Promise<InterviewDTO[]>;
  createInterview(interview: Interview): Promise<InterviewDTO>;
  updateInterview(id: string, updatedData: Partial<Interview>): Promise<InterviewDTO>;
  deleteInterview(id: string): Promise<boolean>;
}