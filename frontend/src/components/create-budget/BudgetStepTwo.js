import { useState, useEffect } from 'react';

const BudgetStepTwo = (props) => {

    const [startDate, setStartDate] = useState(sessionStorage.getItem('startDate') || '');
    const [endDate, setEndDate] = useState(sessionStorage.getItem('endDate') || '');

    useEffect(() => {
        sessionStorage.setItem('startDate', startDate);
        sessionStorage.setItem('endDate', endDate);
    }, [startDate, endDate]);

    const handleClick = () => {
        props.passFormData("two", {
            startDate: startDate,
            endDate: endDate
        })
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            <button className='create-budget_button' onClick={() => props.changeStep("last")}>
                Last Step</button>
            <div>
                <h1 className='create-budget_step_header'>
                    What is the <span>Timeline</span>?</h1>
                <label>Start Date</label>
                <input className='create-budget_step_date' 
                    type={'date'} 
                    onChange={e => setStartDate(e.target.value)}
                    defaultValue={startDate} />
                <label>End Date</label>
                <input className='create-budget_step_date' 
                    type={'date'} 
                    onChange={e => setEndDate(e.target.value)}
                    defaultValue={endDate} />
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepTwo;