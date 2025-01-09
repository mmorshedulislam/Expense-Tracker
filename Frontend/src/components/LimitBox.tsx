import React from "react";
import { useGetLimitsQuery } from "@/lib/features/limitApi/limitApi";

interface Limit {
  _id: string;
  category: string;
  limit: number;
  month: number;
  year: number;
}

interface LimitsResponse {
  success: boolean;
  data: Limit[];
}

const LimitBox: React.FC = () => {
  // Explicitly typing `useGetLimitsQuery` to expect a `LimitsResponse`
  const { data, isLoading } = useGetLimitsQuery() as {
    data: LimitsResponse;
    isLoading: boolean;
  };

  return (
    <div className="limit-box">
      <h2 className="heading">Current Limits</h2>
      <div className="current-limit-area">
        {isLoading
          ? // Skeleton loader for loading state
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="current-limit-box skeleton">
                <div className="skeleton-title"></div>
                <div className="skeleton-value"></div>
              </div>
            ))
          : // Render actual data when loading is complete
            data?.data.map((limit) => (
              <div key={limit._id} className="current-limit-box">
                <h4>{limit.category}</h4>
                <span>${limit.limit || 0}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LimitBox;
