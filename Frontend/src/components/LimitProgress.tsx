import React from "react";
import UseProgressBar from "./common/UseProgressBar/UseProgressBar";
import { useGetCategoryUsagePercentQuery } from "@/lib/features/limitApi/expenseApi";

const LimitProgress = () => {
  const { data } = useGetCategoryUsagePercentQuery({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  return (
    <div className="expense-limit progress-limit">
      <h2 className="heading">Limit Status</h2>
      {Object.entries(data?.data || {}).map(([category, progress]) => (
        <UseProgressBar
          key={category}
          progress={Math.ceil(progress as number)}
          title={category}
        />
      ))}
    </div>
  );
};

export default LimitProgress;
