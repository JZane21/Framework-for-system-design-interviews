import express from 'express';
import { InterviewController } from '../controllers/interviewController';
import { InterviewService } from '../../app/services/interviewService';
import { InterviewRepositoryImpl } from '../../infrastructure/repositories/interviewRepositoryImpl';

import { RoleService } from '../../app/services/roleService';
import { UserService } from '../../app/services/userService';
import { RoleRepositoryImpl } from '../../infrastructure/repositories/roleRepositoryImpl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/userRepositoryImpl';
import { RoleController } from '../controllers/roleController';
import { UserController } from '../controllers/userController';
import { AuthService } from '../../app/services/authService';
import { AuthController } from '../controllers/authController';

import { EncryptImpl } from '../../infrastructure/utils/encrypt.jwt';
import { QuestionRepositoryImpl } from '../../infrastructure/repositories/questionRepositoryImpl';
import { QuestionService } from '../../app/services/questionService';
import { QuestionController } from '../controllers/questionController';
import { QuestionAnswerRepositoryImpl } from '../../infrastructure/repositories/questionAnswerRepositoryImpl';
import { QuestionAnswerService } from '../../app/services/questionAnswerService';
import { QuestionAnswerController } from '../controllers/questionAnswerController';
import { RedisCacheService } from '../../infrastructure/cache/cache';

const encrypt = new EncryptImpl();

const redisCacheService = new RedisCacheService();

const roleRepository = new RoleRepositoryImpl();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository, roleRepository, redisCacheService);
const userController = new UserController(userService);

const authService = new AuthService(userRepository, encrypt, redisCacheService);
const authController = new AuthController(authService);

const API: string = '/api';

const interviewRepository = new InterviewRepositoryImpl();
const interviewService = new InterviewService(interviewRepository);
const interviewController = new InterviewController(interviewService);

const questionRepository = new QuestionRepositoryImpl();
const questionService = new QuestionService(questionRepository, interviewRepository);
const questionController = new QuestionController(questionService);

const questionAnswerRepository = new QuestionAnswerRepositoryImpl();
const questionAnswerService = new QuestionAnswerService(questionAnswerRepository, interviewRepository, questionRepository);
const questionAnswerController = new QuestionAnswerController(questionAnswerService);

export const routes = (server: express.Application) => {
  const router = express.Router();
  router.use('/interviews', interviewController.router);
  router.use('/users', userController.router);
  router.use('/roles', roleController.router);
  router.use('/auth', authController.router);
  router.use('/questions', questionController.router);
  router.use('/questionAnswers', questionAnswerController.router);
  //router.use('/permissions', permissionController.router);

  server.use(API, router);
};