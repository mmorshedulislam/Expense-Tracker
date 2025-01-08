import { useCreateLimitMutation } from "@/lib/features/limitApi/limitApi";
import { useHandleMutationEffect } from "@/lib/hooks/useHandleMutationEffect";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ExpenseFormInputs {
  category: string;
  limit: number;
}

const LimitSetup: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<ExpenseFormInputs>();

  const [createLimit, { isLoading, isError, error, isSuccess, data }] =
    useCreateLimitMutation();

  const handleLimit = (data: ExpenseFormInputs) => {
    createLimit(data);
  };
  useHandleMutationEffect({
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div className="expense-limit">
      <h2 className="heading">Set Your Monthly Limit</h2>
      <div>
        <form
          onSubmit={handleSubmit(handleLimit)}
          className="form-container limit-form"
        >
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
            <label htmlFor="limit">Limit</label>
            <input
              id="limit"
              type="number"
              placeholder="Enter amount"
              {...register("limit", { required: true, valueAsNumber: true })}
            />
          </div>

          <div className="form-group">
            <button type="submit">Set Limit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LimitSetup;
