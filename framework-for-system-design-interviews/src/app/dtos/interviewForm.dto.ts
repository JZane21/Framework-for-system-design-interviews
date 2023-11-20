import { FormDTO } from "./form.dto";
import { InterviewDTO } from "./interview.dto";

export interface InterviewFormDTO {
  id: string;
  interview: InterviewDTO;
  form: FormDTO;
}