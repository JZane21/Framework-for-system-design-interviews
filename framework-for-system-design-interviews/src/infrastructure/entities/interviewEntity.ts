import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";
import { QuestionEntity } from "./questionEntity";

@Entity()
export class InterviewEntity implements IInterviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => QuestionEntity, question => question.interview)
  @JoinColumn({ name: 'questionsIds' })
  questions: QuestionEntity[];
}
