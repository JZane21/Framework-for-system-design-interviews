import { IFormEntity } from "../entities/IFormEntity";
import { IInterviewEntity } from "../entities/IInterviewEntity";
import { IInterviewFormEntity } from "../entities/IInterviewFormEntity";
import { v4 as uuidv4 } from 'uuid';

export class InterviewForm {
  id: string;
  interview: IInterviewEntity;
  form: IFormEntity;

  constructor(interviewFormEntity: IInterviewFormEntity) {
    this.id = interviewFormEntity.id || uuidv4();
    this.interview = interviewFormEntity.interview;
    this.form = interviewFormEntity.form;
  }
}