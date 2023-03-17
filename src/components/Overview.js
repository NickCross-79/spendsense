import BudgetCard from './budget-card/BudgetCard';
import SideMenu from './side-menu/SideMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
    const [budgets, setBudgets] = useState(null);

    useEffect(() => {
        // Returns array of JSON objects with single _id field
        async function asyncFunc () {
            const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS+'/user/budgets', {withCredentials: true});
            console.log("Budgets overview: ",response.data);
            setBudgets(response.data);
        }
        asyncFunc();

    }, []);

    return ( 
        
            <div className='column' id='overview'>
                <h1 id='overview_header' >Welcome Back <span>Name</span></h1>
                {budgets != null && budgets.length > 0 && <BudgetCard budgets={budgets} />}
                <SideMenu />
            </div>
    
    );
}
 
export default Overview;