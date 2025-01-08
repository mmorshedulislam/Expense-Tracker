import React from "react";
import { useGetLimitsQuery } from "@/lib/features/limitApi/limitApi";

interface Limit {
  category: string;
  limit: number;
}

interface LimitsResponse {
  data: Limit[];
}

const LimitBox: React.FC = () => {
  const { data } = useGetLimitsQuery<LimitsResponse>();

  return (
    <div className="limit-box">
      <h2 className="heading">Current Limits</h2>
      <div className="current-limit-area">
        {data?.data?.map((limit: Limit, idx: number) => (
          <div key={idx} className="current-limit-box">
            <h4>{limit.category}</h4>
            <span>${limit.limit || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitBox;
