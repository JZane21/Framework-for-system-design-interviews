import { Router, Request, Response } from "express";
import { UserService } from "../../app/services/userService";
import { CreateUserDTO } from "../../app/dtos/createUserDTO";
import logger from "../../infrastructure/logger/logger";

export class UserController{
    public router:Router
    private userService:UserService

    constructor(userService:UserService){
        this.userService = userService
        this.router = Router();
        this.routes();
    }

    public async getUserById(req:Request, res:Response):Promise<void>{
        const {id} = req.params;
        const userDTO = await this.userService.getUserById(id);
    
        if(!userDTO){
            res.status(404).json({message: 'User not found'})
            return;
        }

        res.json(userDTO)
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDto: CreateUserDTO = req.body;
            logger.debug("El json dado es:" + JSON.stringify(userDto) + " en el createUserController")
            const user = await this.userService.createUser(userDto);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: error });

        }
    }

    public routes() {
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
        //this.router.delete('/:userId', this.deleteUser.bind(this));
        //this.router.put('/:userId', this.updateUser.bind(this));
    }


}