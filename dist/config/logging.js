"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingConfig = void 0;
exports.loggingConfig = {
    fileLoggingMaxSize: "20m",
    durationMaxFiles: "30d",
    datePatternLogFile: "YYYY-MM-DD",
    datePatternLog: "YYYY-MM-DD HH:mm:ss",
    fileName: "app-%DATE%.log",
    loggingFolder: "logs",
};
