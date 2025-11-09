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
// Make sure you have nodemailer required at the top of your file
const nodemailer = require('nodemailer');

// It's a good practice to have the email sending logic separate,
// but for this example, we'll define it here.
const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Your Blog App" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });
        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        // Re-throw the error so the controller's catch block can handle it
        throw error;
    }
};


//* Send OTP for login
const sendOtpLogin = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        // Assuming checkUserExists is defined elsewhere
        const user = await checkUserExists(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiryTimestamp = Date.now() + 10 * 60 * 1000; // 10 Minutes from now

        user.otp = otp;
        user.otpExpiry = otpExpiryTimestamp;
        await user.save();

        // --- Start of Corrections ---

        // 1. Format the expiry timestamp into a human-readable time
        const expiryDate = new Date(otpExpiryTimestamp);
        const formattedExpiryTime = expiryDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // 2. Define the email template with clear placeholders
        // Using {{PLACEHOLDER}} is a common and clear convention.
        let emailTemplate = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Your One-Time Password</title>
                <style>
                    /* Styles are good, no changes needed here */
                    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                    table, td { border-collapse: collapse; }
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
                <center>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; margin-top: 20px;">
                        <tr>
                            <td align="center" style="padding: 40px 20px 20px 20px;">
                                <h1 style="font-size: 24px; color: #333;">Your One-Time Password</h1>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 0 30px 20px 30px; color: #555;">
                                <p>Please use the following code to complete your login.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px 30px;">
                                <div style="background-color: #eef2f5; border-radius: 8px; padding: 15px 25px;">
                                    <h2 style="font-size: 32px; color: #1e88e5; letter-spacing: 4px; margin: 0;">
                                        {{OTP}}
                                    </h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 0 30px 30px 30px; color: #888; font-size: 14px;">
                                <p>This code is valid for 10 minutes and will expire at:<br><strong>{{EXPIRY_TIME}}</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 30px; border-top: 1px solid #eeeeee; color: #888; font-size: 14px;">
                                <p>If you did not request this, please ignore this email.</p>
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
            </html>`;
        
        // 3. Replace the placeholders with the actual values
        const finalHtml = emailTemplate
            .replace('{{OTP}}', otp)
            .replace('{{EXPIRY_TIME}}', formattedExpiryTime);

        // 4. Call your email sending function with the final HTML
        await sendEmail(user.email, "Your OTP from Blog App", finalHtml);

        // --- End of Corrections ---

        res.status(200).json({ message: 'OTP sent to your email' });

    } catch (error) {
        console.error("Error in sendOtpLogin:", error); // Log the full error for debugging
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
};
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
