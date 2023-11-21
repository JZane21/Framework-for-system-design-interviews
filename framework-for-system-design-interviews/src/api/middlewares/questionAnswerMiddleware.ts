import { body, check, param, validationResult } from "express-validator";
import { showErrorResponse } from "../utils/responseMessage";
import { Request, Response, NextFunction } from "express";

export const questionAnswerValidatorCreationRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    body("answers").isString().isLength({ min: 1 }),
    body("rightAnswer").isString().isLength({ min: 1 }),
    body("questionId").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionAnswerValidatorUpdateRules = () => {
  return [
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("questionId").isUUID().isLength({ min: 36, max: 36 }),
    body("answers").isString().isLength({ min: 1 }),
    body("rightAnswer").isString().isLength({ min: 1 }),
  ];
};

export const questionAnswerValidatorDeleteRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionAnswerValidatorGetByIdRules = () => {
  return [
    param("id").isUUID().isLength({ min: 36, max: 36 }),
    body("idUser").isUUID().isLength({ min: 36, max: 36 }),
  ];
};

export const questionAnswerValidatorGetRules = () => {
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