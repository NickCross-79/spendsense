import UserService from '../services/userService.js';
import PlaidService from '../services/plaidService.js';
import AuthService from '../services/authService.js';

// Register new user
const registerUser = async (req, res) => {
  console.log("Register new user");
  await UserService.registerUser(req.body);
  res.sendStatus(200);
}

// Get user by _id
const getUserDetails = async (req, res) => {
  UserService.getUserDetails(req.decodedToken.userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
}

// Get all budgets by user _id
const getAllBudgets = (req, res) => {
  UserService.getAllBudgets(req.decodedToken.userId)
    .then(budgetList => {
      res.status(200).json(budgetList);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

// Plaid link token generation
const generatePLinkToken = async (req, res) => {
  const response = await PlaidService.generatePLinkToken(req.params.userId);
  res.status(200).json(response)
}

// Exchange Plaid public token for access token
const exchangePublicToken = async (req, res) => {
  try {
    const access_token = await PlaidService.exchangePublicToken(req.params.pubtoken);
    res.status(200).json(access_token.data);
  } catch (err) {
    console.log("Failed to call plaid service for enchangePublicToken", err)
    res.status(500).json("Failed to generate access token");
  }
}

// Get Plaid transaction data for user
const getTransactionData = async (req, res) => {
  try {
    await PlaidService.setPlaidTransactionRequestFlag(req.body.item_id);
    const transactionData = await PlaidService.getTransactionData(req.body.transactionRequest, req.body.item_id);
    res.status(200).json(transactionData);
  } catch (err) {
    res.sendStatus(500);
  }
}

// User authentication
const authenticateUser = async (req, res) => {
  try {
    const userAuthenticated = await AuthService.authenticateUser(req.body.userEmail, req.body.userPassword);
    if(userAuthenticated == false) throw new Error('Incorrect credentials');
    else {
      const jwtToken = await AuthService.generateJWT(userAuthenticated);
      res.cookie('token', jwtToken, {
        httpOnly: true,
        maxAge: 1000*60*1440, // 1 day
      });
    }
    res.status(200).json(true);
  } catch (err) {
    console.log("Failed to authenticate user!", err);
    res.sendStatus(500);
  }
}

export default {
  registerUser,
  getUserDetails,
  getAllBudgets,
  generatePLinkToken,
  exchangePublicToken,
  getTransactionData,
  authenticateUser
}; 