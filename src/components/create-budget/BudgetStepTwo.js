import stepTwo from '../../assets/images/create-budget-steps/budget_step_two.png';

const BudgetStepTwo = (props) => {

    const handleClick = () => {
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <img className='create-bugget_step_img' src={stepTwo}></img>
            <div>
                <h1 className='create-budget_step_header'>
                    What is the <span>Timeline</span>?</h1>
                <label>Start Date</label>
                <input className='create-budget_step_date' type={'date'} />
                <label>End Date</label>
                <input className='create-budget_step_date' type={'date'} />
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepTwo;