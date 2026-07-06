import * as plaid from 'plaid';
import PlaidTransactionRequestFlag from '../models/requestFlagModel.js';
import 'dotenv/config';

// Plaid config
const config = new plaid.Configuration({
    basePath: plaid.PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
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
        country_codes: (process.env.PLAID_COUNTRY_CODES || 'CA').split(','),
    };
    if(process.env.PLAID_REDIRECT_URI) request.redirect_uri = process.env.PLAID_REDIRECT_URI;
    if(process.env.PLAID_WEBHOOK_URL) request.webhook = process.env.PLAID_WEBHOOK_URL;

    try{
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        return createTokenResponse.data;
    }catch(err) {
        console.log("Failed to create link token")
        console.log(err);
        throw err;
    }
};

// Exchange public token for access token
const exchangePublicToken = async (publicToken) => {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken
    });
    return plaidResponse;
};

// Get transaction data. Pages through transactionsSync and returns the same
// shape the frontend has always consumed: accounts, transactions (newest
// first) and per-day amount totals.
const getTransactionData = async (transactionRequest, item_id) => {
    if(await checkFlag(item_id)){
        return false;
    }

    await PlaidTransactionRequestFlag.deleteOne({item_id: item_id});

    const transactions = [];
    let accounts = [];
    let cursor;
    let hasMore = true;
    while(hasMore){
        const response = await plaidClient.transactionsSync({
            access_token: transactionRequest.access_token,
            cursor: cursor,
            count: 500,
        });
        transactions.push(...response.data.added);
        accounts = response.data.accounts;
        hasMore = response.data.has_more;
        cursor = response.data.next_cursor;
    }

    transactions.sort((a, b) => b.date.localeCompare(a.date));

    const totalTransactionsByDay = {};
    transactions.forEach(transaction => {
        const day = parseInt(transaction.date.slice(-2));
        if(totalTransactionsByDay[day] === undefined){
            totalTransactionsByDay[day] = transaction.amount;
        } else {
            totalTransactionsByDay[day] += transaction.amount;
        }
    });

    return { accounts, transactions, totalTransactionsByDay };
}

async function checkFlag(item_id) {
    const flag = await PlaidTransactionRequestFlag.findOne({item_id: item_id, initial_hook_received: true, historical_hook_received: true}).exec();
    return flag === null;
}

const setPlaidTransactionRequestFlag = async (item_id) => {
    const existingFlag = await PlaidTransactionRequestFlag.findOne({item_id: item_id});

    if(existingFlag === null){
        const flag = new PlaidTransactionRequestFlag({
            item_id: item_id,
            initial_hook_received: false,
            historical_hook_received: false,
        });
        await flag.save();
    }
}

export default {
    generatePLinkToken,
    exchangePublicToken,
    getTransactionData,
    setPlaidTransactionRequestFlag
};
