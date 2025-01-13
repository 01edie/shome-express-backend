"use strict";
// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import { ArticleServices } from "../services/article.service";
// import { ServiceResponse } from "../services/ServiceResponse";
// import { ArticleCreateParams, ArticleUpdateParams } from "../types/request-params";
// export const createArticle = async (
//   req: Request<{}, {}, ArticleCreateParams>,
//   res: Response
// ): Promise<void> => {
//   // basic validations
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const validationRes = ServiceResponse.validationError(errors.array());
//     res.status(validationRes.statusCode).json(validationRes);
//     return;
//   }
//   const serviceRes = await ArticleServices.createArticle(req.body);
//   res.status(serviceRes.statusCode).json(serviceRes);
// };
// export const getArticleById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   console.log("Not Cached")
//   const serviceRes = await ArticleServices.getArticleById(id);
//   res.status(serviceRes.statusCode).json(serviceRes);
// };
// export const readArticles = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const serviceRes = await ArticleServices.getAllArticles();
//   res.status(serviceRes.statusCode).json(serviceRes);
// };
// export const updateArticle = async (
//   req: Request<{ id: string }, {}, ArticleUpdateParams>,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   // basic validations
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const validationRes = ServiceResponse.validationError(errors.array());
//     res.status(validationRes.statusCode).json(validationRes);
//     return;
//   }
//   const serviceRes = await ArticleServices.updateArticle(id, req.body);
//   res.status(serviceRes.statusCode).json(serviceRes);
// };
// export const deleteArticle = async (
//   req: Request<{ id: string }>,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const serviceRes = await ArticleServices.deleteArticle(id);
//   res.status(serviceRes.statusCode).json(serviceRes);
// };
