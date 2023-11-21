import { IInterviewEntity } from "./IInterviewEntity";
import { IRoleEntity } from "./IRoleEntity";

export interface IUserEntity{
    id?:string;
    username:string;
    passwordHash:string;
    email:string;
    role:IRoleEntity;
    answers:string
}