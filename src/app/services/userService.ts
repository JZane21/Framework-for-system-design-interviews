import { UserRepository } from "../../domain/interfaces/userRepositoy";
import { UserDTO } from "../dtos/userDTO";

export class UserService{
    constructor(private userRepository:UserRepository){}

    async getUserById(id:string):Promise<UserDTO | null>{
        const user = await this.userRepository.findById(id)
        if(!user) return null
        const userResponse:UserDTO ={
            id: user.id,
            username: user.username,
            email: user.email
        }
        return userResponse
        
    }

}