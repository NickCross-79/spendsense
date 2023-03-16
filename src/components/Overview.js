import BudgetCard from './budget-card/BudgetCard';
import SideMenu from './side-menu/SideMenu';
import Nav from './Nav';
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
        <>  
            <Nav />
            {budgets != null && budgets.length > 0 && <BudgetCard budgets={budgets} />}
            <SideMenu />
        </>
    );
}
 
export default Overview;