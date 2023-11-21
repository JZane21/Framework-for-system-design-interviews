import "reflect-metadata";
import { DataSource } from "typeorm";
import { db } from '../../infrastructure/config/config';
import { InterviewEntity } from "../entities/interviewEntity";
import { QuestionEntity } from "../entities/questionEntity";
import { QuestionAnswerEntity } from "../entities/questionAnswerEntity";

export const AppDataSource = new DataSource({
  type: db.type as "mysql" | "mariadb" | "postgres" | "mongodb",
  host: db.host,
  port: db.port as number,
  username: db.username,
  password: db.password,
  database: db.database,
  synchronize: true,
  logging: false,
  entities: [InterviewEntity, QuestionEntity, QuestionAnswerEntity],
  subscribers: [],
  migrations: [],
});
