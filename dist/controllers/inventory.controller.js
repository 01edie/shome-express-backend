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
exports.assignInventoryItem = exports.getAllInventories = void 0;
const express_validator_1 = require("express-validator");
const ServiceResponse_1 = require("../services/ServiceResponse");
const inventory_service_1 = require("../services/inventory.service");
const getAllInventories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRes = yield inventory_service_1.InventoryService.getAllInventories();
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getAllInventories = getAllInventories;
const assignInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request body
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const { id: inventoryId } = req.params;
    if (!+inventoryId) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid id");
        res.status(response.statusCode).json(response);
        return;
    }
    const { quantityToAssign, boarderId, employeeId } = req.body;
    // Ensure only one of boarderId or employeeId is provided
    if ((!boarderId && !employeeId) || (boarderId && employeeId)) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Provide either boarderId or employeeId, but not both.");
        res.status(response.statusCode).json(response);
        return;
    }
    try {
        const serviceRes = yield inventory_service_1.InventoryService.assignInventoryItem(+inventoryId, {
            quantityToAssign,
            boarderId,
            employeeId,
        });
        res.status(serviceRes.statusCode).json(serviceRes);
    }
    catch (err) {
        const response = ServiceResponse_1.ServiceResponse.serverError("Error assigning inventory.");
        res.status(response.statusCode).json(response);
    }
});
exports.assignInventoryItem = assignInventoryItem;
