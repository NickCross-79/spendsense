import TopExpenses from "./TopExpenses";
import BudgetGraph from "./BudgetGraph";
import React, { useEffect, useState } from "react";
import SendRequest from "../../util/sendRequest.js";
import axios from 'axios';

const BudgetCard = (props) => {
    const [budgets, setBudgets] = useState(props.budgets);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseList, setExpenseList] = useState(null);
    const [expensePercentages, setPercentages] = useState(null);
    const [budgetDetails, setBudget] = useState(null);
    const [budgetIndex, setBudgetIndex] = useState(0);
    const [pending, setPending] = useState(true);
    
    useEffect(() => {
        

        async function funct() {
            const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS+'/budget/'+budgets[budgetIndex]._id+'/stats', {withCredentials: true});
            console.log("Budget card use effect: ",response.data);
            setBudget(response.data);
            setExpenseList(response.data.expenseList);
            setExpenseTypes(response.data.expenseTypes);
            setPercentages(response.data.expensePercentagesByType);
            setPending(false);
        }
        funct();
    }, [budgetIndex]);

    const handleLeftClick = () => {
        if(budgetIndex > 0) setBudgetIndex(budgetIndex-1);
    } 

    const handleRightClick = () => {
        if(budgetIndex < budgets.length - 1) setBudgetIndex(budgetIndex+1);
    } 
    
    return ( 
        <div className="budget-card_container">
            <button className="budget-card_left" onClick={handleLeftClick} />
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
                {!pending && <TopExpenses budgetId={props.budgetId} expenseList={expenseList} />}
                
                <div className="budget-card_graph">
                    {!pending && <BudgetGraph expenseTypes={expenseTypes} data={expensePercentages} />}
                </div>
            </div>
            <button className="budget-card_right" onClick={handleRightClick} />
        </div>
    );
}
//
export default BudgetCard;