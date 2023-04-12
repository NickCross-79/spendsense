import AccountBalance from "./AccountBalance";
import ThisMonthsTransactions from "./ThisMonthsTransactions";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {usePlaidLink} from 'react-plaid-link';

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_BACKEND_PORT_NUMBER;

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../../assets/images/icons', false, /\.(png|jpe?g|svg)$/));

const SideMenu = () => {

    const [linkToken, setLinkToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [totalTransactionsByDay, setTotalTransactionsByDay] = useState(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
            const generateLinkToken = async () => {
                const response = await axios.post(`${server}:${port}/plaid/create_link_token/64056143a3f9df09bb5801a9`);
                setLinkToken(response.data.link_token);
            }
            generateLinkToken();
        }, []);

    useEffect(() => {
        async function call(){
            if(itemId != null){
                await pollServer();
            }
        }
        call();
    }, [itemId]);

    const {open, ready} = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            console.log("Public token:",public_token, metadata);
            const access_token = await axios.post(`${server}:${port}/plaid/exchange_public_token/`+public_token);
            console.log("Access token:",access_token,access_token.data);
            setAccessToken(access_token.data.access_token);
            setItemId(access_token.data.item_id)
            setPending(true);
        }
    });

    async function pollServer(){
        console.log("polling");
        const response = await axios.post(`${server}:${port}/user/transactions`, {
                item_id: itemId,
                transactionRequest: {
                    access_token: accessToken,
                    start_date: '2023-03-01',
                    end_date: '2023-03-18'
                }
        });
        if(response.data == false) setTimeout(pollServer,5000);
        else {
            console.log("plaid transaction response:",response);
            setPending(false);
            setTotalTransactionsByDay(response.data.totalTransactionsByDay);
            setTransactionData(response.data)
        };
    }

    

    return ( 
        <div className="side-menu">
            <img src={images['icon_profile_.png']} alt="Profile" />
            <p>Account</p>
            {transactionData == null && <button onClick={open}>Connect Bank Account</button>}
            {transactionData != null && <AccountBalance balance={transactionData}/>}
            {transactionData != null && <ThisMonthsTransactions transactions={transactionData} transactionsByDay={totalTransactionsByDay} />}
            {pending == true && <h1>Please wait, this may take a minute!</h1>}
        </div>
     );
}
 
export default SideMenu;