const express = require("express");
const { registerController, loginController, getCurrentUserController } = require("../controllers/authControllers");
const {validationMiddleware} = require("../middlewares/validationMiddleware");
const {signupSchema, loginSchema} = require("../validations/authValidation");
const authMiddleware = require("../middlewares/authMiddleware");

const authRouter = express.Router();

// authRouter.post("/register", registerController);
authRouter.post("/register",validationMiddleware(signupSchema), registerController);
authRouter.post("/login", validationMiddleware(loginSchema), loginController);
authRouter.get("/currentUser", authMiddleware, getCurrentUserController);

module.exports = authRouter;