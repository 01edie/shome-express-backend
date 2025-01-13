"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logging_1 = require("../config/logging");
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
const { fileName, datePatternLog, datePatternLogFile, durationMaxFiles, fileLoggingMaxSize, loggingFolder, } = logging_1.loggingConfig;
const dailyRotateFileTransport = new winston_daily_rotate_file_1.default({
    filename: `${loggingFolder}/${fileName}`,
    datePattern: datePatternLogFile,
    zippedArchive: true,
    maxSize: fileLoggingMaxSize,
    maxFiles: durationMaxFiles,
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: datePatternLog }), logFormat),
    transports: [new winston_1.default.transports.Console(), dailyRotateFileTransport],
});
exports.default = logger;
