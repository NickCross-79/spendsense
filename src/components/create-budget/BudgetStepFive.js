import stepFive from '../../assets/images/create-budget-steps/budget_step_five.png';

const BudgetStepFive = (props) => {

    const handleClick = () => {
        props.createBudget();
    }

    return ( 
        <div className="create-budget_step">
            <img className='create-budget_step_img' src={stepFive}></img>
            <div>
                <h1 className='create-budget_step_header'>
                    <span>Review</span> your Budget!</h1>

                <label>Name</label>
                <p>My Budget</p>

                <label>Timeline</label>
                <p>01/02/2023 - 01/03/2023</p>

                <div style={{marginLeft: '-150px'}} class='row'>
                    <div>
                        <label>Expenses</label>
                        <p>List</p>
                    </div>

                    <div>
                        <label>Incomes</label>
                        <p>List</p>
                    </div>
                </div>

                <button className='create-budget_next' 
                    style={{marginTop: '85px', color: '#FFFFFF', background: '#8A4FFF'}}
                    onClick={handleClick}>
                    Create</button>
            </div>
        </div>
     );
}

export default BudgetStepFive;