const express = require("express");
const adminRoutes = require("../../controllers/admin/adminController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { validationMiddleware } = require("../../middlewares/validationMiddleware");
const { updateUserSchema } = require("../../validations/authValidation");

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, adminRoutes.getAllUsers);
adminRouter.delete("/user/delete/:_id", authMiddleware, adminRoutes.deleteUser);
adminRouter.get("/contacts", authMiddleware, adminRoutes.getAllContacts);
adminRouter.delete("/contacts/delete", authMiddleware, adminRoutes.deleteContact);
adminRouter.get("/users/:_id", authMiddleware, adminRoutes.getUserById);
adminRouter.patch("/users/update/:_id", validationMiddleware(updateUserSchema) , authMiddleware, adminRoutes.updateUserById);

module.exports = adminRouter;