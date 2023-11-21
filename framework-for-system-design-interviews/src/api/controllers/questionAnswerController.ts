import { Router, Request, Response } from "express";
import { QuestionAnswerService } from "../../app/services/questionAnswerService";
import { showErrorResponse, showInfoResponse } from "../utils/responseMessage";
import { loggerPrinter } from "../../utils/loggerPrinter";
import { CreateQuestionAnswerDTO } from "../../app/dtos/create.questionAnswer.dto";

export class QuestionAnswerController {
  public router: Router;
  private SECTION: string = "QuestionAnswerController";

  private QuestionAnswerService: QuestionAnswerService;
  constructor(QuestionAnswerService: QuestionAnswerService) {
    this.QuestionAnswerService = QuestionAnswerService;
    this.router = Router();
    this.routes();
  }

  public async getQuestionAnswerById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    loggerPrinter(this.SECTION, `Getting QuestionAnswer with id: ${id}`, "debug");
    const permissionDto = await this.QuestionAnswerService.getQuestionAnswerByID(id);
    if (!permissionDto) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswer with id: ${id}`, "error");
      showErrorResponse(404, res, "QuestionAnswer not found");
      return;
    }
    loggerPrinter(this.SECTION, `Gotten QuestionAnswer with id: ${id}`, "info");
    res.json(permissionDto);
  }

  public async getQuestionAnswers(req: Request, res: Response): Promise<void> {
    loggerPrinter(this.SECTION, `Getting QuestionAnswers`, "debug");
    const permissionsDto = await this.QuestionAnswerService.getQuestionAnswers();

    if (!permissionsDto) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswers`, "error");
      showErrorResponse(404, res, "QuestionAnswers not found");
      return;
    }
    loggerPrinter(this.SECTION, `Gotten QuestionAnswers`, "info");
    res.json(permissionsDto);
  }

  public async createQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Creating QuestionAnswer`, "debug");
      const QuestionAnswerDto: CreateQuestionAnswerDTO = req.body;
      const QuestionAnswer = await this.QuestionAnswerService.createQuestionAnswer(QuestionAnswerDto);
      if (!QuestionAnswer) {
        loggerPrinter(this.SECTION, `Error while creating QuestionAnswer`, "error");
        return showErrorResponse(500, res, "QuestionAnswer couldn't be created");
      }
      loggerPrinter(this.SECTION, `QuestionAnswer created`, "info");
      return showInfoResponse(200, QuestionAnswer, res, 'QuestionAnswer Created');
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not create QuestionAnswer");
    }
  }

  public async updateQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `Updaing QuestionAnswer`, "debug");
      const { id } = req.params;
      const updateData = req.body;
      // const updatedQuestionAnswer = await this.QuestionAnswerService.updateFormById(id, updateData);
      loggerPrinter(this.SECTION, `Updated QuestionAnswer succesfully`, "info");
      // return showInfoResponse(200, updatedQuestionAnswer, res, "QuestionAnswer updated");
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not update QuestionAnswer");
    }
  }

  public async deleteQuestionAnswer(req: Request, res: Response): Promise<Response> {
    try {
      loggerPrinter(this.SECTION, `deleting QuestionAnswer`, "debug");
      const { id } = req.params;
      // const deleted: boolean = await this.QuestionAnswerService.deleteFormById(id);
      // if (!deleted) {
      //   loggerPrinter(this.SECTION, `Error while deleting QuestionAnswer`, "error");
      //   return showErrorResponse(500, res, "Could not delete QuestionAnswer");
      // }
      loggerPrinter(this.SECTION, `deleted QuestionAnswer`, "info");
    } catch (error) {
      loggerPrinter(this.SECTION, `${{ message: error }}`, "error");
      return showErrorResponse(500, res, "Could not delete QuestionAnswer");
    }
  };

  public routes() {
    this.router.get('/:id', this.getQuestionAnswerById.bind(this));
    this.router.get('/', this.getQuestionAnswers.bind(this));
    this.router.post('/', this.createQuestionAnswer.bind(this));
    this.router.put('/:id', this.updateQuestionAnswer.bind(this));
    this.router.delete('/:id', this.deleteQuestionAnswer.bind(this));
  }
}