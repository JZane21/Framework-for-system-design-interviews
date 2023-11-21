import express from 'express';
import { InterviewController } from '../controllers/interviewController';
import { InterviewService } from '../../app/services/interviewService';
import { InterviewRepositoryImpl } from '../../infrastructure/repositories/interviewRepositoryImpl';

const API: string = "/api";

const interviewRepository = new InterviewRepositoryImpl();
const interviewService = new InterviewService(interviewRepository);
const interviewController = new InterviewController(interviewService);

export const routes = (server: express.Application) => {
  const router = express.Router();
  router.use('/interviews', interviewController.router);
  server.use(API, router);
};