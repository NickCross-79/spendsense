import ExpenseItem from "./ExpenseItem";
import React, { useEffect, useState } from "react";

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_BACKEND_PORT_NUMBER;

const TopExpenses = (props) => {
  const [expenseData, setExpenseData] = useState([]);
  const getExpenseIds = `${server}:${port}/budget/` + props.budgetId + "/expenses";
  const getExpenseById = `${server}:${port}/expense/`;

  useEffect(() =>{
    const fetchExpensePromises = props.expenseList.map(expenseId => {
        return fetch(getExpenseById + expenseId)
            .then(response => {
                return response.json();
            });
    });

    Promise.all(fetchExpensePromises)
        .then(data => {
            const sortedData = data.sort((a,b) => b.expenseAmount - a.expenseAmount);
            setExpenseData(sortedData);
        })
  }, [props]);

  return (
    <div id="top-expenses">
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
