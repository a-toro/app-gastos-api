import { ExpenseCategory, PrismaClient } from "@prisma/client";
import { Repository } from "./repository";
import prisma from "../../lib/prisma";

export class ExpenseCategoryRepository implements Repository<ExpenseCategory> {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }
  async create(model: ExpenseCategory) {
    await prisma.expenseCategory.create({
      data: { name: model.name, userId: model.userId },
    });
  }
  async getById(id: number): Promise<ExpenseCategory | null> {
    return await prisma.expenseCategory.findUnique({
      where: { id },
    });
  }
  getAll(): Promise<ExpenseCategory[]> {
    return prisma.expenseCategory.findMany();
  }
  update(id: number, model: Partial<ExpenseCategory>): void {
    prisma.expenseCategory.update({
      where: { id },
      data: {
        ...model,
      },
    });
  }
  delete(id: number): void {
    prisma.expenseCategory.delete({ where: { id } });
  }
}
