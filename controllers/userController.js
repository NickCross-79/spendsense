import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';
import User from '../models/userModel.js';
import UserService from '../services/userService.js';

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
  const response = await AuthService.generatePLinkToken(req.params.userId);
  res.status(200).json(response)
}

export default {
  registerUser,
  getAllBudgets,
  generatePLinkToken
}; 