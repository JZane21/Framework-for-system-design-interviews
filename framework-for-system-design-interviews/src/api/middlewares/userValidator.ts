import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../../infrastructure/config/config';
import {body,validationResult,param}  from "express-validator" 
import { format } from 'path';
import { loggerPrinter } from '../../infrastructure/utils/loggerPrinter';

export const createUserValidationRules = () =>{
    return[
        body("username").isAlphanumeric(),
        body('password').isLength({min:8}),
        body('email').isEmail(),
        body('roleId').isLength({min:1})
    ]
}

export const loginValidationRules = () =>{
    return[
        body('email').isEmail(),
        body('password').notEmpty()
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors  = validationResult(req);

    if (!errors.isEmpty()) {
        loggerPrinter("UserValidator","Error al ingresar datos","info")
       return res.status(400).json({ errors:errors.array() });
    } 
    next();

};  