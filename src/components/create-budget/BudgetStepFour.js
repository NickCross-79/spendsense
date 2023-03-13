import stepFour from '../../assets/images/create-budget-steps/budget_step_four.png';

const BudgetStepFour = (props) => {

    const handleClick = () => {
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <img className='create-budget_step_img' src={stepFour}></img>
            <div>
                <h1 className='create-budget_step_header'>
                What are your <span>Incomes</span>?</h1>

                <label>Income Name</label>
                <input></input>

                <label>Category</label>
                <select id='incomeTypeSelect'>
                    <option value={'alimony_child-support'}>Alimony/Child Support</option>
                    <option value={'freelance_side-hustle'}>Freelance/Side Hustle</option>
                    <option value={'gift_windfall'}>Gift/Windfall</option>
                    <option value={'government-benefits'}>Government Benefits</option>
                    <option value={'investment'}>Investment</option>
                    <option value={'rental'}>Rental</option>
                    <option value={'salary_wage'}>Salary/Wage</option>
                    <option value={'other'}>Other</option>
                </select>

                <label>Amount</label>
                <div className='row' style={{marginLeft: '0px'}}>
                    <span style={{fontSize: '50px', marginTop: '5px'}}>$</span>
                    <input style={{width: '223px'}} />
                </div>

                <div className='row' style={{marginLeft: '-120px'}}>
                    <div>
                        <label>Next Payment Date</label>
                        <input className='create-budget_step_date' type={'date'} />
                    </div>

                    <div>
                        <label>Payment Frequency</label>
                        <select id='incomeTypeSelect'>
                            <option value={'weekly'}>Weekly</option>
                            <option value={'bi-weekly'}>Bi-weekly</option>
                            <option value={'monthly'}>Monthly</option>
                            <option value={'quarterly'}>Quarterly</option>
                            <option value={'bi-annual'}>Vi-annual</option>
                            <option value={'annual'}>Annual</option>
                        </select>
                    </div>
                </div>

                <button className='create-budget_next' style={{marginTop: '0px', color: '#FFFFFF', background: '#8A4FFF'}}>
                    Add</button>
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepFour;