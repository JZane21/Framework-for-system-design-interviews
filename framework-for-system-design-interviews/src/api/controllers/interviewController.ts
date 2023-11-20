import { Router, Request, Response } from "express";
import { InterviewService } from "../../app/services/interviewService";
import { showErrorResponse } from "../utils/responseMessage";
import logger from "../../infrastructure/logger/logger";
import { InterviewDTO } from "../../app/dtos/interview.dto";

export class InterviewController {
  public router: Router;
  private interviewService: InterviewService;
  constructor(interviewService: InterviewService) {
    this.interviewService = interviewService;
    this.router = Router();
    this.routes();
  }

  public async getInterviewById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    logger.debug(`InterviewController: Getting interview with id: ${id}`);
    const permissionDto = await this.interviewService.getInterviewByID(id);

    if (!permissionDto) {
      logger.error(`InterviewController: Error while getting interview with id: ${id}`);
      showErrorResponse(404, res, "Interview not found");
      return;
    }

    logger.debug(`InterviewController: Gotten interview with id: ${id}`);
    res.json(permissionDto);
  }

  public async getInterviews(req: Request, res: Response): Promise<void> {
    logger.debug(`InterviewController: Getting interviews`);
    const permissionsDto = await this.interviewService.getInterviews();

    if (!permissionsDto) {
      logger.error(`InterviewController: Error while getting interviews`);
      showErrorResponse(404, res, "Interviews not found");
      return;
    }

    logger.debug(`InterviewController: Gotten interviews`);
    res.json(permissionsDto);
  }

  public async createInterview(req: Request, res: Response): Promise<void> {
    logger.debug(`InterviewController: Creating interview`);
    const interviewDto: InterviewDTO = req.body;
    const interview = await this.interviewService.createInterview(interviewDto);
    if (!interview) {
      logger.error(`InterviewController: Error while creating interview`);
      showErrorResponse(500, res, "Interview couldn't be created");
      return;
    }
    logger.info(`InterviewController: Interview created`);
    res.json(interview);
  }

  public routes() {
    this.router.get('/:id', this.getInterviewById.bind(this));
    this.router.get('/', this.getInterviews.bind(this));
    this.router.post('/');
  }
}