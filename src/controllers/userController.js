import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

//Create New User
const registerUser = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;

        //Check if username or email exists in ONE database call
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            const isEmailTaken = existingUser.email === email;
            const isNameTaken = existingUser.username === username;

            if (isEmailTaken && isNameTaken) return res.status(409).json({ message: "Email and Username already exists" });
            if (isEmailTaken) return res.status(409).json({ message: "Email already exists" });
            if (isNameTaken) return res.status(409).json({ message: "Username already exists" });
        }

        // Proceed to registration if no user found...
        const newUser = await User.create({ name, username, email, password});
        return res.status(201).json({
            message: `New user ${newUser.username} registered successfully`,
            user: newUser,
            token: generateToken(newUser._id),
        });
    } catch (e) {
        next(e);
        return;
    }
}


//Login Existing User
const loginUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({email: email});

        //Email Validation
        if (!user) {
            return res.status(401).json({message:"Wrong email provided"});
        }

        const userPassword = await bcrypt.compare(password, user.password);
        //Password Validation
        if(!userPassword) {
            return res.status(401).json({message:"Wrong password"});
        }

        return res.status(200).json({
            token: generateToken(user._id),
            message: `User login successfully, Welcome ${user.username}`,
            user: user
        })
    } catch (e) {
        next(e);
        return;
    }
}

export { registerUser, loginUser };