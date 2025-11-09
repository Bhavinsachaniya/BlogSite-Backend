// 1. Make sure to require nodemailer at the top
const nodemailer = require('nodemailer');

// 2. Define the function as an 'async' function
// This allows you to use the 'await' keyword inside it
const sendEmail = async (email, subject, text) => {
  try {
    // 3. Create the transporter object
    // It's good practice to create this inside the function if your credentials
    // might not be available when the module first loads.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email from .env
        pass: process.env.EMAIL_PASS  // Your App Password from .env
      }
    });

    // 4. Use 'await' to send the mail and wait for the result
    // This makes the asynchronous operation look clean and synchronous
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text
    });

    console.log('✅ Email sent successfully');

  } catch (error) {
    // 5. Catch any errors that occur during the process
    console.error('❌ Error sending email:', error.message);

    // Optional: re-throw the error if you want the calling function to handle it
    // throw error; 
  }
};

// 6. Export the function so you can use it in other files
module.exports = sendEmail;