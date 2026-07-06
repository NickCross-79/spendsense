import * as plaid from 'plaid';
import PlaidTransactionRequestFlag from '../models/requestFlagModel.js';
import 'dotenv/config';

// Plaid config
const config = new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET_KEY
      },
    },
  });
  
// Create new PlaidAPI client
const plaidClient = new plaid.PlaidApi(config);

// Generate new plaid link token
const generatePLinkToken = async (userId) => {
    const request = {
        user: {
            client_user_id: userId,
        },
        client_name: 'SpendSense',
        products: ['transactions'],
        language: 'en',
        redirect_uri: 'https://localhost:3001/',
        country_codes: ['CA'],
        webhook: 'https://34af-76-67-67-120.ngrok-free.app/plaid/webhook'

    };
    try{
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        return createTokenResponse.data;
    }catch(err) {
        console.log("Failed to create link token")
        console.log(err);
    }
};

// Exchnage public token for access token
const exchangePublicToken = async (publicToken) => {
    try{
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });
        return plaidResponse;
    } catch (err) {
        console.log("Failed to exchange public token");
    }
};

// Get transaction data
const getTransactionData = async (transactionRequest, item_id) => {
    try {
        const totalTransactionsByDay = {};
        if(await checkFlag(item_id)){
            return false;
        } else {
            await PlaidTransactionRequestFlag.deleteOne({item_id: item_id});
            const response = await plaidClient.transactionsGet(transactionRequest);
            response.data.transactions.forEach(transaction => {
                if(!totalTransactionsByDay.hasOwnProperty(transaction.date.slice(-2))){
                    totalTransactionsByDay[parseInt(transaction.date.slice(-2))] = transaction.amount;
                } else {
                    totalTransactionsByDay[parseInt(transaction.date.slice(-2))] += transaction.amount;
                }
            });

            response.data.totalTransactionsByDay = totalTransactionsByDay;
            return response.data;
        }
        
    } catch (err) {
        console.log("Failed to fetch transaction data");
        console.log(err);
    }
}

async function checkFlag(item_id) {
    const flag = await PlaidTransactionRequestFlag.findOne({item_id: item_id, initial_hook_received: true, historical_hook_received: true}).exec();
    return flag === null;
}

const setPlaidTransactionRequestFlag = async (item_id) => {
    try {
        
        const existingFlag = await PlaidTransactionRequestFlag.findOne({item_id: item_id});
        
        if(existingFlag === null){
            const flag = new PlaidTransactionRequestFlag({
                item_id: item_id,
                initial_hook_received: false,
                historical_hook_received: false,
            });
            console.log("New flag, item id: "+item_id);
            await flag.save();
        }
    } catch (err) {
        console.log("Failed to create transaction request flag", err);
    }
}

export default {
    generatePLinkToken,
    exchangePublicToken,
    getTransactionData,
    setPlaidTransactionRequestFlag
};