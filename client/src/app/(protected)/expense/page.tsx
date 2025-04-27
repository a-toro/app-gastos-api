import { CategoryExpenseform } from "@/components/expense/category-expense-form";
import ExpenseForm from "@/components/expense/expense-form";
import React from "react";

export default function ExpensePage() {
  return (
    <div className="w-full flex justify-center h-full bg-amber-400">
      <CategoryExpenseform />
      <ExpenseForm />
    </div>
  );
}
