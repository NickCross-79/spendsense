import TopExpenses from "./TopExpenses";
import BudgetGraph from "./BudgetGraph";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SendRequest from "../../util/sendRequest";

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_BACKEND_PORT_NUMBER;

const BudgetCard = (props) => {
    const [triggerMain, setTriggerMain] = useState(false);
    const [budgets, setBudgets] = useState(props.budgets);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseList, setExpenseList] = useState(null);
    const [expensePercentages, setPercentages] = useState(null);
    const [budgetDetails, setBudget] = useState(null);
    const [budgetIndex, setBudgetIndex] = useState(0);
    const [pending, setPending] = useState(true);
    
    useEffect(() => {
        async function funct() {
            const response = await axios.get(`${server}:${port}/budget/`+budgets[budgetIndex]._id+'/stats', {withCredentials: true});
            console.log("Budget card use effect: ",response.data);
            setBudget(response.data);
            setExpenseList(response.data.expenseList);
            setExpenseTypes(response.data.expenseTypes);
            setPercentages(response.data.expensePercentagesByType);
            setPending(false);
            console.log("Budget card budgets:", budgets);
        }
        funct();
    }, [budgetIndex]);

    useEffect(() => {
        setBudgets(props.budgets);
        setBudgetIndex(0);
        setTriggerMain(!triggerMain);
        console.log("trigger");
    }, [props]);

    const handleLeftClick = () => {
        if(budgetIndex > 0) setBudgetIndex(budgetIndex-1);
    } 

    const handleRightClick = () => {
        if(budgetIndex < budgets.length - 1) setBudgetIndex(budgetIndex+1);
        
    } 

    const handleDelete = async () => {
        await SendRequest.delReq('/budget/'+props.budgets[budgetIndex]._id);
        props.update();
        console.log("num of budgets",budgets.length)
    }
    
    return ( 
        <div className="column" id="budget-card_container">
                <div className="row">
                    <button id="budget-card_left" onClick={handleLeftClick} />
                    <div id="budget-card">
                        <div className="column" id="budget-card_graph">
                            <div style={{marginRight: '50px', marginTop: '300px'}}>
                                <h3 style={{fontWeight: 700, fontSize: 20, textAlign: "center", color: "rgba(0, 0, 0, 0.48)", margin: 0}}>
                                    Total Budget
                                </h3>
                                <h1 style={{fontWeight: 700, fontSize: 40, textAlign: "center", color: "black", margin: 0}}>
                                    ${!pending && budgetDetails.incomeTotal.toFixed(2)}
                                </h1>
                            </div>
                            {!pending && <BudgetGraph expenseTypes={expenseTypes} data={expensePercentages} />}
                        </div>

                        <h1 style={{position: 'relative',fontWeight: '700', fontSize: '39px', fontStyle: 'Semi Bold', right: 40, top: -20}}>{!pending && budgetDetails.budgetName}</h1>
                        {!pending && <TopExpenses budgetId={props.budgetId} expenseList={expenseList} />}
                        
                    </div>
                    <button id="budget-card_right" onClick={handleRightClick} />
                </div>
                <button className="button" id="budget-card_delete" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default BudgetCard;