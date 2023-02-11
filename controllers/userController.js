import Auth from '../models/authModel.js';
import AuthService from '../services/authService.js';
import User from '../models/userModel.js';

const registerUser = (req) => {
    User.find({ userEmail: req.body.email})
      .then(result => {
        if (result.length > 0) {
          console.log("Email already in use");
        } else {
          const user = new User({
            userEmail: req.body.email,
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
  
                  auth.save();
                  console.log(user);
                  console.log(auth);
                });
            });
        }
      });
  }
  
  export default {registerUser}; 