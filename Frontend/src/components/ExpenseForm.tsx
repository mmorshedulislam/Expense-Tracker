import { useCreateExpenseMutation } from "@/lib/features/limitApi/expenseApi";
import { useHandleMutationEffect } from "@/lib/hooks/useHandleMutationEffect";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ExpenseFormInputs {
  category: string;
  purpose: string;
  amount: number;
}

const ExpenseForm: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<ExpenseFormInputs>();
  const [createExpense, { isLoading, isError, error, isSuccess, data }] =
    useCreateExpenseMutation();

  const handleExpense = (data: ExpenseFormInputs) => {
    createExpense(data);
  };

  useHandleMutationEffect({ isLoading, isError, error, isSuccess, data });
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div className="expense-form">
      <h2 className="heading">Add Your Expense</h2>
      <div>
        <form onSubmit={handleSubmit(handleExpense)} className="form-container">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register("category", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Groceries">Groceries</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Utility">Utility</option>
              <option value="Charity">Charity</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Purpose</label>
            <input
              id="purpose"
              type="text"
              placeholder="Enter purpose of expense"
              {...register("purpose", { required: true })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: true, valueAsNumber: true })}
            />
          </div>

          <div className="form-group">
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
