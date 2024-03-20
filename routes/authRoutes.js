const express = require("express");
const { registerController, loginController } = require("../controllers/authControllers");
const {validationMiddleware} = require("../middlewares/validationMiddleware");
const {signupSchema, loginSchema} = require("../validations/authValidation");

const authRouter = express.Router();

// authRouter.post("/register", registerController);
authRouter.post("/register",validationMiddleware(signupSchema), registerController);
authRouter.post("/login", validationMiddleware(loginSchema), loginController);

module.exports = {authRouter};