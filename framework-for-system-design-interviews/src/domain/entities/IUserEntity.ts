import { IRoleEntity } from "./IRoleEntity";

export interface IUserEntity{
    id?:string;
    username:string;
    passwordHash:string;
    email:string;
    role:IRoleEntity;
    //interview:IInterviewEntity ||||||||| import IInterviewEntity
    answers:string
}