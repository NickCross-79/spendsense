import UserService from '../services/userService.js';
import PlaidService from '../services/plaidService.js';
import AuthService from '../services/authService.js';

const registerUser = async (req, res) => {
  console.log("Register new user");
  await UserService.registerUser(req.body);
  res.sendStatus(200);
}

const getAllBudgets = (req, res) => {
  UserService.getAllBudgets(req.params.id)
    .then(budgetList => {
      res.status(200).json(budgetList);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

const generatePLinkToken = async (req, res) => {
  const response = await PlaidService.generatePLinkToken(req.params.userId);
  res.status(200).json(response)
}

const exchangePublicToken = async (req, res) => {
  try {
    const access_token = await PlaidService.exchangePublicToken(req.params.pubtoken);
    res.status(200).json(access_token.data);
  } catch (err) {
    console.log("Failed to call plaid service for enchangePublicToken", err)
    res.status(500).json("Failed to generate access token");
  }
}

const getTransactionData = async (req, res) => {
  try {
    await PlaidService.setPlaidTransactionRequestFlag(req.body.item_id);
    const transactionData = await PlaidService.getTransactionData(req.body.transactionRequest, req.body.item_id);
    res.status(200).json(transactionData);
  } catch (err) {
    res.sendStatus(500);
  }
}

const authenticateUser = async (req, res) => {
  try {
    const userAuthenticated = await AuthService.authenticateUser(req.body.userEmail, req.body.userPassword);
    if(userAuthenticated == false) throw new Error('Incorrect credentials');
    else {
      const jwtToken = await AuthService.generateJWT(userAuthenticated);
      res.cookie('token', jwtToken, {
        httpOnly: true,
        maxAge: 90000,
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
  getAllBudgets,
  generatePLinkToken,
  exchangePublicToken,
  getTransactionData,
  authenticateUser
}; 