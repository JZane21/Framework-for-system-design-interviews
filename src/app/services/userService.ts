import { IUserEntity } from "../../domain/entities/IUserEntity";
import { RoleRepository } from "../../domain/interfaces/roleRepository";
import { UserRepository } from "../../domain/interfaces/userRepositoy";
import { User } from "../../domain/models/user";
import logger from "../../infrastructure/logger/logger";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { UserDTO } from "../dtos/userDTO";

export class UserService{
    constructor(private userRepository:UserRepository, private roleRepository: RoleRepository){}

    async getUserById(id:string):Promise<UserDTO | null>{
        const user = await this.userRepository.findById(id)
        if(!user) return null
        const userResponse:UserDTO ={
            id: user.id,
            username: user.username,
            email: user.email,
            role:user.role
        }
        logger.info("Usuario obtenido con exito")
        logger.debug(JSON.stringify(userResponse));
        return userResponse
        
    }

    async createUser(userDto: CreateUserDTO): Promise<User> {
        const role = await this.roleRepository.findById(userDto.roleId);
        logger.info('Role en createUserService:');
        logger.debug(role)
        if (!role) {
            throw new Error('Rol no encontrado');
        }


        const userEntity: IUserEntity = {
            username: userDto.username,
            email: userDto.email,
            passwordHash: userDto.password,
            role
        };
        const newUser = new User(userEntity);

        return this.userRepository.createUser(newUser);
    }

}