import { PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";

export class QuestionAnswerEntity implements IQuestionAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  answer: string;

  @Column({ type: 'varchar' })
  rightAnswer: string;

  @JoinColumn({ name: 'questionId' })
  question: IQuestionEntity;

}