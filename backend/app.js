require('dotenv').config();
const express = require("express");
const { db } = require('./config/db');
const { userRouter } = require('./routes/auth.route');
const { paymentRouter } = require('./routes/payment.route');
const cors = require("cors");
const { adminRouter } = require('./routes/admin.route');

const app = express();
const port = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173",
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


app.listen(port, () => {
    console.log(`server listening to port ${port}`)
})