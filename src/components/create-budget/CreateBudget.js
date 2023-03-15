import BudgetStepOne from "./BudgetStepOne";
import BudgetStepTwo from "./BudgetStepTwo";
import BudgetStepThree from "./BudgetStepThree";
import BudgetStepFour from "./BudgetStepFour";
import BudgetStepFive from "./BudgetStepFive";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import sendRequest from "../../util/sendRequest";

const CreateBudget = () => {

    const [step, setStep] = useState(1);

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);

    const [budgetName, setBudgetName] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [expenseList, setExpenseList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);

    const changeStep = (command) => {
        switch(command) {
            case "next":
                setStep(step+1);
                break;
            case "last":
                if(step > 1)
                    setStep(step-1);
                break;
        }
    }

    const passFormData = (budgetStep, data) => {
        switch (budgetStep) {
            case 'one':
                setBudgetName(data.name);
                break;
            case 'two':
                setStartDate(data.startDate);
                setEndDate(data.endDate);
                break;
            case 'three':
                setExpenses([...expenses, data]);
                break;
            case 'four':
                setIncomes([...incomes, data]);
                break;
        }

        console.log(data);
    }

    const createBudget = async () => {

        // Create Expenses
        const expensePromises = expenses.map(async expense => {
            const response = await sendRequest.postReq('/expense/newExpense', expense);
            return response;
        });

        // Create Incomes
        const incomePromises = incomes.map(async income => {
            const response = await sendRequest.postReq('/income/newIncome', income);
            return response;
        });

        const expenseIds = await Promise.all(expensePromises);
        const incomeIds = await Promise.all(incomePromises);

        const budget = {
            budgetName: budgetName,
            startDate: startDate,
            endDate: endDate,
            expenses: expenseIds,
            incomes: incomeIds
        }

        console.log("budget: ",budget);

        // Create Budget
        await sendRequest.postReq('/budget/newBudget', budget)
    }

    return ( 
        <>
            <Nav />
            <div className="create-budget">
                {step == 1 && <BudgetStepOne changeStep={changeStep} passFormData={passFormData} />}
                {step == 2 && <BudgetStepTwo changeStep={changeStep} passFormData={passFormData} />}
                {step == 3 && <BudgetStepThree changeStep={changeStep} passFormData={passFormData} />}
                {step == 4 && <BudgetStepFour changeStep={changeStep} passFormData={passFormData} />}
                {step == 5 && <BudgetStepFive changeStep={changeStep} createBudget={createBudget} />}
            </div>
        </>
     );
}
 
export default CreateBudget;