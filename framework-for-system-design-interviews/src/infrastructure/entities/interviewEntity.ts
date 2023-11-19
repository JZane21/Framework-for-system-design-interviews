import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";

export class InterviewEntity implements IInterviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;
}