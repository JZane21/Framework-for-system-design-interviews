import { IFormEntity } from "./IFormEntity";
import { IInterviewEntity } from "./IInterviewEntity";

export interface IInterviewFormEntity {
  id?: string;
  interview: IInterviewEntity;
  form: IFormEntity;
}