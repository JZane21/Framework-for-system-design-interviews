import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Entity } from "typeorm";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { QuestionEntity } from "./questionEntity";

@Entity()
export class QuestionAnswerEntity implements IQuestionAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  answers: string[];

  @Column({ type: 'varchar' })
  rightAnswer: string;

  @OneToOne(() => QuestionEntity)
  @JoinColumn({ name: 'questionId' })
  question: QuestionEntity;
}