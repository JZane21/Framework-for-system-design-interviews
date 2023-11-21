import { UserDTO } from "../../app/dtos/userDTO";
import { UserService } from "../../app/services/userService";
import { User } from "../../domain/models/user";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import { UserController } from "../controllers/userController";
//async
export const verifyRole = async (userId:string, userService:UserService) => {
  const user: UserDTO = await userService.getUserById(userId);
  if (!user) {
    loggerPrinter("ROLE VERIFIER", "User not found", "error");
  }
  loggerPrinter("ROLE VERIFIER", "User with role Recruiter found", "info");
  return user.role.id === "Recruiter";
};