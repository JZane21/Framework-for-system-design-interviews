import { InterviewFormDTO } from "../../app/dtos/interviewForm.dto";
import { InterviewForm } from "../models/interviewForm";

export interface InterviewFormRepository {
  findById(id: string): Promise<InterviewFormDTO | null>;
  getInterviewForms(): Promise<InterviewFormDTO[]>;
  createInterviewForm(interviewForm: InterviewForm): Promise<InterviewFormDTO>;
  updateInterviewForm(id: string, updatedData: Partial<InterviewForm>): Promise<InterviewFormDTO>;
  deleteInterviewForm(id: string): Promise<boolean>;
}