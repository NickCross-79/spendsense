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

    if(user != null) {
        const storedHash = await AuthModel.findOne({userId: user._id}).exec();
        return await bcrypt.compare(userPassword, storedHash.authPassword);
    }
    return false;
}

export default {
    hashPassword,
    authenticateUser
};