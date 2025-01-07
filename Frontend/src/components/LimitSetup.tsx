import React from "react";
import { useForm } from "react-hook-form";

interface LimitFormInputs {
  Groceries: number;
  Transportation: number;
  Healthcare: number;
  Utility: number;
  Charity: number;
  Miscellaneous: number;
}

const LimitSetup: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<LimitFormInputs>();

  const handleLimitSetup = (data: LimitFormInputs) => {
    console.log("Category Limits Set:", data);
    // Example: Save limits to backend or state management
    reset();
  };

  return (
    <div className="expense-limit">
      <div>
        <h2 className="heading">Set Your Limits</h2>
        <form onSubmit={handleSubmit(handleLimitSetup)}>
          {[
            "Groceries",
            "Transportation",
            "Healthcare",
            "Utility",
            "Charity",
            "Miscellaneous",
          ].map((category) => (
            <div className="form-group" key={category}>
              <label htmlFor={category}>{category} Limit</label>
              <input
                id={category}
                type="number"
                placeholder={`Set ${category} limit`}
                {...register(category as keyof LimitFormInputs, {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
          <button type="submit">Save Limits</button>
        </form>
      </div>
    </div>
  );
};

export default LimitSetup;
