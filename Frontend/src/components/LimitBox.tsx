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
  const { data } = useGetLimitsQuery() as { data: LimitsResponse };

  return (
    <div className="limit-box">
      <h2 className="heading">Current Limits</h2>
      <div className="current-limit-area">
        {data?.data.map((limit) => (
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
