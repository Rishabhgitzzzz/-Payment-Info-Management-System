const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    }

})

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };