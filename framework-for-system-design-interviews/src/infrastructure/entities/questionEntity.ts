import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";
import { InterviewEntity } from "./interviewEntity";
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

  @OneToMany(() => QuestionAnswerEntity, questionAnswer => questionAnswer.question)
  @JoinColumn({ name: 'questionAnswerId' })
  correctAnswer: QuestionAnswerEntity[];
}
