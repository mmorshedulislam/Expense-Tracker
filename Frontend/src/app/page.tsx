"use client";

import UseProgressBar from "@/components/common/UseProgressBar/UseProgressBar";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import LimitSetup from "@/components/LimitSetup";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className="max-width">
        <h2 className="main-heading">Your Expense Tracker</h2>
        <UseProgressBar progress={260 / 10} title="Groceries" />
        <div className="main-container">
          <div>
            <LimitSetup />
          </div>

          <div>
            <ExpenseForm />
            <ExpenseSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
