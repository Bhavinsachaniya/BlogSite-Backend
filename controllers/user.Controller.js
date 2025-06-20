const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOtpEmail = require('../Utils/mailer');
const post = require('../models/blogModel');

//* checkUserExists 

const checkUserExists = async (email) => {
    return await User.findOne({ email });
}

//* hashPassword converter function

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

//* Function for the Genrate JWT Token

const genrateToken = (userId) => {
    return jwt.sign(
        { id: userId },          //*ID
        process.env.JWT_SECRET,  //*SECRET
        { expiresIn: '30d' });    //* Duration of expire
};


//* Sign Up Controller
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, password) are required'
            });
        }

        const userExists = await checkUserExists(email);
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists in DB'
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = genrateToken(newUser._id);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error signing up user',
            error: error.message
        });
    }
};



//* login Function
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await checkUserExists(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials checkUserExists' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials bcrypt' });
        }

        const token = genrateToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};


//* Send OTP for login
const sendOtpLogin = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const user = await checkUserExists(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; //* 10 Minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOtpEmail(user.email, otp);

        res.status(200).json({ message: 'OTP send to your email' });

    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
}
//* Verify Otp and Login
const VerifyOtpLogin = async (req, res) => {
    const { email, otp } = req.body;



    try {
        const user = await checkUserExists(email);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        //* Clear Otp fields
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = genrateToken(user._id);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    }
    catch (error) {
        return res.status(400).json({ message: 'Error Verifying OTP', error: error.message });
    }
};

const authorAccountDelete = async (req, res) => {
    const { author } = req.body;

    if (!author) {
        return res
            .status(404)
            .json({
                message: 'Author name is required for deleting the Account'
            })
    };


    try {
        const deleteAccount = await User.findOneAndDelete({ author });
        const deletedAllBlog = await post.deleteMany({ author });

        return res
            .status(200)
            .json({
                sucess: true,
                message: `${author} sucessfully deleted`,
                data: deleteAccount,
                deletedAllBlog: true
            })
    }
    catch (error) {
        return res
            .status(404)
            .json({
                sucess: false,
                message: "Error getting in the author deleting",
                error: error.message
            })
    }

}

module.exports = {
    signUp,
    login,
    sendOtpLogin,
    VerifyOtpLogin,
    authorAccountDelete
};
