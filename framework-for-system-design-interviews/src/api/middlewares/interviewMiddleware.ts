import { body, param, validationResult } from "express-validator";
import { showErrorResponse } from "../utils/responseMessage";
import { Request, Response, NextFunction } from "express";
import { verifyTokenMiddleware } from "./verifyToken";
import { jwt as jwtConfig } from '../../infrastructure/config/config';
import jwt from 'jsonwebtoken';

export const interviewValidatorCreationRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    body("title").isString().isLength({ min: 1 }),
    body("description").isString().isLength({ min: 0 }),
  ];
};

export const interviewValidatorUpdateRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    body("title").isString().isLength({ min: 1 }),
    body("description").isString().isLength({ min: 0 }),
  ];
};

export const interviewValidatorDeleteRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const interviewValidatorGetByIdRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const interviewValidatorGetRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return showErrorResponse(500, res, { errors: errors.array() });
  }
  // verifyTokenMiddleware(req,res,next);
  const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // TODO: create interface for the token
        jwt.verify(token, jwtConfig.secretKey, (err, user: any) => {
            if (err) {
                return res.status(403).json({ message: "Token no válido" });
            }
            req.user_id = user.userId;
        });
    } else {
        res.status(401).json({ message: "Token no proporcionado" });
    }

  return next();
};
