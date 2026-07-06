import { useEffect, useState } from 'react';

const BudgetStepOne = (props) => {

    const [name, setName] = useState(sessionStorage.getItem('name') || '');

    useEffect(() => {
        sessionStorage.setItem('name', name);
    }, [name]);

    const handleClick = () => {
        props.passFormData("one", {name: name});
        props.changeStep("next");
    }

    return ( 
        <div className="create-budget_step">
            
            <div>
                <h1 className='create-budget_step_header'>
                What is the <span>Name</span> of your Budget?</h1>
                <label>Name</label>
                <input onChange={e => setName(e.target.value)} defaultValue={name} />
            </div>
            <button className='create-budget_next' onClick={handleClick}>
                Next Step</button>
        </div>
     );
}
 
export default BudgetStepOne;