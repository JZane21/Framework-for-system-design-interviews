import { Router, Request, Response } from "express";
import { InterviewService } from "../../app/services/interviewService";
import { showError, showErrorResponse, showInfoResponse } from "../utils/responseMessage";
import { CreateInterviewDTO } from "../../app/dtos/create.interview.dto";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
;
import {
  validate,
  interviewValidatorCreationRules,
  interviewValidatorDeleteRules,
  interviewValidatorUpdateRules,
  interviewValidatorGetByIdRules,
  interviewValidatorGetRules
} from "../middlewares/interviewMiddleware";
import { verifyRole } from "../middlewares/verifyRoleUser";
import { UpdateInterviewDTO } from "../../app/dtos/update.interview.dto";
import { UserController } from "./userController";
import { UserService } from "../../app/services/userService";

export class InterviewController {
  public router: Router;
  private SECTION: string = "InterviewController";

  private interviewService: InterviewService;
  private userService: UserService;

  constructor(interviewService: InterviewService,userService: UserService) {
    this.interviewService = interviewService;
    this.userService = userService;
    this.router = Router();
    this.routes();
  }

  public async getInterviewById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idUser = req.body;
      loggerPrinter(this.SECTION, `Getting interview with id: ${idUser}`, "debug");
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);
      loggerPrinter(this.SECTION, `Getting ISRECRUITER with id: ${isRecruiterUser}`, "debug");
      const permissionDto = await this.interviewService.getInterviewByID(id, isRecruiterUser);
      loggerPrinter(this.SECTION, `Getting permission with id: ${permissionDto}`, "debug");
      if (!permissionDto) {
        loggerPrinter(this.SECTION, `Error while getting interview with id: ${id}`, "error");
        showErrorResponse(404, res, "Interview not found");
        return;
      }
      
      loggerPrinter(this.SECTION, `Gotten interview with id: ${id}`, "info");
      showInfoResponse(302, permissionDto, res);
    } catch (error) {
      const id = req.params;
      loggerPrinter(this.SECTION, `Error while getting interviews with id: ${id}: ${error}`, "error");
      showErrorResponse(404, res, error);
    }
  }

  public async getInterviews(req: Request, res: Response): Promise<void> {
    try {
      loggerPrinter(this.SECTION, `Getting interviews`, "debug");
      const isRecruiterUser = await verifyRole(req.body.idUser, this.userService);
      const interviewsDto = await this.interviewService.getInterviews(isRecruiterUser);
      if (!interviewsDto) {
        loggerPrinter(this.SECTION, `Error while getting interviews`, "error");
        showErrorResponse(404, res, "Interviews not found");
        return;
      }
      loggerPrinter(this.SECTION, `Gotten interviews`, "info");
      showInfoResponse(200, interviewsDto, res);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting interviews: ${error}`, "error");
      showErrorResponse(404, res, `${error}`);
    }
  }

  public async createInterview(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Creating interview`, "debug");
      const interviewDto: CreateInterviewDTO = req.body;
      const isRecruiterUser = await verifyRole(req.body.idUser, this.userService);
      if (isRecruiterUser) {
        const interview = await this.interviewService.createInterview(interviewDto);
        if (!interview) {
          loggerPrinter(this.SECTION, `Error while creating interview`, "error");
          return showErrorResponse(500, res, "Interview couldn't be created");
        }
        loggerPrinter(this.SECTION, `Interview created`, "info");
        return showInfoResponse(200, interview, res, 'Interview Created');
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not create interview");
    }
  }

  public async updateInterview(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Updaing interview`, "debug");
      const { id } = req.params;
      const updateData: UpdateInterviewDTO = req.body;
      const isRecruiterUser = await verifyRole(req.body.idUser, this.userService);
      if (isRecruiterUser) {
        const updatedInterview = await this.interviewService.updateFormById(id, updateData);
        loggerPrinter(this.SECTION, `Updated interview succesfully`, "info");
        return showInfoResponse(200, updatedInterview, res, "Interview updated");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not update interview");
    }
  }

  public async deleteInterview(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `deleting interview`, "debug");
      const { id } = req.params;
      const isRecruiterUser = await verifyRole(req.body.idUser, this.userService);
      if (isRecruiterUser) {
        const deleted: boolean = await this.interviewService.deleteFormById(id);
        if (!deleted) {
          loggerPrinter(this.SECTION, `Error while deleting interview`, "error");
          return showErrorResponse(500, res, "Could not delete interview");
        }
        loggerPrinter(this.SECTION, `deleted interview`, "info");
        return showInfoResponse(200, deleted, res, "Deleted interview");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not delete interview");
    }
  };

  public routes() {
    this.router.get('/:id', interviewValidatorGetByIdRules(), validate, this.getInterviewById.bind(this));
    this.router.get('/', interviewValidatorGetRules(), validate, this.getInterviews.bind(this));
    this.router.post('/', interviewValidatorCreationRules(), validate, this.createInterview.bind(this));
    this.router.put('/:id', interviewValidatorUpdateRules(), validate, this.updateInterview.bind(this));
    this.router.delete('/:id', interviewValidatorDeleteRules(), this.deleteInterview.bind(this));
  }
}