import { body, check, param, validationResult } from "express-validator";
import { showErrorResponse } from "../utils/responseMessage";
import { Request, Response, NextFunction } from "express";

export const questionValidatorCreationRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    body("statement").isString().isLength({ min: 8 }),
    body("interviewId").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionValidatorUpdateRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("statement").isString().isLength({ min: 1 }),
    body("interviewId").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionValidatorDeleteRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionValidatorGetByIdRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionValidatorGetRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return showErrorResponse(500, res, { errors: errors.array() });
  }
  return next();
};