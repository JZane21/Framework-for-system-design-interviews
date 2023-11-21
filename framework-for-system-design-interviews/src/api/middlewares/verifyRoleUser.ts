import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";

//async
export const verifyRole = (idUser: string, userController: any) => {
  const user = userController || undefined;
  if (!user) {
    loggerPrinter("ROLE VERIFIER", "User not found", "error");
  }
  return user.roleId === "Recruiter";
};