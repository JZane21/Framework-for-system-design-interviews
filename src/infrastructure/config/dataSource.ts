import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/userEntity";
import { RoleEntity } from "../entities/roleEntity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "system_interview_db",
    synchronize: true,
    logging: false,
    entities: [UserEntity,RoleEntity],
    subscribers: [],
    migrations: [],
});