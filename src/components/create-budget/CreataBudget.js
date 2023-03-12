import { Button } from "bootstrap";

const CreateBudget = () => {
    return ( 
        <div className="create-budget">
            <form className="create-budget_form">
                <h1>Create Your New Budget!</h1>
                <div className="row">
                    <div className="column">
                        <label>Budget Name</label>
                        <input></input>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <label>Start Date</label>
                        <input style={{width: '118px'}} />
                    </div>

                    <div className="column">
                        <label>End Date</label>
                        <input style={{width: '118px'}} />
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <label>Add Expenses</label>
                        <button>Choose Existing Expense</button>
                        <input></input>
                        
                    </div>
                    <button style={{fontSize: '29px', marginTop: '35px'}}>+</button>
                </div>

                <div className="row">
                    <div className="column">
                        <label>Add Incomes</label>
                        <button>Choose Existing Expense</button>
                        <input></input>   
                    </div>
                     <button style={{fontSize: '29px', marginTop: '35px'}}>+</button>
                    
                </div>
                <button style={{marginTop: "20px", marginBottom: '20px'}}>Create</button>
                
            </form>
        </div>
     );
}
 
export default CreateBudget;