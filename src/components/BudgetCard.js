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
        fetch(getBudget)
            .then(response => {
                return response.json();
            })
            .then(budget => {
                console.log('budget data:',budget);
                console.log('percentages',Object.keys(budget.expensePercentagesByType))
                setBudget(budget);
                setExpenseList(budget.expenseList);
                setExpenseTypes(budget.expenseTypes);
                setPercentages(budget.expensePercentagesByType);
                setPending(false);
            })
    }, [])
    
    return ( 
        <div className="budget-card">
            <h1>graph</h1>
            <div className="budget-card_total-budget">
                <h3>Total Budget</h3>
                <h1>${!pending && budgetDetails.incomeTotal}</h1>
            </div>
            {!pending && <TopExpenses budgetId={budgetId} expenseList={expenseList} />}
            
            <div className="budget-card-graph">
                {!pending && <BudgetGraph expenseTypes={expenseTypes} data={expensePercentages} />}
            </div>
        </div>
    );
}
//
export default BudgetCard;