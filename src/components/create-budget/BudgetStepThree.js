import stepThree from '../../assets/images/create-budget-steps/budget_step_three.png';
import { useState } from 'react';

const BudgetStepThree = (props) => {

    const [expenseName, setExpenseName] = useState(null);
    const [expenseType, setExpenseType] = useState(null);
    const [expenseAmount, setExpenseAmount] = useState(null);
    const [expenseDate, setExpenseDate] = useState(null);

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
            <img className='create-budget_step_img' src={stepThree}></img>
            <div>
                <h1 className='create-budget_step_header'>
                What are your <span>Expenses</span>?</h1>

                <label>Expense Name</label>
                <input onChange={e => setExpenseName(e.target.value)} />

                <label>Category</label>
                <select id='expenseTypeSelect' onChange={e => setExpenseType(e.target.value)} >
                    <option value={'debt-repayment'}>Debt Repayment</option>
                    <option value={'entertainment'}>Entertainment</option>
                    <option value={'food'}>Food</option>
                    <option value={'healthcare'}>Healthcare</option>
                    <option value={'housing'}>Housing</option>
                    <option value={'personal-care'}>Personal Care</option>
                    <option value={'savings'}>Savings</option>
                    <option value={'taxes'}>Taxes</option>
                    <option value={'transportation'}>Transportation</option>
                    <option value={'other'}>Other</option>
                </select>

                <label>Amount</label>
                <div className='row' style={{marginLeft: '0px'}}>
                    <span style={{fontSize: '50px', marginTop: '5px'}}>$</span>
                    <input style={{width: '223px'}} onChange={e => setExpenseAmount(parseFloat(e.target.value))} />
                </div>

                <label>Payment Date</label>
                <input className='create-budget_step_date' type={'date'} onChange={e => setExpenseDate(e.target.value)} />

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