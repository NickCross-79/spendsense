import stepOne from '../../assets/images/create-budget-steps/budget_step_one.png';

const BudgetStepOne = (props) => {

    const handleClick = () => {
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <img className='create-bugget_step_img' src={stepOne}></img>
            <div>
                <h1 className='create-budget_step_header'>
                What is the <span>Name</span> of your Budget?</h1>
                <label>Name</label>
                <input></input>
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepOne;