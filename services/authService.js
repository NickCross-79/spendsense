import 'dotenv/config';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import User from '../models/userModel.js';
import AuthModel from '../models/authModel.js'
import jwt from 'jsonwebtoken';

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
        const hashCheck = await bcrypt.compare(userPassword, storedHash.authPassword);
        return user._id.toString();
    }
    return false;
}

const generateJWT = async (userId) => {
    const token = jwt.sign({userId: userId}, process.env.JWT_KEY, {expiresIn: '24h'});

    return token;
}

function validateRequest(req, res, next) {
    console.log("Req cookies:",req.cookies);
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    console.log("decoded token:",decodedToken);

    next();
}

export default {
    hashPassword,
    authenticateUser,
    generateJWT,
    validateRequest
};