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
exports.DealersServices = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const ServiceResponse_1 = require("./ServiceResponse");
const setup_service_1 = require("./setup.service");
class DealersServices {
    static getAllDealers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { paintCompanyId } = params;
            console.log({ paintCompanyId });
            // const dealers= await models.Dealer.findAll({
            //   where: { paintCompanyId },
            //   attributes: [
            //     "dealerId",
            //     "dealerName",
            //     "dealerCode",
            //     "contactName",
            //     "contactPhone",
            //     "contactEmail",
            //   ],
            //   include: {
            //     model: Labelone,
            //     on: {
            //       attribute: "labelOneId",
            //       comparator: "=",
            //       value: sequelize.col("labelone.id"),
            //     },
            //     attributes: ["listName"],
            //   },
            // });
            const dealers = yield database_1.sequelize.query(`
  SELECT 
    d.dealerId,
    d.dealerName,
    d.dealerCode,
    d.contactName,
    d.contactPhone,
    d.contactEmail,
    l1.listName as listOneName,
    l2.listName as listTwoName,
    l3.listName as listThreeName,
    l4.listName as listFourName
  FROM dealer d
  LEFT JOIN labelone l1 ON d.labelOneId = l1.id
  LEFT JOIN labeltwo l2 ON d.labelTwoId = l2.id
  LEFT JOIN labelthree l3 ON d.labelThreeId = l3.id
  LEFT JOIN labelfour l4 ON d.labelFourId = l4.id
  WHERE d.paintCompanyId = :paintCompanyId
`, {
                replacements: { paintCompanyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (!dealers) {
                return ServiceResponse_1.ServiceResponse.notFound();
            }
            const setUp = yield setup_service_1.SetupServices.getSetup(params);
            const sData = (_a = setUp.data) === null || _a === void 0 ? void 0 : _a.setup;
            const resData = {
                setup: {
                    useListOne: sData === null || sData === void 0 ? void 0 : sData.useListOne,
                    useListTwo: sData === null || sData === void 0 ? void 0 : sData.useListTwo,
                    useListThree: sData === null || sData === void 0 ? void 0 : sData.useListThree,
                    useListFour: sData === null || sData === void 0 ? void 0 : sData.useListFour,
                    listOneLabel: sData === null || sData === void 0 ? void 0 : sData.listOneLabel,
                    listTwoLabel: sData === null || sData === void 0 ? void 0 : sData.listTwoLabel,
                    listThreeLabel: sData === null || sData === void 0 ? void 0 : sData.listThreeLabel,
                    listFourLabel: sData === null || sData === void 0 ? void 0 : sData.listFourLabel,
                },
                dealers,
            };
            // console.log(resData.setup);
            return ServiceResponse_1.ServiceResponse.success(resData);
        });
    }
}
exports.DealersServices = DealersServices;
