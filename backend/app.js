require('dotenv').config();
const express = require("express");
const { db } = require('./config/db');
const { userRouter } = require('./routes/auth.route');
const { paymentRouter } = require('./routes/payment.route');
const cors = require("cors");
const { adminRouter } = require('./routes/admin.route');

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db();

app.use("/api/V1/user", userRouter);
app.use("/api/V1/payment", paymentRouter);
app.use("/api/V1/admin", adminRouter);


if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
}

module.exports = app;