import { QueryTypes } from "sequelize";
import { models, sequelize } from "../db/database";
import { DealerAttributes, Labelone } from "../models/init-models";

import { WithUserCred } from "../types/request-params";
import { ServiceResponse } from "./ServiceResponse";
import { SetupServices } from "./setup.service";

type GetAllDealersRes = {
  dealers: Partial<DealerAttributes>[];
  setup: {
    useListOne?: number;
    listOneLabel?: string;
    useListTwo?: number;
    listTwoLabel?: string;
    useListThree?: number;
    listThreeLabel?: string;
    useListFour?: number;
    listFourLabel?: string;
  };
};

export class DealersServices {
  static async getAllDealers(
    params: WithUserCred<{}>
  ): Promise<ServiceResponse<GetAllDealersRes>> {
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

    const dealers = await sequelize.query(
      `
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
`,
      {
        replacements: { paintCompanyId },
        type: QueryTypes.SELECT,
      }
    );

    if (!dealers) {
      return ServiceResponse.notFound();
    }
    const setUp = await SetupServices.getSetup(params);
    const sData = setUp.data?.setup;

    const resData: GetAllDealersRes = {
      setup: {
        useListOne: sData?.useListOne,
        useListTwo: sData?.useListTwo,
        useListThree: sData?.useListThree,
        useListFour: sData?.useListFour,
        listOneLabel: sData?.listOneLabel,
        listTwoLabel: sData?.listTwoLabel,
        listThreeLabel: sData?.listThreeLabel,
        listFourLabel: sData?.listFourLabel,
      },
      dealers,
    };
    // console.log(resData.setup);

    return ServiceResponse.success(resData);
  }
}
