import { Router, Request, Response } from "express";
import { QuestionService } from "../../app/services/questionService";
import { showError, showErrorResponse, showInfoResponse } from "../utils/responseMessage";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import {
  validate,
  questionValidatorCreationRules,
  questionValidatorDeleteRules,
  questionValidatorUpdateRules,
  questionValidatorGetByIdRules,
  questionValidatorGetRules
} from "../middlewares/questionMiddleware";
import { verifyRole } from "../middlewares/verifyRoleUser";
import { UpdateQuestionDTO } from "../../app/dtos/update.question.dto";
import { CreateQuestionDTO } from "../../app/dtos/create.question.dto";
import { Question } from "../../domain/models/question";

export class QuestionController {
  public router: Router;
  private SECTION: string = "QuestionController";

  private QuestionService: QuestionService;
  // private userController: UserController;

  constructor(QuestionService: QuestionService) {
    this.QuestionService = QuestionService;
    // this.userController = userController;
    this.router = Router();
    this.routes();
  }

  public async getQuestionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      loggerPrinter(this.SECTION, `Getting Question with id: ${id}`, "debug");
      // const isRecruiterUser = await verifyRole(req.body.idUser, this.userController);
      const isRecruiterUser = verifyRole(req.body.idUser, { roleId: "Recruiter" });
      const permissionDto = await this.QuestionService.getQuestionByID(id, isRecruiterUser);
      if (!permissionDto) {
        loggerPrinter(this.SECTION, `Error while getting Question with id: ${id}`, "error");
        showErrorResponse(404, res, "Question not found");
        return;
      }
      loggerPrinter(this.SECTION, `Gotten Question with id: ${id}`, "info");
      showInfoResponse(302, permissionDto, res);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Questions with id: ${req.params.id}: ${error}`, "error");
      showErrorResponse(404, res, error);
    }
  }

  public async getQuestions(req: Request, res: Response): Promise<void> {
    try {
      loggerPrinter(this.SECTION, `Getting Questions`, "debug");
      const isRecruiterUser = verifyRole(req.body.idUser, { roleId: "Recruiter" });
      const QuestionsDto = await this.QuestionService.getQuestions(isRecruiterUser);
      if (!QuestionsDto) {
        loggerPrinter(this.SECTION, `Error while getting Questions`, "error");
        showErrorResponse(404, res, "Questions not found");
        return;
      }
      loggerPrinter(this.SECTION, `Gotten Questions`, "info");
      showInfoResponse(200, QuestionsDto, res);
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Questions: ${error}`, "error");
      showErrorResponse(404, res, `${error}`);
    }
  }

  public async createQuestion(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Creating Question`, "debug");
      const QuestionDto: CreateQuestionDTO = req.body;
      const isRecruiterUser = verifyRole(req.body.idUser, { roleId: "Recruiter" });
      if (isRecruiterUser) {
        const Question = await this.QuestionService.createQuestion(QuestionDto, isRecruiterUser);
        if (!Question) {
          loggerPrinter(this.SECTION, `Error while creating Question`, "error");
          return showErrorResponse(500, res, "Question couldn't be created");
        }
        loggerPrinter(this.SECTION, `Question created`, "info");
        return showInfoResponse(200, Question, res, 'Question Created');
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not create Question");
    }
  }

  public async updateQuestion(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Updaing Question`, "debug");
      const { id } = req.params;
      const updateData: UpdateQuestionDTO = req.body;
      const isRecruiterUser = verifyRole(req.body.idUser, { roleId: "Recruiter" });
      if (isRecruiterUser) {
        const updatedQuestion = await this.QuestionService.updateFormById(id, updateData);
        loggerPrinter(this.SECTION, `Updated Question succesfully`, "info");
        return showInfoResponse(200, updatedQuestion, res, "Question updated");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not update Question");
    }
  }

  public async deleteQuestion(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `deleting Question`, "debug");
      const { id } = req.params;
      const isRecruiterUser = verifyRole(req.body.idUser, { roleId: "Recruiter" });
      if (isRecruiterUser) {
        const deleted: boolean = await this.QuestionService.deleteFormById(id);
        if (!deleted) {
          loggerPrinter(this.SECTION, `Error while deleting Question`, "error");
          return showErrorResponse(500, res, "Could not delete Question");
        }
        loggerPrinter(this.SECTION, `deleted Question`, "info");
        return showInfoResponse(200, deleted, res, "Deleted question");
      } else {
        loggerPrinter(this.SECTION, `Unauthorized user!`, "error");
        return showErrorResponse(401, res, "Unauthorized user!");
      }
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not delete Question");
    }
  };

  public routes() {
    this.router.get('/:id', questionValidatorGetByIdRules(), validate, this.getQuestionById.bind(this));
    this.router.get('/', questionValidatorGetRules(), validate, this.getQuestions.bind(this));
    this.router.post('/', questionValidatorCreationRules(), validate, this.createQuestion.bind(this));
    this.router.put('/:id', questionValidatorUpdateRules(), validate, this.updateQuestion.bind(this));
    this.router.delete('/:id', questionValidatorDeleteRules(), validate, this.deleteQuestion.bind(this));
  }
}