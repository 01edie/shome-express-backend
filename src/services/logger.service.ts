import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { loggingConfig } from "../config/logging";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const {
  fileName,
  datePatternLog,
  datePatternLogFile,
  durationMaxFiles,
  fileLoggingMaxSize,
  loggingFolder,
} = loggingConfig;
const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${loggingFolder}/${fileName}`,
  datePattern: datePatternLogFile,
  zippedArchive: true,
  maxSize: fileLoggingMaxSize,
  maxFiles: durationMaxFiles,
});

const logger = winston.createLogger({
  level: "info", 
  format: winston.format.combine(
    winston.format.timestamp({ format: datePatternLog }),
    logFormat
  ),
  transports: [new winston.transports.Console(), dailyRotateFileTransport],
});

export default logger;
