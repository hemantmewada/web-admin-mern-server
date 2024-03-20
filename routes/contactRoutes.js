const express = require("express");
const contactController = require("../controllers/contactController");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { contactSchema } = require("../validations/authValidation");

const contactRouter = express.Router();

contactRouter.post("/store", validationMiddleware(contactSchema), contactController);

module.exports = contactRouter;