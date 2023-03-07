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

    const handleClick = () => {
        axios.post('http://localhost:3001/plaid/create_link_token/64056143a3f9df09bb5801a9')
            .then(res => {
                console.log(res.data);
                setLinkToken(res.data.link_token);
            })
    }

    return ( 
        <div className="side-menu">
            <button onClick={handleClick}>Test Link Token</button>
            <p>Account</p>
            <img src={images['icon_profile_.png']} alt="Profile" />
            <AccountBalance />
        </div>
     );
}
 
export default SideMenu;