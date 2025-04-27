import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpenseCategoryRepository } from "../repository/expense-category-repository";
import prisma from "../../lib/prisma";

export const createExpenseCategory = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const expenseCategoryReposiroty = new ExpenseCategoryRepository(prisma);
    
  } catch (error) {
    next(error);
  }
};
