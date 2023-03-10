import TopExpenses from "./TopExpenses";
import BudgetGraph from "./BudgetGraph";
import React, { useEffect, useState } from "react";

const budgetId = "64056144a3f9df09bb5801aa";

const BudgetCard = () => {
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseList, setExpenseList] = useState(null);
    const [expensePercentages, setPercentages] = useState(null);
    const [budgetDetails, setBudget] = useState(null);
    const getBudget = 'http://localhost:3001/budget/'+budgetId+'/stats';
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetch(getBudget, {method: 'GET', credentials: 'include'})
            .then(response => {
                return response.json();
            })
            .then(budget => {
                console.log('budget data:',budget);
                setBudget(budget);
                setExpenseList(budget.expenseList);
                setExpenseTypes(budget.expenseTypes);
                setPercentages(budget.expensePercentagesByType);
                setPending(false);
            })
    }, [])
    
    return ( 
        <div className="budget-card">
            <h1>{!pending && budgetDetails.budgetName}</h1>
            <div className="budget-card_total-budget">
                <h3 style={{fontWeight: 700, fontSize: 20, textAlign: "center", color: "rgba(0, 0, 0, 0.48)", margin: 0, padding: 7}}>
                    Total Budget
                </h3>
                <h1 style={{fontWeight: 700, fontSize: 40, textAlign: "center", color: "black", margin: 0}}>
                    ${!pending && budgetDetails.incomeTotal}
                </h1>
            </div>
            {!pending && <TopExpenses budgetId={budgetId} expenseList={expenseList} />}
            
            <div className="budget-card_graph">
                {!pending && <BudgetGraph expenseTypes={expenseTypes} data={expensePercentages} />}
            </div>
        </div>
    );
}
//
export default BudgetCard;