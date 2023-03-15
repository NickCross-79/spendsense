import ExpenseItem from "./ExpenseItem";
import React, { useEffect, useState } from "react";

const TopExpenses = (props) => {
  const [expenseData, setExpenseData] = useState([]);
  const getExpenseIds = "http://localhost:3001/budget/" + props.budgetId + "/expenses";
  const getExpenseById = "http://localhost:3001/expense/";

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
            console.log("Sorted data: ",data);
            setExpenseData(sortedData);
        })
  }, [props]);

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
