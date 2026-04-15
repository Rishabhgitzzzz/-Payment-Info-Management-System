require('dotenv').config();
const express = require("express");
const { db } = require('./config/db');
const { userRouter } = require('./routes/auth.route');
const { paymentRouter } = require('./routes/payment.route');


const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db();

app.use("/api/V1/user", userRouter);
app.use("/api/V1/payment", paymentRouter);


app.listen(port, () => {
    console.log(`server listening to port ${port}`)
})