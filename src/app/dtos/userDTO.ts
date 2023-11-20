import { IRoleEntity } from "../../domain/entities/IRoleEntity"

export interface UserDTO{
    id:string
    username:string
    email:string
    role:IRoleEntity
}