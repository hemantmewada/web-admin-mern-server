const contactModel = require("../../models/contactModel");
const userModel = require("../../models/userModel")

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, {password: 0});
        if (users) {
            return res.status(200).send({
                status: true,
                message: "All users.",
                data: users
            });
        } else {
            return res.status(400).send({
                status: true,
                message: "Bad request."
            });
        }
    } catch (error) {
        return res.json(500).send({
            status: false,
            message: `Error in getAllUsers API ${error}`,
            error
        })
    }    
}
const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find({});
        if (contacts) {
            return res.status(200).send({
                status: true,
                message: "All Contacts.",
                data: contacts
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Bad Request."
            });
        }
    } catch (error) {
        return res.json(500).send({
            status: false,
            message: `Error in getAllContacts API ${error}`,
            error
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const yourSelf = await userModel.findById(_id);
        // console.log(yourSelf._id.toString());
        // return;
        if (yourSelf?._id.toString() == req.body.user._id) {
            return res.status(400).send({
                status: false,
                message: "You can't delete yourself."
            });
        }
        const user = await userModel.deleteOne({ _id });
        if (user.deletedCount == 1) {
            return res.status(200).send({
                status: true,
                message: "User Deleted Successfully.",
                data: user
            });
        }else if(user.deletedCount == 0){
            return res.status(400).send({
                status: false,
                message: "User Already Deleted."
            });
        }
    } catch (error) {
        // console.log("error");
        console.log(error);
        return res.json(500).send({
            status: false,
            message: `Error in getAllContacts API ${error}`,
            error
        });
    }
}
const getUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userModel.findById(_id).select({password: 0});
        if (user) {
            return res.status(200).send({
                status: true,
                message: "single user data.",
                data: user
            });
        } else {
            return res.status(404).send({
                status: false,
                message: "User not found.",
            });
        }
    } catch (error) {
        return res.json(500).send({
            status: false,
            message: `Error in getUserById API ${error}`,
            error
        });
    }
}
const updateUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userModel.updateOne({ _id },{ $set: req.body });
        if (user) {
            return res.status(200).send({
                status: true,
                message: "user updated successfully.",
                data: user
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "user not updated.",
            });
        }
    } catch (error) {
        return res.json(500).send({
            status: false,
            message: `Error in updateUserById API ${error}`,
            error
        });
    }
}
const deleteContact = async (req, res) => {
    try {
        const { _id } = req.body;
        const contact = await contactModel.deleteOne({_id});
        if (contact.deletedCount == 1) {
            return res.status(200).send({
                status: true,
                message: "Contact deleted successfully.",
                data: contact
            });
        }else if(contact.deletedCount == 0){
            return res.status(400).send({
                status: false,
                message: "Contact Already deleted.",
                data: contact
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: `Error in deleteContact API ${error}`,
            error
        });
    }
}
module.exports  = {getAllUsers, getAllContacts, deleteUser, getUserById, updateUserById, deleteContact};