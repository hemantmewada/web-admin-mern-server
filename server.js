const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const { authRouter } = require("./routes/authRoutes");
const mongoDBconnect = require("./config/db");
const contactRouter = require("./routes/contactRoutes");

// dotenv config
dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());

// port
const PORT = process.env.PORT || 3002;

// home route
app.get("/",(req, res) => {
    return res.status(200).send({
        status: true,
        message: "APIs are managed by @hemantmewada."
    });
});


// other routes
app.use("/api/auth", authRouter)
app.use("/api/contact", contactRouter)


mongoDBconnect().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is listening on port ${PORT}`);
    });
});