import logger from "../logger/logger";

export const loggerPrinter = (section: string, message: string, type?: string) => {
  type = type.toLowerCase();
  switch (type || "warn") {
    case "error":
      logger.error(`${section}: ${message}`);
      break;
    case "debug":
      logger.debug(`${section}: ${message}`);
      break;
    case "info":
      logger.info(`${section}: ${message}`);
      break;
    default:
      logger.warn(`${section}: ${message}`);
    break;
  }
};