import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Checking if username or email already exist
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user document to the database
    const user = await newUser.save();

    // Remove the password field from the returned user object(extracting the password and storing the remaining data into the userData)
    const { password: _password, ...userData } = user.toObject();
    // console.log(userData);

    //here it return the response to the client
    return res.json({ status: true, user: userData });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { register };
