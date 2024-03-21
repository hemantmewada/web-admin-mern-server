const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required."]
    },
    password: {
        type: String,
        required: [true,"password is required."]
    },
    contact: {
        type: String,
        required: [true,"contact is required."]
    },
    email: {
        type: String,
        required: [true,"email is required."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

// create token
userSchema.methods.createJWT = async function() {
    try {
        return await jwt.sign(
            {
                userId: this._id,
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d"
                // expiresIn: "60s"
            }
        );
    } catch (error) {
        console.log("Error in JWT creation: ",error);
    }
}
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("Error in password comparition",error);
    }
}
module.exports = mongoose.model("user",userSchema);