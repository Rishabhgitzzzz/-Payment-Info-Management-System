const mongoose = require("mongoose");

const db = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("DB connected successfully");
            }).catch((err) => {
                console.log(err);
            })

    } catch (error) {
        console.log("db connection failed")
    }
}

module.exports = { db }