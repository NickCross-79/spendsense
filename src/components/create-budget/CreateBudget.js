import BudgetStepOne from "./BudgetStepOne";
import Nav from "../Nav";

const CreateBudget = () => {
    return ( 
        <>
            <Nav />
            <div className="create-budget">
                <BudgetStepOne />
            </div>
        </>
     );
}
 
export default CreateBudget;