import BudgetStepOne from "./BudgetStepOne";
import BudgetStepTwo from "./BudgetStepTwo";
import BudgetStepThree from "./BudgetStepThree";
import Nav from "../Nav";

const CreateBudget = () => {
    return ( 
        <>
            <Nav />
            <div className="create-budget">
                {/*<BudgetStepOne /><BudgetStepTwo />*/}
                <BudgetStepThree />
            </div>
        </>
     );
}
 
export default CreateBudget;