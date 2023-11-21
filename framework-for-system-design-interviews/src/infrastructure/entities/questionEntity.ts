import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";
import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { InterviewEntity } from "./interviewEntity";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { QuestionAnswerEntity } from "./questionAnswerEntity";

@Entity()
export class QuestionEntity implements IQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  statement: string;

  @ManyToOne(() => InterviewEntity, interview => interview.questions)
  @JoinColumn({ name: 'interviewId' })
  interview: InterviewEntity;

  @OneToOne(() => QuestionAnswerEntity)
  @JoinColumn({ name: 'questionAnswerId' })
  correctAnswer: QuestionAnswerEntity;
}
