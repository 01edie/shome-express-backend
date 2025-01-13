"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoarderService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
const init_models_1 = require("../models/init-models");
class BoarderService {
    // Create new Boarder
    static createBoarder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBoarder = yield database_1.models.Boarder.create(params);
                return ServiceResponse_1.ServiceResponse.successCreated({ id: newBoarder.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get all Boarders
    static getAllBoarders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boarders = yield database_1.models.Boarder.findAll();
                return ServiceResponse_1.ServiceResponse.success(boarders);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get Boarder by ID
    static getBoarderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boarder = yield database_1.models.Boarder.findByPk(id, {
                    include: [
                        {
                            model: init_models_1.BoarderDocuments,
                            as: "boarderDocuments",
                        },
                    ],
                });
                if (!boarder) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                return ServiceResponse_1.ServiceResponse.success(boarder);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Update an Boarder
    static updateBoarder(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boarder = yield database_1.models.Boarder.findByPk(id);
                if (!boarder) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                yield boarder.update(params);
                return ServiceResponse_1.ServiceResponse.successUpdated({ id: boarder.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
}
exports.BoarderService = BoarderService;
