import { Router, Request, Response } from "express";

import logger from "../../infrastructure/logger/logger";
import { UserService } from "../../app/services/userService";
import { CreateUserDTO } from "../../app/dtos/createUserDTO";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import { createUserValidationRules, getUserValidationRules, userValidationRules, validate } from "../middlewares/userValidator";

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
        loggerPrinter("UserController","User retrived succesfully","info")

    
        if(!userDTO){
            loggerPrinter("UserController","User not found","error")
            res.status(404).json({message: 'User not found'})
            return;
        }

        res.json(userDTO)
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDto: CreateUserDTO = req.body;
            loggerPrinter("UserController","El json dado es:" + JSON.stringify(userDto),"debug") //log para saber si llega el primer .json
            const user = await this.userService.createUser(userDto);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                loggerPrinter("UserController","Bad data was send","error")
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: error });

        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        try {
            logger.debug(`Intentando eliminar al usuario con ID: ${userId}`);
            await this.userService.deleteUser(userId);
            logger.info(`Usuario con ID: ${userId} eliminado con éxito`);
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            logger.error(`Error al eliminar al usuario con ID: ${userId}. Error: ${error}`);
            return res.status(500).json({ message: error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        const updateData = req.body;
        try {
            logger.debug(`UserController: Intentando actualizar al usuario con ID: ${userId}`);
            const updatedUser = await this.userService.updateUser(userId, updateData);
            logger.info(`Usuario con ID: ${userId} actualizado con éxito`);
            return res.status(200).json({ user: updatedUser });
        } catch (error) {
            logger.error(`Error al actualizar al usuario con ID: ${userId}. Error: ${error}`);
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    };

    public routes() {
        this.router.get('/:id',verifyTokenMiddleware, this.getUserById.bind(this));
        this.router.post('/',createUserValidationRules(),validate, this.createUser.bind(this));
        this.router.delete('/:userId', this.deleteUser.bind(this));
        this.router.put('/:userId', this.updateUser.bind(this));
    }


}