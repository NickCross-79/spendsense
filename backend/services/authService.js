import 'dotenv/config';
import bcrypt from 'bcrypt';
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

// Returns the user's id when the credentials match, false otherwise
const authenticateUser = async (userEmail, userPassword) => {
    const user = await User.findOne({userEmail: userEmail}).exec();

    if(user != null) {
        const storedHash = await AuthModel.findOne({userId: user._id}).exec();
        if(storedHash == null) return false;
        const hashCheck = await bcrypt.compare(userPassword, storedHash.authPassword);
        if(hashCheck) return user._id.toString();
    }
    return false;
}

const generateJWT = async (userId) => {
    const token = jwt.sign({userId: userId}, process.env.JWT_KEY, {expiresIn: '24h'});

    return token;
}

function validateRequest(req, res, next) {
    try {
        const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.decodedToken = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Not authenticated'});
    }
}

export default {
    hashPassword,
    authenticateUser,
    generateJWT,
    validateRequest
};
