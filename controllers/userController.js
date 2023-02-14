import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';
import User from '../models/userModel.js';

const registerUser = (req, res) => {
  console.log("Register new user");
  User.find({ userEmail: req.body.email})
    .then(result => {
      if (result.length > 0) {
        console.log("Email already in use");
      } else {
        const user = new User({
          userEmail: req.body.userEmail,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });

        user.save()
          .then(() => {
            AuthService.hashPassword(req.body.password)
              .then((hash) => {
                const auth = new Auth({
                  userId: user._id,
                  authPassword: hash,
                });

                auth.save()
                  .then(() => {
                    return res.sendStatus(200);
                  });
                
              });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
}

export default {registerUser}; 