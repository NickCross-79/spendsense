import 'dotenv/config';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import User from '../models/userModel.js';
import AuthModel from '../models/authModel.js'

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

const authenticateUser = async (userEmail, userPassword) => {
    const user = await User.findOne({userEmail: userEmail}).exec();
    console.log("Found user:",user._id.toString());

    if(user != null) {
        const storedHash = await AuthModel.findOne({userId: user._id}).exec();
        const hashCheck = await bcrypt.compare(userPassword, storedHash.authPassword);
        console.log(storedHash.authPassword);
        console.log("Logic check:",hashCheck);
        return hashCheck;
    }
    return false;
}

export default {
    hashPassword,
    authenticateUser
};