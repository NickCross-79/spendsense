import User from '../models/userModel.js';
import Budget from '../models/budgetModel.js';
import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';

const registerUser = async(userData) => {
    const emailCheck = await User.find({userEmail: userData.userEmail});
    if(emailCheck.length > 0) {
        console.log("Email already in use");
    }else{
        const user = new User({
            userEmail: userData.userEmail,
            firstName: userData.firstName,
            lastName: userData.lastName,
        });

        await user.save();

        const hash = await AuthService.hashPassword(userData.userPassword)
        const auth = new Auth({
            userId: user._id,
            authPassword: hash,
        });

        await auth.save();
    }
}

const getUserDetails = async (userId) => {
    const user = await User.findById(userId).populate();
    return user;
}

const getAllBudgets = async (userId) => {
    const budgetList = await (await Budget.find({ userId: userId }, { _id: 1 }));
    return budgetList;
}

export default { 
    getAllBudgets,
    getUserDetails,
    registerUser
}