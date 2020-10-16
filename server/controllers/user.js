const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_get = async (req, res) => {
    try {
        const { email } = req.userData;
        const user = await User.findOne({ email });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(null);
    }
}

exports.user_login = async (req, res) => {
    try {
        //destructure email and password from req.body
        const { email, password } = req.body;
        //query the user from the database using that email(we need only one)
        const user = await User.findOne({ email });
        //if the user cannot be found with that email it means they entered the wrong email
        if (!user)
            return res.status(401).json({ message: "Incorrect email", token: null });
        //if user is found we compare the password that the user entered (not the hashed one) with the
        // hashed password that is stored in the database
        bcrypt.compare(password, user.password).then((result) => {
            //result is boolean. it's true if the compare is succesful, else false.
            if (!result)
                return res
                    .status(401)
                    .json({ message: "Incorrect password", token: null });
            const token = jwt.sign(
                { email: user.email, userId: user._id },
                process.env.JWT_KEY
                // {
                //     expiresIn: "3600s",
                // }
            );
            return res.status(200).json({ message: "Logged in successfully", token , auth:true});
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message, token: null });
    }
}