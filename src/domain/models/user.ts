import { IRoleEntity } from "../entities/IRoleEntity";
import { IUserEntity } from "../entities/IUserEntity";
import { v4 as uuidv4 } from 'uuid';

export class User{
    id:string
    username:string;
    passwordHash:string;
    email:string;
    role:IRoleEntity;

    constructor(userEntity:IUserEntity){
        this.id = userEntity.id || uuidv4(); //Crea un ID de usuario en caso de que no se le mande un ID
        this.username = userEntity.username;
        this.passwordHash = userEntity.passwordHash;
        this.email = userEntity.email;
        this.role = userEntity.role;
    }
}