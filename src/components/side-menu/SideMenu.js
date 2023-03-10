import AccountBalance from "./AccountBalance";
import ThisMonthsTransactions from "./ThisMonthsTransactions";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {usePlaidLink} from 'react-plaid-link';

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../../assets/images/icons', false, /\.(png|jpe?g|svg)$/));

const SideMenu = () => {

    const [linkToken, setLinkToken] = useState(null);
    const [publicToken, setPublicToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [transactionData, setTransactionData] = useState(null);

    const {open, ready} = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            console.log("Public token:",public_token, metadata);
            setPublicToken(public_token);
            const access_token = await axios.post('http://localhost:3001/plaid/exchange_public_token/'+public_token);
            console.log("Access token:",access_token,access_token.data);
            setAccessToken(access_token.data.access_token);
            setItemId(access_token.data.item_id)
        }
    });

    async function pollServer(){
        console.log("polling");
        const response = await axios.post('http://localhost:3001/user/transactions', {
                item_id: itemId,
                transactionRequest: {
                    access_token: accessToken,
                    start_date: '2022-01-01',
                    end_date: '2023-02-01'
                }
        });
        console.log("logic check:",response.data === false);
        console.log("transaction data:",response)
        if(response.data == false) setTimeout(pollServer,5000);
        else setTransactionData(response.data);;
    }

    useEffect(() => {
        const generateLinkToken = async () => {
            const response = await axios.post('http://localhost:3001/plaid/create_link_token/64056143a3f9df09bb5801a9');
            console.log("Link token:",response.data,response.data.link_token);
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

    return ( 
        <div className="side-menu">
            <button onClick={open}>Test Link Token</button>
            <p>Account</p>
            <img src={images['icon_profile_.png']} alt="Profile" />
            {transactionData != null && <AccountBalance balance={transactionData}/>}
            {transactionData != null && <ThisMonthsTransactions transactions={transactionData}/>}
        </div>
     );
}
 
export default SideMenu;