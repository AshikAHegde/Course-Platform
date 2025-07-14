const nodemailer = require("nodemailer");
const EMAIL_PASS_KEY = process.env.EMAIL_PASS_KEY;
const myMail = process.env.MY_MAIL;
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

// Create a test account or replace with real credentials.
console.log(`Email: ${myMail}, Pass: ${EMAIL_PASS_KEY}`);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: `${myMail}`,
        pass: `${EMAIL_PASS_KEY}`,
    },
});

    async function find_user(req,res) {
        try {
        const token = req.query.token; // query parameter
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: data.email });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};

module.exports = async (req,res) => {

    try {
        const foundUser = await find_user(req,res);
        
        if (foundUser.email_verified) {
            return res.send({message: "Already Verified"});
        }
        
        const info = await transporter.sendMail({
            from: `"Ashik" <${myMail}>`,
            to: foundUser.email,
            subject: `Email Verification`,
            text: `Hello ${foundUser.username}, please verify your email by entering the code: ${foundUser.email_verify_number}`,
            html: `Hello <b>${foundUser.username}</b>, please verify your email by entering the code: <br><br><code><b>${foundUser.email_verify_number}</b></code>`,
        });
        
        res.send({message: "Email Sent Successfully"});
        console.log("Message sent:", info.messageId);
        
    } catch (error) {
        console.error("Error in verify_email:", error);
        res.status(500).json({message: "Error sending email", error: error.message});
    }
};
