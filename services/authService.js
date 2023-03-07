import 'dotenv/config';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import * as plaid from 'plaid';

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

const saltRounds = parseInt(process.env.SALTROUNDS);

const hashPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
            if(err) {
                reject(err);
            }
            resolve(hash);
        });
    });
};

const generatePLinkToken = async (userId) => {
    const request = {
        user: {
            client_user_id: userId,
        },
        client_name: 'SpendSense',
        products: ['auth'],
        language: 'en',
        redirect_uri: 'http://localhost:3001/',
        country_codes: ['CA'],

    };
    try{
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        return createTokenResponse.data;
    }catch(err) {
        console.log("Failed to create link token")
        console.log(err);
    }
};

const exchangePublicToken = async (publicToken) => {
    try{
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });
        return plaidResponse.data.access_token;
    } catch (err) {
        console.log("Failed to exchange public token");
    }
}

export default {
    hashPassword,
    generatePLinkToken,
    exchangePublicToken
};