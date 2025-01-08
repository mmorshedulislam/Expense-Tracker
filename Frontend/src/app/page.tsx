"use client";

import ExpenseForm from "@/components/ExpenseForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import LimitBox from "@/components/LimitBox";
import LimitProgress from "@/components/LimitProgress";
import LimitSetup from "@/components/LimitSetup";
import { useGetMonthlySummaryQuery } from "@/lib/features/limitApi/expenseApi";

export default function Home() {
  const { data } = useGetMonthlySummaryQuery({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  return (
    <div>
      <div className="max-width">
        <h2 className="main-heading">Your Expense Tracker</h2>

        <div className="main-container">
          <div>
            <LimitSetup />
            <LimitProgress />
          </div>

          <div>
            <LimitBox />
            <ExpenseForm />
            <ExpenseSummary data={data?.data || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
