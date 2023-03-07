import AccountBalance from "./AccountBalance";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {usePlaidLink} from 'react-plaid-link';

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../../icons', false, /\.(png|jpe?g|svg)$/));

const SideMenu = () => {

    const [linkToken, setLinkToken] = useState(null);
    const [publicToken, setPublicToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const {open, ready} = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            console.log("Public token:",public_token, metadata);
            setPublicToken(public_token);
            const access_token = await axios.post('http://localhost:3001/plaid/exchange_public_token/'+public_token);
            console.log(access_token.data);
            setAccessToken(access_token.data);

        }
    });

    useEffect(() => {
        const generateLinkToken = async () => {
            const response = await axios.post('http://localhost:3001/plaid/create_link_token/64056143a3f9df09bb5801a9');
            console.log(response.data.link_token);
            setLinkToken(response.data.link_token);
        }
        generateLinkToken();
    }, []);

    return ( 
        <div className="side-menu">
            <button onClick={open}>Test Link Token</button>
            <p>Account</p>
            <img src={images['icon_profile_.png']} alt="Profile" />
            <AccountBalance />
        </div>
     );
}
 
export default SideMenu;