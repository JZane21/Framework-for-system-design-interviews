import { UserService } from "../../app/services/userService";
import { User } from "../../domain/models/user";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import { UserController } from "../controllers/userController";
//async
export const verifyRole = async (userId:string) => {
  const user: User = await UserController.getUserById(userId);
  if (!user) {
    loggerPrinter("ROLE VERIFIER", "User not found", "error");
  }
  return user.roleId === "Recruiter";
};