import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';
import User from '../models/userModel.js';

const registerUser = (req) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    
}

export default registerUser;