import { PrimaryGeneratedColumn, Column, JoinColumn, Entity, ManyToOne } from "typeorm";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { QuestionEntity } from "./questionEntity";

@Entity()
export class QuestionAnswerEntity implements IQuestionAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  answers: string;

  @Column({ type: 'varchar' })
  rightAnswer: string;

  @ManyToOne(() => QuestionEntity, question => question.correctAnswer)
  @JoinColumn({ name: 'questionId' })
  question: QuestionEntity;
}