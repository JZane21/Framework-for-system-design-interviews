import { UserRepository } from "../../domain/interfaces/userRepositoy";
import { User } from "../../domain/models/user";
import { AppDataSource } from "../config/dataSource";
import { UserEntity } from "../entities/userEntity";

export class UserRepositoryImpl implements UserRepository{
    async findById(id:string):Promise<User|null>{
        const userRepository = AppDataSource.getRepository(UserEntity)
        const user = await userRepository.findOne({
            where:{id},
            relations: ['role']
        })
        return user ? new User(user) : null;
    }
}