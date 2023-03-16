import stepTwo from '../../assets/images/create-budget-steps/budget_step_two.png';
import { useState } from 'react';

const BudgetStepTwo = (props) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleClick = () => {
        props.passFormData("two", {
            startDate: startDate,
            endDate: endDate
        })
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <img className='create-bugget_step_img' src={stepTwo}></img>
            <button className='create-budget_button' onClick={() => props.changeStep("last")}>
                Last Step</button>
            <div>
                <h1 className='create-budget_step_header'>
                    What is the <span>Timeline</span>?</h1>
                <label>Start Date</label>
                <input className='create-budget_step_date' type={'date'} onChange={e => setStartDate(e.target.value)} />
                <label>End Date</label>
                <input className='create-budget_step_date' type={'date'} onChange={e => setEndDate(e.target.value)} />
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepTwo;