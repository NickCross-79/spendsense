import BudgetCard from './budget-card/BudgetCard';
import SideMenu from './side-menu/SideMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import sendRequest from '../util/sendRequest';

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_BACKEND_PORT_NUMBER;

const Overview = () => {

    const [update, setUpdate] = useState(false);
    const [budgets, setBudgets] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Returns array of JSON objects with single _id field
        async function asyncFunc () {
            const user = await sendRequest.getReq('/user', {withCredentials: true});
            const response = await axios.get(`${server}:${port}/user/budgets`, {withCredentials: true});
            setBudgets(response.data);
            setUser(user);
        }
        asyncFunc();

    }, [update]);

    const updateComponent = () => {
        setUpdate(!update);
        console.log("update", update)
    }

    return ( 
        
            <div className='column' id='overview'>
                <h1 id='overview_header' >Welcome Back <span>{user != null && user.firstName}</span></h1>
                {budgets != null && budgets.length > 0 && <BudgetCard budgets={budgets} update={updateComponent} />}
                <SideMenu />
            </div>
    
    );
}
 
export default Overview;