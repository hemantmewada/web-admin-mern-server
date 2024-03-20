const mongoose = require("mongoose");

const mongoDBconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB connection success ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongo DB connection: ${error}`);
    }
}

module.exports = mongoDBconnect;