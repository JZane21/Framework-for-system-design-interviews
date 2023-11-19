import { IRoleEntity } from "../entities/IRoleEntity"
import { v4 as uuidv4 } from 'uuid';


export class Role{
    id:string
    roleName:string
    description:string

    constructor(roleEntity:IRoleEntity){
        this.id = roleEntity.id || uuidv4();
        this.roleName = roleEntity.roleName;
        this.description = roleEntity.description;
    }
}