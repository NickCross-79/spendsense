import bcrypt from 'bcrypt';
const saltRounds = process.env.SALTROUNDS_URI;

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

export default {hashPassword};