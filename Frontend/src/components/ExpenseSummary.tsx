import React, { useState } from "react";
import Modal from "./Modal";
import { useGetDailySummaryQuery } from "@/lib/features/limitApi/expenseApi";

interface ExpenseData {
  date: string;
  Utility?: number;
  Groceries?: number;
  Healthcare?: number;
  Transportation?: number;
  Charity?: number;
  Miscellaneous?: number;
  [key: string]: string | number | undefined;
}

const ExpenseSummary: React.FC<{ data: ExpenseData[] }> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    "Date",
    "Utility",
    "Groceries",
    "Healthcare",
    "Transportation",
    "Charity",
    "Miscellaneous",
  ];

  const { data: dailyData, isLoading: dailyDataLoading } =
    useGetDailySummaryQuery({
      category,
      day: date.day,
      month: date.month,
      year: date.year,
    });

  const fetchModalData = async (
    category: string,
    day: number,
    month: number,
    year: number
  ) => {
    setCategory(category);
    setDate({ day, month, year });
    setIsLoading(true);
  };

  const handleMouseOver = async (
    category: string,
    day: number,
    month: number,
    year: number
  ) => {
    // Fetch the data on mouse over
    await fetchModalData(category, day, month, year);
  };

  const handleCellClick = async () => {
    if (!dailyDataLoading && dailyData) {
      setModalTitle(`Details for ${category}`);
      setModalContent(dailyData?.data || []);
      setIsLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <div className="monthly-summary">
      <h2 className="heading">Monthly Summary</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                {headers.slice(1).map((header) => (
                  <td
                    key={header}
                    onMouseOver={() =>
                      handleMouseOver(
                        header,
                        new Date(row.date).getDate(),
                        new Date(row.date).getMonth() + 1,
                        new Date(row.date).getFullYear()
                      )
                    }
                    onClick={handleCellClick}
                    style={{ cursor: "pointer", color: "#4d6163" }}
                  >
                    {row[header] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalContent([]);
          setIsLoading(false);
        }}
        title={modalTitle}
        content={
          isLoading ? (
            <div>Loading...</div>
          ) : modalContent?.length > 0 ? (
            modalContent?.map((item, idx) => <div key={idx}>{item}</div>)
          ) : (
            <div>No data available</div>
          )
        }
      />
    </div>
  );
};

export default ExpenseSummary;
