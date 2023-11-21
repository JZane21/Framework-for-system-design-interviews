import { Router, Request, Response } from "express";
import { QuestionAnswerService } from "../../app/services/questionAnswerService";
import { showError, showErrorResponse, showInfoResponse } from "../utils/responseMessage";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import {
  validate,
  questionAnswerValidatorCreationRules,
  questionAnswerValidatorDeleteRules,
  questionAnswerValidatorUpdateRules,
  questionAnswerValidatorGetByIdRules,
  questionAnswerValidatorGetRules
} from "../middlewares/questionAnswerMiddleware";
import { verifyRole } from "../middlewares/verifyRoleUser";
import { UpdateQuestionAnswerDTO } from "../../app/dtos/update.questionAnswer.dto";
import { CreateQuestionAnswerDTO } from "../../app/dtos/create.questionAnswer.dto";
import { QuestionAnswer } from "../../domain/models/questionAnswer";
import { UserService } from "../../app/services/userService";

export class QuestionAnswerController {
  public router: Router;
  private SECTION: string = "QuestionAnswerController";
  private QuestionAnswerService: QuestionAnswerService;

  private userService: UserService;
  // private userController: UserController;

  constructor(QuestionAnswerService: QuestionAnswerService,userService: UserService) {
    this.QuestionAnswerService = QuestionAnswerService;
    this.userService = userService;
    // this.userController = userController;
    this.router = Router();
    this.routes();
  }

  public async getQuestionAnswerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      loggerPrinter(this.SECTION, `Getting QuestionAnswer with id: ${id}`, "debug");
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);
      const permissionDto = await this.QuestionAnswerService.getQuestionAnswerByID(id, isRecruiterUser);
      if (!permissionDto) {
        loggerPrinter(this.SECTION, `Error while getting QuestionAnswer with id: ${id}`, "error");
        showErrorResponse(404, res, "QuestionAnswer not found");
        return;
      }
      loggerPrinter(this.SECTION, `Gotten QuestionAnswer with id: ${id}`, "info");
      showInfoResponse(302, permissionDto, res);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswers with id: ${req.params.id}: ${error}`, "error");
      showErrorResponse(404, res, error);
    }
  }

  public async getQuestionAnswers(req: Request, res: Response): Promise<void> {
    try {
      loggerPrinter(this.SECTION, `Getting QuestionAnswers`, "debug");
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);
      const QuestionAnswersDto = await this.QuestionAnswerService.getQuestionAnswers(isRecruiterUser);
      if (!QuestionAnswersDto) {
        loggerPrinter(this.SECTION, `Error while getting QuestionAnswers`, "error");
        showErrorResponse(404, res, "QuestionAnswers not found");
        return;
      }
      loggerPrinter(this.SECTION, `Gotten QuestionAnswers`, "info");
      showInfoResponse(200, QuestionAnswersDto, res);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswers: ${error}`, "error");
      showErrorResponse(404, res, `${error}`);
    }
  }

  public async createQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Creating QuestionAnswer`, "debug");
      const QuestionAnswerDto: CreateQuestionAnswerDTO = req.body;
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);

      if (isRecruiterUser) {
        const QuestionAnswer = await this.QuestionAnswerService.createQuestionAnswer(QuestionAnswerDto, isRecruiterUser);
        if (!QuestionAnswer) {
          loggerPrinter(this.SECTION, `Error while creating QuestionAnswer`, "error");
          return showErrorResponse(500, res, "QuestionAnswer couldn't be created");
        }
        loggerPrinter(this.SECTION, `QuestionAnswer created`, "info");
        return showInfoResponse(200, QuestionAnswer, res, 'QuestionAnswer Created');
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not create QuestionAnswer");
    }
  }

  public async updateQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Updaing QuestionAnswer`, "debug");
      const { id } = req.params;
      const updateData: UpdateQuestionAnswerDTO = req.body;
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);

      if (isRecruiterUser) {
        const updatedQuestionAnswer = await this.QuestionAnswerService.updateFormById(id, updateData);
        loggerPrinter(this.SECTION, `Updated QuestionAnswer succesfully`, "info");
        return showInfoResponse(200, updatedQuestionAnswer, res, "QuestionAnswer updated");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not update QuestionAnswer");
    }
  }

  public async deleteQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `deleting QuestionAnswer`, "debug");
      const { id } = req.params;
      const isRecruiterUser = await verifyRole(req.body.idUser,this.userService);

      if (isRecruiterUser) {
        const deleted: boolean = await this.QuestionAnswerService.deleteFormById(id);
        if (!deleted) {
          loggerPrinter(this.SECTION, `Error while deleting QuestionAnswer`, "error");
          return showErrorResponse(500, res, "Could not delete QuestionAnswer");
        }
        loggerPrinter(this.SECTION, `deleted QuestionAnswer`, "info");
        return showInfoResponse(200, deleted, res, "Deleted QuestionAnswer");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not delete QuestionAnswer");
    }
  };

  public routes() {
    this.router.get('/:id', questionAnswerValidatorGetByIdRules(), validate, this.getQuestionAnswerById.bind(this));
    this.router.get('/', questionAnswerValidatorGetRules(), validate, this.getQuestionAnswers.bind(this));
    this.router.post('/', questionAnswerValidatorCreationRules(), validate, this.createQuestionAnswer.bind(this));
    this.router.put('/:id', questionAnswerValidatorUpdateRules(), validate, this.updateQuestionAnswer.bind(this));
    this.router.delete('/:id', questionAnswerValidatorDeleteRules(), validate, this.deleteQuestionAnswer.bind(this));
  }
}