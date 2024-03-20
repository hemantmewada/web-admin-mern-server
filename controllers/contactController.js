const contactModel = require("../models/contactModel");

const contactController = async (req, res) => {
    try {
        const contact = new contactModel(req.body);
        const contactSave = await contact.save();
        if (contactSave) {
            return res.status(201).send({
                status: true,
                message: "message sent successfully.",
                data: contactSave
            });
        } else {
            return res.status(400).send({
                status: true,
                message: "message not sent."
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: `Error in contact API: ${error}`,
            error
        })
    }
}

module.exports = contactController;