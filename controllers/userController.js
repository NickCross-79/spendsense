import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';
import User from '../models/userModel.js';
import UserService from '../services/userService.js';
import PlaidService from '../services/plaidService.js';

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
    res.status(200).json(access_token);
  } catch (err) {
    res.sendStatus(500);
  }
}

export default {
  registerUser,
  getAllBudgets,
  generatePLinkToken,
  exchangePublicToken
}; 