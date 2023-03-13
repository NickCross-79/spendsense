import stepThree from '../../assets/images/create-budget-steps/budget_step_three.png';

const BudgetStepThree = () => {
    return ( 
        <div className="create-budget_step">
            <img className='create-budget_step_img' src={stepThree}></img>
            <div>
                <h1 className='create-budget_step_header'>
                What are your <span>Expenses</span>?</h1>

                <label>Expense Name</label>
                <input></input>

                <label>Category</label>
                <input></input>

                <label>Amount</label>
                <div className='create-budget_step_amount'>
                    <span id='test' style={{content: '$'}}/><input style={{width: '223px'}} />
                    <span id='test' style={{content: '.'}}/><input style={{width: '139px'}} />
                </div>
                

                <label>Payment Date</label>
                <input></input>
            </div>
            <button className='create-budget_next'>Next Step</button>
        </div>
     );
}
 
export default BudgetStepThree;