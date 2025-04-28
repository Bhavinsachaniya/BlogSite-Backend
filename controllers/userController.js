const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOtpEmail = require('../Utils/mailer');

//* checkUserExists ?

const checkUserExists =  async (email) => {
    return await User.findOne({email});
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
        { expiresIn: '30d'});    //* Duration of expire
};


//* Sign Up Controller

const signUp = async (req,res) => {
    const { name,  email, password} = req.body;

    try{
        //* Find the User Exist or not
        const userExists = await checkUserExists(email);

        if(userExists){
            return res.status(400).json({message: 'user already exists in DB'});
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = genrateToken(newUser._id);

        res.status(202).json({
            token,
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch(error){
        res.status(500).json({message: 'Error signing up user', error: error.message});
    }
};

//* login Function

const login = async (req, res) => {
    const { email, password } = req.body;

    try{
        //* Check user have account or not
        const user = await checkUserExists(email);
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = genrateToken(user._id);
        
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    } catch(error) {
        res.status(500).json({message: 'Error logging in user', error:error.message});
    }
};

//* Send OTP for login
const sendOtpLogin = async (req,res) => {
    const {email} =  req.body;

    try{
        const user = await checkUserExists(email);
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10*60*1000; //* 10 Minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOtpEmail(user.email, otp);
        
        res.status(200).json({message: 'OTP send to your email'});

    }catch(error){
        res.status(500).json({message: 'Error sending OTP', error:error.message});
    }
}
//* Verify Otp and Login
const VerifyOtpLogin = async (req,res) => {
    const {email, otp} = req.body;

    try{
        const user = await checkUserExists(email);
        
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }

        if(user.otp !== otp || user.otpExpiry < Date.now()){
            return res.status(400).json({message: 'Invalid or expired OTP'});
        }

        //* Clear Otp fields
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = genrateToken(user._id);

        res.status(200).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    }
    catch(error)
    {
        return res.status(400).json({message:'Error Verifying OTP', error: error.message});
    }
}

module.exports = {
    signUp,
    login,
    sendOtpLogin,   
    VerifyOtpLogin  
};
