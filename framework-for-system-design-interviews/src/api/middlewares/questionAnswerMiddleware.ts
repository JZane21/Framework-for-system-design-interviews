import { body, check, validationResult } from "express-validator";
import { showErrorResponse } from "../utils/responseMessage";
import { Request, Response, NextFunction } from "express";

export const questionAnswerValidatorRules = () => {
  return [
    body("idInterview").isAlphanumeric().isLength({ min: 36, max: 36 }),
    body("statement").isAlphanumeric().isLength({ min: 8 }),
    body('correctAnswer').isObject(),
    body('correctAnswer.answers').isArray().isLength({ min: 2 }),
    body('correctAnswer.answers.*').isAlphanumeric().isLength({ min: 1 }),
    body('correctAnswer.rightAnswer').isAlphanumeric().isLength({ min: 1 }),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return showErrorResponse(500, res, { errors: errors.array() });
  }
  return next();
};