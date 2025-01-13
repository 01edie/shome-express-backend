"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./db/database");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_service_1 = __importDefault(require("./services/logger.service"));
const index_router_1 = __importDefault(require("./routes/v1/index.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:4173",
        "http://localhost:5173",
        "https://app-shome.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/api/v1", index_router_1.default);
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log("Database connected!");
    app.listen(+process.env.SERVER_PORT, () => console.log(`Server running on SERVER_PORT : ${process.env.SERVER_PORT}`));
    process.on("uncaughtException", (err) => {
        var _a;
        logger_service_1.default.error(`Uncaught Exception: ${(_a = err.stack) !== null && _a !== void 0 ? _a : err.message}`);
    });
    process.on("unhandledRejection", (reason) => {
        logger_service_1.default.error(`Unhandled Rejection: ${reason}`);
    });
})
    .catch((err) => console.error("Database connection failed:", err));
