import ExpenseItem from "./ExpenseItem";
import React, { useEffect, useState } from "react";

const TopExpenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const id = "640379504ae2f7ce45cd68c7";
  const getExpenseIds = "http://localhost:3001/budget/" + id + "/expenses";
  const getExpenseById = "http://localhost:3001/expense/";

  useEffect(() => {
    fetch(getExpenseIds)
      .then((response) => {
        return response.json();
      })
      .then((expenseIds) => {
        const fetchExpensePromises = expenseIds.map((expenseId) => {
          return fetch(getExpenseById + expenseId).then((response) => {
            return response.json();
          });
        });

        Promise.all(fetchExpensePromises).then((data) => {
          setExpenseData(data);
        });
      });
  }, []);

  return (
    <div className="top-expenses">
      <h2>Top Expenses</h2>
      {Array.isArray(expenseData) &&
        expenseData
        .slice(0,5)
        .map((expense) => {
            return <ExpenseItem expense={expense} />;
        })}
    </div>
  );
};

export default TopExpenses;
