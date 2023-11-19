import { PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { IFormEntity } from "../../domain/entities/IFormEntity";
import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { IInterviewFormEntity } from "../../domain/entities/IInterviewFormEntity";

export class InterviewFormEntity implements IInterviewFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  interview: IInterviewEntity;

  @JoinColumn({ name: 'formId' })
  form: IFormEntity;
}