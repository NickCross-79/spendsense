import { useState, useEffect } from 'react';

const BudgetStepThree = (props) => {

    const [expenseName, setExpenseName] = useState(sessionStorage.getItem('expenseName') || '');
    const [expenseType, setExpenseType] = useState(sessionStorage.getItem('expenseType') || '');
    const [expenseAmount, setExpenseAmount] = useState(sessionStorage.getItem('expenseAmount') || '0');
    const [expenseDate, setExpenseDate] = useState(sessionStorage.getItem('expenseDate') || '');


    useEffect(() => {
        sessionStorage.setItem('expenseName', expenseName);
        sessionStorage.setItem('expenseType', expenseType);
        sessionStorage.setItem('expenseAmount', expenseAmount);
        sessionStorage.setItem('expenseDate', expenseDate);
    }, [expenseName]);

    const handelAdd = () => {
        props.passFormData("three", {
            expenseName: expenseName,
            expenseType: expenseType,
            expenseAmount: expenseAmount,
            expenseDate: expenseDate
        });
    } 

    const handleClick = () => {
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <button className='create-budget_button' onClick={() => props.changeStep("last")} >
                Last Step</button>
            <div>
                <h1 className='create-budget_step_header'>
                What are your <span>Expenses</span>?</h1>

                <label>Expense Name</label>
                <input onChange={e => setExpenseName(e.target.value)} defaultValue={expenseName} />

                <label>Category</label>
                <select id='expenseTypeSelect' onChange={e => setExpenseType(e.target.value)} defaultValue={expenseType} >
                    <option value={''} />
                    <option value={'debt_repayment'}>Debt Repayment</option>
                    <option value={'entertainment'}>Entertainment</option>
                    <option value={'food'}>Food</option>
                    <option value={'healthcare'}>Healthcare</option>
                    <option value={'housing'}>Housing</option>
                    <option value={'personal_care'}>Personal Care</option>
                    <option value={'savings'}>Savings</option>
                    <option value={'taxes'}>Taxes</option>
                    <option value={'transportation'}>Transportation</option>
                    <option value={'other'}>Other</option>
                </select>

                <label>Amount</label>
                <div className='row' style={{marginLeft: '0px'}}>
                    <span style={{fontSize: '50px', marginTop: '5px'}}>$</span>
                    <input style={{width: '223px'}} onChange={e => setExpenseAmount(parseFloat(e.target.value))} defaultValue={expenseAmount} />
                </div>

                <label>Payment Date</label>
                <input className='create-budget_step_date' 
                    type={'date'} 
                    onChange={e => setExpenseDate(e.target.value)}
                    defaultValue={expenseDate} />

                <button className='create-budget_next' 
                    style={{marginTop: '0px', color: '#FFFFFF', background: '#8A4FFF'}}
                    onClick={handelAdd}>
                    Add</button>
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepThree;