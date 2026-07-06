import UserService from '../services/userService.js';
import PlaidService from '../services/plaidService.js';
import AuthService from '../services/authService.js';

// Register new user
const registerUser = async (req, res) => {
  try {
    const created = await UserService.registerUser(req.body);
    if(!created) return res.status(409).json({msg: 'Email already in use'});
    res.sendStatus(200);
  } catch (err) {
    console.log("Failed to register user", err);
    res.sendStatus(500);
  }
}

// Get user by _id
const getUserDetails = async (req, res) => {
  try {
    const user = await UserService.getUserDetails(req.decodedToken.userId);
    if(user == null) return res.sendStatus(404);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

// Get all budgets by user _id
const getAllBudgets = async (req, res) => {
  try {
    const budgetList = await UserService.getAllBudgets(req.decodedToken.userId);
    res.status(200).json(budgetList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

// Plaid link token generation
const generatePLinkToken = async (req, res) => {
  try {
    const response = await PlaidService.generatePLinkToken(req.decodedToken.userId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json("Failed to generate link token");
  }
}

// Exchange Plaid public token for access token
const exchangePublicToken = async (req, res) => {
  try {
    const access_token = await PlaidService.exchangePublicToken(req.params.pubtoken);
    res.status(200).json(access_token.data);
  } catch (err) {
    console.log("Failed to call plaid service for exchangePublicToken", err)
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
    console.log("Failed to fetch transaction data", err);
    res.sendStatus(500);
  }
}

// User authentication
const authenticateUser = async (req, res) => {
  try {
    const userAuthenticated = await AuthService.authenticateUser(req.body.userEmail, req.body.userPassword);
    if(userAuthenticated === false) {
      return res.status(401).json({msg: 'Incorrect credentials'});
    }
    const jwtToken = await AuthService.generateJWT(userAuthenticated);
    res.cookie('token', jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000*60*1440, // 1 day
    });
    res.status(200).json(true);
  } catch (err) {
    console.log("Failed to authenticate user!", err);
    res.sendStatus(500);
  }
}

// Clear the auth cookie
const logoutUser = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.status(200).json(true);
}

export default {
  registerUser,
  getUserDetails,
  getAllBudgets,
  generatePLinkToken,
  exchangePublicToken,
  getTransactionData,
  authenticateUser,
  logoutUser
};
