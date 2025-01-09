import React from "react";
import UseProgressBar from "./common/UseProgressBar/UseProgressBar";
import { useGetCategoryUsagePercentQuery } from "@/lib/features/limitApi/expenseApi";

interface UsagePercentResponse {
  isLoading: boolean;
  data: Record<string, number>;
}

const LimitProgress: React.FC = () => {
  const { data, isLoading } =
    useGetCategoryUsagePercentQuery<UsagePercentResponse>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

  return (
    <div className="expense-limit progress-limit">
      <h2 className="heading">Limit Status</h2>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, idx) => (
          <UseProgressBar
            key={idx}
            progress={0}
            title="Loading..."
            isLoading={true}
          />
        ))
      ) : data?.data ? (
        Object.entries(data.data).map(([category, progress]) => (
          <UseProgressBar
            key={category}
            progress={Math.ceil(progress)}
            title={category}
            isLoading={false}
          />
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LimitProgress;
