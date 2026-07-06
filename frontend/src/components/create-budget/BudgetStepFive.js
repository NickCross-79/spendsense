const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_FRONTEND_PORT_NUMBER;

const BudgetStepFive = (props) => {

    const handleClick = async () => {
        sessionStorage.clear();
        await props.createBudget();
        window.location.replace(`${server}:${port}/overview`);
    }

    return ( 
        <div className="create-budget_step">
            <button className='create-budget_button' onClick={() => props.changeStep("last")}>
                Last Step</button>
            <div>
                <h1 className='create-budget_step_header'>
                    <span>Review</span> your Budget!</h1>

                <label>Name</label>
                <p>{sessionStorage.getItem('name')}</p>

                <label>Timeline</label>
                <p>{sessionStorage.getItem('startDate')} to {sessionStorage.getItem('endDate')}</p>

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