// filepath: f:\Coding\Course-Platform\backend\controllers\emailverify.js
const User = require("../models/user");

const emailVerifyController = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ message: "Invalid email" });

        if (parseInt(code) === (user.email_verify_number)) {
            await User.updateOne({ _id: user._id }, { email_verified: true });
            await User.updateOne({ _id: user._id }, { email_verify_number: "" });
            res.status(200).send({ message: "Email verified successfully" });
        } else {
            res.status(400).send({ message: "Invalid code" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = emailVerifyController;
