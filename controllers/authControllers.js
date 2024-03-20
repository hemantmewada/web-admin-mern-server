const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    try {
        const { username, password, contact, email } = req.body;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(200).send({
                status: false,
                message: "This email is already exist!"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const user = new userModel(req.body);
        const userSave = await user.save();
        if (userSave) {
            return res.status(201).send({
                status: true,
                message: "Registration Successful.",
                token: await userSave.createJWT(),
                data: userSave
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Registration Failed."
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: `Error in register API ${error}`,
            error
        });
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "user not found."
            });
        }
        // const isValidPassowrd = await bcrypt.compare(password, user.password);
        const isValidPassowrd = await user.comparePassword(password);
        if (!isValidPassowrd) {
            return res.status(400).send({
                status: false,
                message: "Password doesn't match."
            });
        }
        if (user) {
            return res.status(201).send({
                status: true,
                message: "Logged in Successfully.",
                token: await user.createJWT(),
                data: user
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Login Failed."
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: `Error in login API ${error}`,
            error
        });
    }
}
module.exports = {loginController, registerController}