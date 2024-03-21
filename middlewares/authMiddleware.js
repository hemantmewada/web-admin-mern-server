const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "Please Provide token in headers"
            });
        }
        const JWTtoken = token.split(" ")[1];
        const isVerified = jwt.verify(JWTtoken, process.env.JWT_KEY);
        if (isVerified) {
            // console.log("data: ",isVerified);
            const userData = await userModel.findOne({email: isVerified.email}).select({password: 0});
            req.body.user = userData;
            // req.user = await isVerified;
            next();
        } else {
            return res.status(400).send({
                status: false,
                message: `Authentication failed please provide right token`
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: false,
            message: `Authentication failed ${error}`,
            error
        });
    }
}

module.exports = authMiddleware;